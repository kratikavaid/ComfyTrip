var db = require('./dbinclude.js').getConnection();
var csv=require('csvtojson');

var testCreateData = function(){
	console.log("inside testcreatedata");
	var csvFilePath = 'E:/Temp.csv'
	csv({
    colParser:{
        "column1":"string",
        "column2":"int",
        "column3":"string",
        "column4":"string",
        "column5":"double",
        "column6":"double",
        "column7":"double",
        "column8":"double",
        "column9":"double",
        "column10":"double",
        "column11":"double",
        "column12":"double",
        "column13":"double",
        "column14":"double",
        "column15":"double",
        "column16":"double",
        "column17":"double",
        "column18":"double",
        "column19":"double",
        "column20":"double",
        "column21":"double",
        "column22":"double",
        "column23":"double",
        "column24":"double",
        "column25":"double",
        "column26":"double",
        "column27":"double",
        "column28":"double",
        "column29":"double",
        "column30":"double",
    }
   ,checkType:true
     }).fromFile(csvFilePath).on('json',(jsonObj)=>{
     //console.log(Number(jsonObj.Cities.Id));
	console.log(jsonObj.Cities);
    //console.log(jsonObj.Cities.id);

	db.cities.insert(jsonObj.Cities,function(err,data){
		console.log(data.length);
	});
	
})
.on('done',(error)=>{
    console.log('end')
   /* db.cities.findOne({},function(err,aCity){
        if(err){
            console.error(err);
        }
        else{
            console.log(aCity);
        }
    })*/
})
 
}

testCreateData();	
   /* db.cities.find({"Temp_data.jan.min" : "16"},function(err,aCity){
        if(err){
            console.error(err);
        }
        else{
            console.log(aCity);
        }
    })*/
