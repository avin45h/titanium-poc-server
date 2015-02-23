var Car = require("../models/Car");
var User = require("../models/User");
var Booking = require("../models/Booking");


exports.book = function (req, res, next) {
    var status = {success:true};
    var carname = req.body.carname;
    var username = req.body.username;

    var from = req.body.from;
    var to = req.body.to;
    var cartype = req.body.cartype;

    var dot_start = new Date(req.body.dot_start);
    var dot_end = new Date(req.body.dot_end);

    Car.findOne({carname:carname},function(err,carData){
        if (err) {
            status.success = false;
            return next(err);

        }

        if (!carData) {
            status.success = false;
            return res.status(404).send(status);
        }


        User.findOne({username:username},function(err,user){
            if(err || !user){
                status.success = false;
                return res.status(404).send(status);
            }
            var booking = new Booking();
            booking.carId = carData._id;
            booking.userId = user._id;
            booking.from = from;
            booking.to = to;
            booking.carname = carname;
            booking.carimageurl = carData.carimageurl;
            booking.dot_start = dot_start;
            booking.dot_end = dot_end;
            booking.bookingdate = new Date();
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

exports.showBooking = function(req,res,next){
    Booking.findOne({_id:req.params.bookingid},function(err,bdata){
        if(err){
            return res.status(404).send({ errors: ['Booking data not found'] });
        }
        res.send(bdata);
    });
};