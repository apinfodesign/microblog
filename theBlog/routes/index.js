var express = require('express');
var router = express.Router();
var development = require('../knexfile.js').development;
var knex = require('knex')(development);

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.query);
  var username = req.query.username;
  var password = req.query.password;
  var email = req.query.email;
  knex('users').insert({name: username}).then(function(){

  });
  res.render('index', { title: 'Twice Twitter' });
});

module.exports = router;
