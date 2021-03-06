var Car = require("../models/Car");
var User = require("../models/User");

exports.show = function (req, res, next) {
    Car.find({bookstatus: false}, function (err, carData) {
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
    var car = Car.findOne({carname: req.params.carname}, function (err, carData) {
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
    var status = {success: true};
    Car.findOne({carname: req.params.carname}, function (err, carData) {
        if (err) {
            return next(err);
            status = false;
        }

        if (!carData) {
            return res.status(404).send({ errors: ['Car Data not found'] });
        }

        User.findOne({username: req.body.username}, function (err, user) {
            if (err || !user) {
                return res.status(404).send({ errors: ['User not found'] });
            }
            carData.userId = user._id;
            carData.bookstatus = true;
            carData.save();
        });

    });

    res.send(status);
};

exports.coverage = function (req, res) {
    Car.aggregate([
        {$unwind: '$coverage'},
        {$group: {_id: "", "coverage": {$addToSet: "$coverage"}}}
    ], function (err, carData) {
        if (err) {
            return next(err);
        }

        if (!carData) {
            return res.status(404).send({ errors: ['Data not found'] });
        }
        res.send(carData[0].coverage);
    });
};

exports.cartypes = function (req, res) {
    Car.aggregate([
        {$group: {_id: "", "cartype": {$addToSet: "$cartype"}}}
    ], function (err, carData) {
        if (err) {
            return next(err);
        }

        if (!carData) {
            return res.status(404).send({ errors: ['Data not found'] });
        }
        res.send(carData[0].cartype);
    });
};

exports.availableCars = function (req, res) {
    var from = req.body.from;
    var to = req.body.to;
    var cartype = req.body.cartype;

    var dot_start = new Date(req.body.dot_start);
    var dot_end = new Date(req.body.dot_end);

    console.log(dot_start);

    Car.find({coverage: {$all: [from, to]}, cartype: cartype}, function (err, carData) {
        if (err) {
            return next(err);
        }

        if (!carData) {
            return res.status(404).send({ errors: ['Data not found'] });
        }
                
        res.send(carData);
    })
};


exports.search = function (req, res, next) {
    var searchParams = {bookstatus: false};
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var range = req.body.range;
    var carname = req.body.carname;
    var cartype = req.body.cartype;

    if (carname) {
        searchParams.carname = carname
    }
    if (cartype) {
        searchParams.cartype = cartype
    }
    console.log(searchParams);
    Car.find(searchParams, function (err, carData) {
        if (err) {
            return next(err);
        }

        if (!carData) {
            return res.status(404).send({ errors: ['Car Data not found'] });
        }
        res.send(carData);
    });
};