var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs =require('fs');

var citydb = require('./routes/citydb.js');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// Routes
//app.use('/api', require('./routes/route'))(app);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(__dirname +"/public"));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/getcity/:cityid",function(req,res){
    var cityId = req.params.cityid;
    console.log(`City ID : ${cityId}`);
    citydb.getCityDetails(cityId,function(err,cityData){
      if(!err)
        res.send(cityData);
      else{
        console.error(err);
        res.status(500).send("Error while fetching city data");
      }
    })
    
});


app.post("/getPlaces",function(req,res){
  console.log(req);


  var date =req.body.fromDate;
  var toDate = req.body.toDate;
  var temp =req.body.temp;
  //res.send(date + ' ' + toDate+' '+temp);
  console.log(`From Date : ${date}`);
  console.log(`TO Date : ${toDate }`);
  console.log(`Temp : ${temp }`);
  var month = new Date(date).getMonth();
  var month1= new Date(toDate).getMonth();
  console.log(month);
  console.log(month1);
  
  
    citydb.getSpecificDetails(month,month1,temp,function(err,dbData){
    if(!err){
     var count = Object.keys(dbData).length;
     console.log(count);
     var cityDetailsData =[];
     for(var i=0;i<count;i++){
        var place = {};
        place.city = dbData[i].name;
        place.imageUrl = dbData[i].images;
        cityDetailsData.push(place);
        // res.write(cityDetailsData );
        console.log(cityDetailsData)
     }
     res.send(cityDetailsData);
   }
        //res.send(dbData[i].name);
      else{
        console.error(err);
        res.status(500).send("Error while fetching city data");
      }
  })
});
    

  

app.listen(3000);
console.log("server started at 3000")

