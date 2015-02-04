var Car = require('../models/Car');
var carFixtures = require('./cars.json');
var async = require('async');



module.exports = exports = function(callback){
    console.log("Calling bootstrap");
    async.each(carFixtures, function (data, next) {
        console.log("========>");
        console.log(data);
        console.log("<========");
        var car = new Car(data);
        car.save(next);
    },callback);
};