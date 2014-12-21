var express = require('express'),
    stylus = require('stylus'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('cookie-session'),
    passport = require('passport');

module.exports = function (app,config) {
    var compile = function (str, path) {
        return stylus(str).set('filename', path);
    };
    app.set('views', config.rootPath + 'server/views');
    app.set('view engine', 'jade');
    app.use(bodyParser());
    app.use(cookieParser());
    app.use(session({secret : 'titanium-poc secret'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(config.rootPath + '/public'));
    app.use(stylus.middleware({
            src: config.rootPath + '/public',
            compile: compile
        })
    );

};