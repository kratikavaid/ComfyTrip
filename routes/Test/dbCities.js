var db = require('./dbinclude.js').getConnection();

db.cities.find({}, function(err, docs){
	
    var count = Object.keys(docs).length;
    console.log(count);
    for(var i=0;i<count;i++)
	{
		console.log(docs[i].name);
	}
	
	});