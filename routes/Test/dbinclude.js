var mongojs = require('mongojs');
var mongo = {
    "hostname":"localhost",
    "port":27017,
    "username":"",
    "password":"",
    "name":"",
    "db":"mydatabase"
}

var generate_mongo_url = function(obj){
    obj.hostname = (obj.hostname || 'localhost');
    obj.port = (obj.port || 27017);
    obj.db = (obj.db || 'test');
    if(obj.username && obj.password){
        return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
    else{
        return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
}
  
var databaseUrl = generate_mongo_url(mongo);
var collections = [ "cities"];

exports.getConnection = function(){
    
   // global.walkintodb = mongojs(databaseUrl , collections);
    return mongojs(databaseUrl , collections);
}
var collections = [ "countries"];

exports.getConnection = function(){
    
   // global.walkintodb = mongojs(databaseUrl , collections);
    return mongojs(databaseUrl , collections);
}

exports.getConnection();