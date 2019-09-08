const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sqlite = require('sqlite3');
//var env = require('dotenv').config();
const port = process.env.PORT || 8080;

// models
let models = require("./models");



// routes
let customer = require('./routes/customer');

//Sync Database
models.sequelize
    .sync({
      force:true
    })
    .then(function() {
    //console.log('connected to database')
      console.log('Persons db and Person table have been created');
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
    console.log('app listening on port: '+port);
    res.send('tes express nodejs sqlite')
});

app.listen(port, function(){
    console.log('app listening on port: '+port);
});

module.exports = app;
