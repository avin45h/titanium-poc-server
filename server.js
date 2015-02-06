var express = require('express');
var app = express();
var db = require('./lib/db');
var config = require('./config.json')[app.get('env')];
var mongoose = require('mongoose');
var User = require('./models/User');
var Car = require('./models/Car');
var routes = require('./routes');
var carData = require('./bootstrapper/populateCars');

var methodOverride =  require('method-override');
var bodyParser = require('body-parser');

db.connect(config.mongoUrl, function(err){
    if(err) console.log("error occured connecting to DB");

});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(methodOverride(function(req,res){
    if(req.body && typeof req.body == 'object' && '_method' in req.body){
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

app.use(function(req, res, next) {
    req.User = User;
    req.Car = Car;
    next();
});


//carData();

app.get('/users/:username', routes.users.show);
app.post('/users', routes.users.create);
app.patch('/users/:username', routes.users.authenticate, routes.users.update);
app.get('/cars', routes.cars.show);
app.get('/cars/:carname', routes.cars.get);
app.post('/cars/:carname/book', routes.cars.book);
app.post('/search', routes.cars.search);
app.get('/user/:username/bookings', routes.cars.searchBookings);


module.exports = app;

if(!module.parent){
    app.listen(process.env.PORT || config.port);
    console.log('(%s) app listening on port %s', app.get('env'), config.port);
}