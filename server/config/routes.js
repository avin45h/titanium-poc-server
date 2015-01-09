var userController  = require('./../controllers/UserController');

module.exports = function(app){
    app.get('/partials/*',function(req,res){
        res.render('../../public/app/'+req.params[0]);
    });

    app.post('/login',userController.authenticate);

    app.post('/register',userController.register);

    app.get('*',function(req,res){
        res.render('index');
    });
};

