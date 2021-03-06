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

app.use(express.static('public'));

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


carData();

app.get('/',function(req,res,next){
   res.render('CARRENTALENDPOINTS.html');
});

app.post('/login',routes.users.authenticate,routes.users.loginmsg); //complete
app.post('/user', routes.users.create); //complete
app.get('/coverage', routes.cars.coverage); //complete
app.get('/cartypes', routes.cars.cartypes); //complete
app.get('/user/:username', routes.users.show); // complete
app.post('/availableCars',routes.cars.availableCars); //complete
app.post('/book', routes.bookings.book); // complete
app.get('/availableCars/:carname',routes.cars.get); //complete
app.get('/user/:username/bookings', routes.bookings.showBookings); //complete
app.get('/user/:username/bookings/:bookingid', routes.bookings.showBooking); // complete


//todo : document in drive
app.patch('/users/:username',routes.users.update);



module.exports = app;

if(!module.parent){
    app.listen(process.env.PORT || config.port);
    console.log('(%s) app listening on port %s', app.get('env'), config.port);
}