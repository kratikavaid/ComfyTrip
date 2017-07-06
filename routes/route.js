// Dependencies
var express = require('express');
var router = express.Router();
//Models
//var Places = require('../model/mongo');

// Routes
//Places.methods(['get','put','post','delete']);
//Places.register(router,'/places');

// Return router
//

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getPlaces',function(req,res,next){
	var places = require('./controllers/api');
    var placesList = app.get('/api', api.findAll);
    res.send(placesList);
});



module.exports = router;