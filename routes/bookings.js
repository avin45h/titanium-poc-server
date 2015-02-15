var Car = require("../models/Car");
var User = require("../models/User");
var Booking = require("../models/Booking");


exports.book = function (req, res, next) {
    var status = {success:true};
    var carname = req.body.carname;
    var username = req.body.username;
    var from = req.body.from;
    var to = req.body.to;
    console.log(carname);
    Car.findOne({carname:carname},function(err,carData){
        if (err) {
            status.success = false;
            return next(err);

        }

        if (!carData) {
            return res.status(404).send({ errors: ['Car Data not found'] });
        }


        User.findOne({username:username},function(err,user){
            if(err || !user){
                return res.status(404).send({ errors: ['User not found'] });
            }
            var booking = new Booking();
            booking.carId = carData._id;
            booking.userId = user._id;
            booking.from = from;
            booking.to = to;
            booking.carname = carname;
            booking.save();
        });

    });

    res.send(status);
};

exports.showBookings = function(req,res,next){
    User.findOne({username:req.params.username},function(err,user){
        if(err || !user){
            return res.status(404).send({ errors: ['User not found'] });
        }
        Booking.find({userId:user._id},function (err, bookingData) {
            res.send(bookingData);
        });
    });
};