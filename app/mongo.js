var path = require('path');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'cnnection error:'));
db.once('open', function() {
  console.log('Mongodb connection is open!');
});

module.exports = db;