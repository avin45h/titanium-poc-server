var path = require('path');
var rootPath = path.normalize(__dirname+'../../../');

module.exports = {
    development :{
        db : 'mongodb://localhost/titaniumpoc',
        rootPath : rootPath,
        port : process.env.PORT || 3000
    },
    production :{
        db : 'mongodb://localhost/titaniumpoc_prod',
        rootPath : rootPath,
        port : process.env.PORT || 80
    }
};