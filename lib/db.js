var mongoose = require('mongoose');

exports.isValidationError = function(err){
    return (err && err.message && /ValidationError/i.test(err.message))
};

exports.isDuplicateKeyError = function(err){
    return (err && err.message && /duplicate key/i.test(err.message))
};

exports.connect = function(url,cb){
  cb = cb || function(err){
      if(err) {
          console.err('database connection failure : \n' + err.stack);
          process.exit(1);
      }
  };

    mongoose.connect(url,{safe:true},cb)
};