var express = require('express');
//var pg = require('pg');

var knex = require('knex')(require('../knexfile.js').development);
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Twice Twitter' });
  
  var username = req.query.username;
  var password = req.query.password;
  console.log(username + " is user name");
  //knex('users').columnInfo(name);

//knex('users').insert({name: username}).then(function(user222){console.log(user222); });
knex('users').insert({name: username, password: password}).then(console.log("here we are"));

//  knex('users').insert({name: passname});
	

});



module.exports = router;
