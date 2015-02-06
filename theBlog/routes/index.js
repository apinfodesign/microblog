var express = require('express');
var knex = require('knex')(require('../knexfile.js').development);
var router = express.Router();
var development = require('../knexfile.js').development;
var knex = require('knex')(development);

/* GET home page. */
router.get('/', function(req, res, next) {

  var usernameTemp = req.query.username;
  var passwordTemp = req.query.password;
  var emailTemp = req.query.email;
  res.render('index', { title: 'Better Twitter' });
  
  console.log(usernameTemp + " is usernameTemp");
 



	checkUniqueName(usernameTemp, function(result){ 
		if (result) {
			knex('users').insert({name: usernameTemp, password: passwordTemp, email: emailTemp}).then();
		}
		else{
			console.log("User name " + usernameTemp + " already exists.")
		}	
	});



});

var checkUniqueName = function(username, callback){
	var result= true;
	//gets all the names in users
	knex('users').where({name: username}).select('name').then(function(allnames){ 
		if (allnames.length!==0){
			result=false;
		}  //if any results returned, then false	
  	callback(result);
 	});
 	
};







module.exports = router;
