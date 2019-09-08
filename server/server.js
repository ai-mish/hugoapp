#!/usr/bin/env node

const sqlite = require('sqlite3');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const s_client = require('socket.io-client');
const WebSocket = require('ws');
const fs = require('fs')


const port = process.env.PORT || 8080;

// models
var models = require("./models");

// routes
let customer = require('./routes/customer');

//Sync Database
models.sequelize
    .sync({
      force:true
    })
    .then(function() {
    //console.log('connected to database')
      console.log('Customers db and Customers table have been created');
    })
    .then(function() {
      //load initial data
      let Customers = models.Customers;
      let rawdata = fs.readFileSync('./data/initialperson.json');
      let person = JSON.parse(rawdata);
      Customers.bulkCreate(
              person,
              {
                validate:true,
                ignoreDuplicates:true
              }
            )
            .then(function(insertedPerson){
                  console.log("added initial data from ./data/initialperson.json");
            });
    })
    .catch(function(err) {
      console.log(err)
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// register routes
app.use('/customer', customer);

// index path
app.get('/', function(req, res){
    //console.log('app listening on port: '+port);
    res.send('Recommender Engine')
});

//start http server
server.listen(port, function(){
  var addr = server.address();
  console.log('listening on http://' + addr.address + ':' + addr.port);
});

//enable socket
io.on('connection', (socket) => {
  let Customers = require('./models').Customers;
  Customers.count().then(c => {
    console.log("There are " + c + " customers!")
  })
  Customers
  .findOne({
    //where: {name: detection["_Object"+i+"_"]},
    where: {name: "Felix"},
    attributes: ['recommendation']
  })
  .then(customer => {
    // customer will be the first entry of the Customers table with the name || null
    //console.log(customer.get({ plain: true }))
    customer ? recommendation = customer.get('recommendation') : recommendation = '' ;
    console.log(recommendation)
  });

  let esp = require('./sasesp/socket.js');
  esp(io,socket);
});




//console.log('listening on port ', port);
