var Car = require("../models/Car");
var User = require("../models/User");
var Booking = require("../models/Booking");


exports.book = function (req, res, next) {
    var status = {success:true};
    Car.findOne({carname:req.body.carname},function(err,carData){
        if (err) {
            return next(err);
            status = false;
        }

        if (!carData) {
            return res.status(404).send({ errors: ['Car Data not found'] });
        }

        User.findOne({username:req.body.username},function(err,user){
            if(err || !user){
                return res.status(404).send({ errors: ['User not found'] });
            }
            var booking = new Booking();
            booking.carId = carData._id;
            booking.userId = user._id;
            booking.from = req.body.from;
            booking.to = req.body.to;
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
        Booking.find({userId:user._id},function (err, carData) {
            res.send(carData);
        });
    });
};