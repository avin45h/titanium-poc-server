var validator = require('../lib/validator');
var timestamps = require('mongoose-timestamp');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Car = new Schema({
    carname: {
        type: String,
        required: true,
        validate: validator.validate('isLength', 3, 255)
    },
    carimageurl: {
        type: String,
        required: true,
        validate: validator.validate('isLength', 3, 255)
    },
    cartype: {
        type: String,
        required: true,
        validate: validator.validate('isLength', 3, 255)
    },
    vendornumber: {
        type: String,
        required: true,
        validate: validator.validate('isLength', 3, 255)
    },

    vendorsite: {
        type: String,
        required: true,
        validate: validator.validate('isLength', 3, 255)
    },
    longitude: {
        type: String,
        required: true,
        validate: validator.validate('isLength', 3, 255)
    },
    latitude: {
        type: String,
        required: true,
        validate: validator.validate('isLength', 3, 255)
    },
    bookstatus: {
        type: Boolean,
        default : false
    },
    userId: {
        type: ObjectId,
        required: true,
        ref: 'User'
    }
});

Car.plugin(timestamps);

module.exports = mongoose.model('Car',Car);