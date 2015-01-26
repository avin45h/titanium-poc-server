var config = require('../../config.json');
var db = require('../../lib/db');
var async = require('async');
var Car = require('../../models/Car');
var User = require('../../models/User');
var userFixtures = require('../fixtures/users.json');
var carFixtures = require('../fixtures/cars.json');
var mongoose = require('mongoose');


exports.connect = function (callback) {
    db.connect(config.test.mongoUrl, callback);
};

// empty the database
exports.reset = function (callback) {
    async.parallel([
        function emptyNotesCollection(cb) {
            Car.remove({}, cb);
        },
        function emptyUsersCollection(cb) {
            User.remove({}, cb);
        }
    ], callback);
};

// populate the database with fixtures
exports.populate = function (callback) {
    async.each(userFixtures, function (data, next) {
        User.register(new User({
            username: data.username,
            email: data.email,
            profilename: data.profilename,
            phonenumber: data.phonenumber,
            longitude : data.longitude,
            latitude : data.latitude
        }), data.password, next)
    }, function (err) {
        if (err) {
            return callback(err);
        }

        User.findOne({ username: 'avinash' }, function (err, user) {
            if (err) {
                return callback(err);
            }

            async.each(carFixtures, function (data, next) {
                var note = new Note(data);
                note.userId = user._id;
                note.save(next);
            }, callback);
        });
    });
};

// connect to, reset and populate database with fixtures
exports.setupDatabase = function(callback) {
    var resetAndPopulate = function(err) {
        if (err) { return callback(err); }

        exports.reset(function(err) {
            if (err) { return callback(err); }

            exports.populate(callback);
        });
    };

    if (mongoose.connection.db) {
        return resetAndPopulate();
    } else {
        exports.connect();
    }
};
