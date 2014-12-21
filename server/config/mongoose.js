var mongoose = require('mongoose');

module.exports = function(config){
    mongoose.connect(config.db);
    var db = mongoose.connection;

    db.on('error',console.error.bind(console,'connection error........'));
    db.once('open', function callback(){
        console.log('DB connection established');
    });

    var userSchema = mongoose.Schema({
        firstName :String,
        lastName :String,
        userName :String
    });

    var User = mongoose.model('User',userSchema);

    User.find({}).exec(function(err,collection){
        if(collection.length===0){
            User.create({firstName:'Avinash',lastname:'Verma',userName:'avin45h',password:"test"});
            User.create({firstName:'Avinash1',lastname:'Verma1',userName:'avin45h1',password:"test"});
            User.create({firstName:'Avinash2',lastname:'Verma2',userName:'avin45h2',password:"test"});
        }
    });
};