var timestamps = require('mongoose-timestamp');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Booking = new Schema({
    userId: {
        type: ObjectId,
        required: false,
        ref: 'User'
    },
    carId: {
        type: ObjectId,
        required: false,
        ref: 'Car'
    },
    from : {
        type: String,
        required: true
    },
    to : {
        type: String,
        required: true
    },
    carname : {
        type: String,
        required: true
    }
});

Booking.plugin(timestamps);

module.exports = mongoose.model('Booking',Booking);