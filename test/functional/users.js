var request = require('supertest');
var should = require('should');
var app = require('../../server');
var db = require('../utils/db');

var user = require('../fixtures/users.json')[0];

describe('User-Routes', function (done) {
    before(function (done) {
        db.setupDatabase(done);
    });

    after(function (done) {
        db.reset(done);
    });

    it('should return the user details', function (done) {
        request(app)
            .get('/users/' + user.username)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.body.should.have.properties('username', 'email', 'profilename');
                done();
            });
    });

    it('should create a new user', function (done) {
        request(app)
            .post('/users')
            .send({
                username: 'avinasht1',
                password: 'avinash_password',
                email: 'avinasht1@intelligrape.com',
                profilename: 'avinasht1',
                "phonenumber": 9953737236,
                "longitude": "2.3",
                "latitude": "2.3"

            })
            .expect(201)
            .expect('Content-Type', /json/)
            .expect('Location', '/users/avinasht1')
            .expect({
                username: 'avinasht1',
                email: 'avinasht1@intelligrape.com',
                profilename: 'avinasht1',
                "phonenumber": 9953737236,
                "longitude": "2.3",
                "latitude": "2.3"
            }, done);
    });

    it('should update the current user', function (done) {
        request(app)
            .patch('/users/' + user.username)
            .set('Authorization', 'Basic ' + new Buffer(user.username + ':' + user.password).toString('base64'))
            .send([
                {
                    op: 'replace',
                    path: '/email',
                    value: 'avinash123@intelligrape.com'
                },
                {
                    op: 'replace',
                    path: '/name',
                    value: 'Avinash1'
                }
            ])
            .expect(204, done);
    });

});