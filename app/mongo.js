var path = require('path');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  _id: Number,
  username: String,
  password: String,
  date: { type: Date, default: Date.now }
});



var db = require('bookshelf')(knex);

db.knex.schema.hasTable('urls').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('urls', function (link) {
      link.increments('id').primary();
      link.string('url', 255);
      link.string('baseUrl', 255);
      link.string('code', 100);
      link.string('title', 255);
      link.integer('visits');
      link.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 100).unique();
      user.string('password', 100);
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;

var User = mongoose.model('User', { username: String});

var user = new User({ username: 'Chevmeister' });
user.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('The user was found!');
  }
});