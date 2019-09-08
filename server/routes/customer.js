var express = require('express');
var Customers = require('../models').Customers;
var router = express.Router();

// middleware
var checkIDInput = function (req, res, next) {
    //console.log('Check ID input');
    console.log(req.params.id)
    if(isNaN(req.params.id)) {
        //console.log('Invalid ID supplied');
        res.status(400).json('Invalid ID supplied');
    } else {
        next();
    }
};
var checkIDExist = function (req, res, next) {
    //console.log('Check ID exist');
    Customers.count({ where: { id: req.params.id } }).then(count => {
        if (count != 0) {
            next();
        } else {
            //console.log('Book not found');
            res.status(400).json('Customer not found');
        }
    });
};

router.get('/', function(req, res){
    //console.log('Getting all books');
    Customers.findAll().then(book => {
        res.status(200).json(book);
    });
});

router.get('/initial', function(req, res){
    //console.log('Getting all books');
    Customers.findAll({
      attributes: ['id','name','profilepicture','title',['default_recommendation', 'recommendation']] 
    })
    .then(book => {
        res.status(200).json(book);
    });
});


router.post('/', function(req, res){
    Customers.create({
        title: req.body.title,
        name: req.body.name,
        recommendation: req.body.recommendation
    }).then(customer => {
        /*console.log(book.get({
            plain: true
        }));*/
        res.status(200).json(customer);
    }).error(err => {
        res.status(405).json('Error has occured');
    });
});

router.get('/:id', [checkIDInput, checkIDExist], function(req, res){
    //console.log('Get book by id');
    Customers.findByPk(req.params.id).then(customer => {
        //console.log(book);
        res.status(200).json(customer);
    });
});

router.put('/:id', [checkIDInput, checkIDExist], function(req, res){
    //console.log('Update customer by id');
    Customers.update({
        title: req.body.title,
        name: req.body.name,
        recommendation: req.body.recommendation
    },{
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});

router.delete('/:id', [checkIDInput, checkIDExist], function(req, res){
    //console.log('Delete book by id');
    Customers.destroy({
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;
