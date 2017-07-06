var citydb = require('../citydb.js');

var testGetCities = function(){
	citydb.getSpecificDetails("jan", function(){
		console.log("In callback");
	});
}

testGetCities();