var express =require('express');
var request= require('request');
var db = require('./dbinclude.js').getConnection();

var app= express();
var testStoreData =function(){
  	 var countryRequestUrl = 'http://battuta.medunes.net/api/country/all/?key=37e3f27b96357c03d931554bd9399c46';
     
     console.log("inside dbstoredata");
     app.get('/getCountries', function (req, res){     
 	 
        request(countryRequestUrl, function (error, response, body) {
          if (!error && response.statusCode == 200) {
           var result = JSON.parse(body);
         //var count = Object.keys(result).length;
         //console.log(count);
           var newResult = [];

          /* db.countries.save(result,function(err,data){
              console.log(data);
            });*/
             for(var i=0;i<40; i++) {
              getStates(result[i]);
              
           }
           
           res.send(newResult) ; 
          }
          callbackFunc();
        }) ;

      });
 }

 function getStates(countryData){

  var stateRequestUrl   = 'http://battuta.medunes.net/api/region/'+countryData.code+'/all/?key=37e3f27b96357c03d931554bd9399c46';
  request(stateRequestUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
         var result = JSON.parse(body);
         console.log(countryData.name);
         var count = Object.keys(result).length;
         console.log("regions"+count);
         countryData.states = result
         db.countries.update({'code': countryData.code}, {code: countryData.code, name: countryData.name, states: countryData.states  }, { upsert: true },function(err,data){
            console.log(data);
        });
       }
  });
 }
 

testStoreData();
app.listen(3000);
console.log("server started at 3000")

