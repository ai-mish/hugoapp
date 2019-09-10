const WebSocket = require('ws');
const fs = require('fs')
var Customers = require('../models').Customers;

let esp_url = 'ws://192.168.56.201:30001/SASESP/subscribers/detectionProject/contquery/w_score/?format=json&mode=streaming&pagesize=5&schema=true'
let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

let consumer_esp = null

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}



let start = function(io,socket) {
  console.log('Socket succesfully connected with id: '+socket.id);
  var count=0

  //var test=[{"id": "1"}];
  //io.sockets.emit('broadcast',test);
  //test();

   consumer_esp = new WebSocket(esp_url);

   consumer_esp.onerror = function(event) {
     console.log('Failed to connect to SAS ESP')
   }

   consumer_esp.onconnect = function(event) {
     console.log('Successfully connected to SAS ESP')
   }

    consumer_esp.onopen = function(event) {
    // Send an initial message

    consumer_esp.send('I am the client and I\'m listening!');
    // Listen for messages
    consumer_esp.onmessage = function(event) {
      //console.log(event)
      count++;

      if(event.type == "message") {
        var decodedMessage = JSON.parse(JSON.stringify(event));
        var js_ts=0
        var detection={}
        if(isJson(decodedMessage.data)){
          var detection=JSON.parse(decodedMessage['data'])
          //console.log(detection)
          if(detection.hasOwnProperty('events')){
            detection=detection['events'][0]['event']
            var ts = detection["attributes"]["timestamp"]
            var js_ts = new Date(ts/1000);
            js_ts=new Date(new Date().getTime() + 2 * (Math.random() - 0.5) * 1000);
          }
        }

        if(detection){
          //find _ObjectN_ and _PObjectN_
          let total_objects = (Object.keys(detection).length - 5) / 2
          let total_objects_detected = detection['_nObjects_']
          let out = [];

          try {
            for(let i = 0; i < total_objects_detected; i++){
              //console.log(detection)
              let recommendation = "None";
              console.log("_Object"+i+"_"+":"+ detection["_Object"+i+"_"])
              console.log("_P_Object"+i+"_"+":"+detection["_P_Object"+i+"_"])
              //var dt=new Date(t*1000);

              //run customer query and add recommendation to ESP
              Customers
              .findOne({
                //where: {name: detection["_Object"+i+"_"]},
                where: {name: detection["_Object"+i+"_"]},
                attributes: ['recommendation']
              })
              .then(customer => {
                // customer will be the first entry of the Customers table with the name || null
                customer ? recommendation = customer.get('recommendation') : recommendation = 'blank' ;
                console.log('Recommendation: ' + recommendation);
                var row={"id": detection["id"],
                         "timestamp" : js_ts,
                         "name" : detection["_Object"+i+"_"],
                         "likelihood" : detection["_P_Object"+i+"_"],
                         "recommendation": recommendation
                       }
                out.push(row);
                //sleep(10000)
                io.sockets.emit('broadcast',row);
                //console.log(recommendation);
              })

            }
          } catch (err) {
            console.error(err)
          }
        }

      }
    };

    // Listen for socket closes
    consumer_esp.onclose = function(event) {
      console.log('Client notified socket has closed',event);
    };
    // To close the socket....
    //socket.close()
  };

  socket.on('connect', function(){
    console.log("connected")
  });
};

module.exports = {start}
