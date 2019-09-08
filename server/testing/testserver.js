
var sampledata = require('./sampledata');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const s_client = require('socket.io-client');
const WebSocket = require('ws');
const fs = require('fs')


//app.get('/', function(req, res){
  //res.sendFile(__dirname + '/public/index.html');
//});

const connections = []
app.use('/', express.static('public'));

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

io.on('connection', (socket) => {
  connections.push(socket);
  console.log('Client connected. Total: %s', connections.length)
  console.log('Socket succesfully connected with id: '+socket.id);
  var out = [];
  var count=0
  var rowcounts = sampledata.data.length
  var colors = ["#F5F5F5", "#81C784"]
  t=setInterval( function() {
        //var n=rnd();
        rowid=Math.floor(Math.random() * rowcounts)
        colorid=Math.floor(Math.random() * colors.length)
        //sampledata.data[rowid]['statusColor'] = colors[colorid]
        sampledata.data[rowid]['statusColor'] = "#81C784"
        console.log('sent person: %s color: %s',sampledata.data[rowid]["personName"],sampledata.data[rowid]["statusColor"])
        io.sockets.emit('broadcast',sampledata.data[rowid]);
    }, 50000);

  socket.on('connect', function(){
    console.log("connected")
  });

});

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

console.log(sampledata.data.length);
var args = process.argv.slice(2);
port=args[0]
if (port) {
  http.listen(port, function(){
    console.log('listening on *:', port);
  });
}
else{
  http.listen(8080, function(){
    console.log('listening on *:', 8080);
  });
}

//console.log('listening on port ', port);
