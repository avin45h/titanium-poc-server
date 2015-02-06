var Car = require("../models/Car");
var User = require("../models/User");

exports.show = function (req, res, next) {
    Car.find({bookstatus:false},function (err, carData) {
        if (err) {
            return next(err);
        }

        if (!carData) {
            return res.status(404).send({ errors: ['Car Data not found'] });
        }
       res.send(carData);
    });

};

exports.get = function (req, res, next) {
    var car = Car.findOne({carname:req.params.carname},function (err, carData) {
        if (err) {
            return next(err);
        }

        if (!carData) {
            return res.status(404).send({ errors: ['Car Data not found'] });
        }
        res.send(carData);
    });
};


exports.book = function (req, res, next) {
    var status = {success:true};
    Car.findOne({carname:req.params.carname},function(err,carData){
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
            carData.userId = user._id;
            carData.bookstatus = true;
            carData.save();
        });

    });

    res.send(status);
};


exports.search = function(req,res,next){
    var searchParams = {bookstatus:false};
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var range = req.body.range;
    var carname = req.body.carname;
    var cartype = req.body.cartype;

    if(carname) {searchParams.carname = carname}
    if(cartype) {searchParams.cartype = cartype}
console.log(searchParams);
    Car.find(searchParams,function (err, carData) {
        if (err) {
            return next(err);
        }

        if (!carData) {
            return res.status(404).send({ errors: ['Car Data not found'] });
        }
        res.send(carData);
    });
};


exports.searchBookings = function(req,res,next){
    User.findOne({username:req.params.username},function(err,user){
        if(err || !user){
            return res.status(404).send({ errors: ['User not found'] });
        }
        Car.find({bookstatus:true,userId:user._id},function (err, carData) {
            res.send(carData);
        });
    });
};