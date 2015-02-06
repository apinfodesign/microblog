var express = require('express');
//var pg = require('pg');

var knex = require('knex')(require('../knexfile.js').development);
var router = express.Router();
var development = require('../knexfile.js').development;
var knex = require('knex')(development);

/* GET home page. */
router.get('/', function(req, res, next) {

//  console.log(req.query);
  var usernameTemp = req.query.username;
  var passwordTemp = req.query.password;
  var emailTemp = req.query.email;
  res.render('index', { title: 'Better Twitter' });
  
  console.log(username + " is user name");
 
//	knex('users').insert({name: usernameTemp, password: passwordTemp, email: emailTemp}).then();	

});


module.exports = router;
