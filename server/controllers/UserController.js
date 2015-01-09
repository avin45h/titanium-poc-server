var passport = require('passport');

exports.authenticate = function(req,res,next){
    var auth = passport.authenticate('local',function(err,user){
        console.log(user);
        if(err) { return next(err);}
        if(!user){res.send({success:false})}
        req.logIn(user,function(err){
            if(err) { return next(err);}
            res.send({success:true,user:user});
        });
    });
    auth(req,res,next);
};


exports.register = function(req,res){
    var username = req.query['username'];
    var password = req.query['password'];
    var mobile = req.query['mobile'];
    var location = req.query['location'];
    var profileName = req.query['profilename'];
    var email  = req.query['email'];
};

var x = { "1": { "2": { "3": { "4": { "5": [    {"c": 1},    {"b": 1}]}}}}};