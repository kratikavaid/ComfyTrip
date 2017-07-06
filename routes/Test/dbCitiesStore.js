var express =require('express');
var request= require('request');
var db = require('./dbinclude.js').getConnection();

var app= express();
var testStoreCityData =function(){
  	 var cityRequestUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=Aixas+city+point+of+interest&language=en&key=AIzaSyDwvPKu4w4QRzfjgm9-7-k_DCVrVyfP9AA';
     
     console.log("inside dbCitiesstoredata");
     app.get('/getCities', function (req, res){     
 	 
        request(cityRequestUrl, function (error, response, body) {
          if (!error && response.statusCode == 200) {
           var result = JSON.parse(body);
           var data =result.results
         //  res.send(data[0].formatted_address)
           var newResult = [];
          for(var specificData in data)
           {
            var address= [data[specificData].name,data[specificData].types]
           // var html =[address[specificData],address[specificData]]
            specificData++
            console.log(address)
          }
           res.send(newResult) ; 
            
             
           
           }
          })
          
        }) ;

      }
 

 
 

testStoreCityData();
app.listen(3000);
console.log("server started at 3000")

