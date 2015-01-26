var should = require('should');
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var helpers = require('../utils/helpers');
var mongoose = helpers.getMongooseStub();

var shouldDefineSchemaProperty = helpers.shouldDefineSchemaProperty.bind(null, mongoose.Schema);
var shouldRegisterSchema = helpers.shouldRegisterSchema.bind(null, mongoose.model, mongoose.Schema);
var shouldBeRequired = helpers.shouldBeRequired.bind(null, mongoose.Schema);
var shouldBeA = helpers.shouldBeA.bind(null, mongoose.Schema);
var shouldDefaultTo = helpers.shouldDefaultTo.bind(null, mongoose.Schema);
var shouldBeBetween = helpers.shouldBeBetween.bind(null, mongoose.Schema);
var shouldValidateThat = helpers.shouldValidateThat.bind(null, mongoose.Schema);
var shouldLoadPlugin = helpers.shouldLoadPlugin.bind(null, mongoose.Schema);

describe('Car', function() {
    var Note, mongooseTimestamp;

    before(function() {
        mongooseTimestamp = sinon.stub();
        Note = proxyquire('../../models/Car', {
            'mongoose-timestamp': mongooseTimestamp,
            'mongoose': mongoose
        });
    });

    // the tests will be included here
    it('should register the Mongoose model', function() {
        shouldRegisterSchema('Car');
    });

    it('should load the timestamps plugin', function() {
        shouldLoadPlugin(mongooseTimestamp);
    });
    describe('carname', function() {
        it('should be required', function() {
            shouldBeRequired('carname');
        });

        it('should be a string', function() {
            shouldBeA('carname', String);
        });

        it('should have a length of 3-255 chars', function() {
            shouldValidateThat('carname', 'isLength', 3, 255);
        });
    });
});