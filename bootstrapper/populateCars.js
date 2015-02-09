var Car = require('../models/Car');
var carFixtures = require('./cars.json');
var async = require('async');


module.exports = exports = function (callback) {
    console.log("Calling bootstrap");
    Car.find({}, function (err, data) {
        if(!err && data && !data.length)
        async.each(carFixtures, function (data, next) {
            var car = new Car(data);
            car.save(next);
        }, callback);
    })

};