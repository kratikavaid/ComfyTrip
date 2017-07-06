var db = require('./Test/dbinclude.js').getConnection();

exports.getCityDetails = function(cityid,callback){
	db.cities.findOne({Id:cityid},function(err,data){
		callback(err,data);
	})
}

var monthAsString = function(monthIndex) {
    return ["jan","feb","march","april","may","june","july","aug","sept","oct","nov","dec"][monthIndex];
}

exports.getSpecificDetails = function(month,month1,temp,callback){
	
	var systemMin = parseInt(temp)- 5;
	var systemMax = parseInt(temp) + 5;
	console.log(' first_Month: ' +month);
	console.log(' second_Month: ' +month1);
	console.log(`Temp : ${temp }`);
	var query = {};
	//for loop on months
	
	for(var i = month; i<=month1; i++){ 
	   /*function MonthAsString(monthIndex) {
	    return ["jan","feb","march","april","may","june","july","aug","sept","oct","nov","dec"][monthIndex];
	    }*/
	   // console.log('Month :' +monthAsString(i));
		querystr = "Temp_data." +monthAsString(i)+".min";
		query[querystr] = { $gte: systemMin };
		querystr = "Temp_data." +monthAsString(i)+".max";
		query[querystr] = { $lte: systemMax };
    }
	//console.log(querystr);
	
	//query["Temp_data." + date+".max"] >= "" + systemMax;
	//query["Temp_data.march.min"]="18";
	//query["test"] = "something";
	//query.Temp_data.[date].min = "16";
	console.log(query );
	
	db.cities.find(query,function(err,data){
		//for(var i=0;i<data.count();i++)
		 //var result = JSON.parse(data);
         var count = Object.keys(data).length;
		 console.log(count);
		 for(var i=0;i<count;i++){
		 console.log(data[i].name);
		 }
		//console.log(data.id);
		//res.end(data);
		//response.end(data.name);
		callback(err,data);
	})
    
}

/*exports.getSpecificDetails2 = function(date,callback){
	var temp = 5;
	var systemMin = temp - 5;
	var systemMax = temp + 5;
	console.log('Month: ' +date);
	var field = "Temp_data." + date;
	//var field = { };
	//fie["Temp_data." + date+".min"] = systemMax;
	//query["Temp_data." + date+".max"] >= "" + systemMax;
	//query["Temp_data.march.min"]="18";
	//query["test"] = "something";
	//query.Temp_data.[date].min = "16";
	console.log("query :: "+query["Temp_data.jan.min"]);
	db.cities.findOne({field : },function(err,data){
		console.log(data);
		callback(err,data);
	})

}*/