var express = require('express');
var knex = require('knex')(require('../knexfile.js').development);
var router = express.Router();
var development = require('../knexfile.js').development;
var knex = require('knex')(development);

/* GET REGISTER page. */
router.get('/', function(req, res, next) {
 
  var usernameReg = req.query.usernameRegistered;
  var passwordReg = req.query.passwordRegistered;
  	console.log(usernameReg + " is usernameReg");
 	console.log(passwordReg + " is passwordReg");
	res.render('index', {title: 'Better Twitter'});
});

function checkUniqueName (username, callback){
	var result= true;
	//gets all the names in users
	knex('users').where({name: username}).select('name').then(function(allnames){ 
		if (allnames.length!==0){
			result=false;
		}  //if any results returned, then false	
  	callback(result);
 	});
 	
};

router.get('/registration/', function (req, res, next) {

  var usernameTemp = req.query.username;
  if (usernameTemp === undefined) {
  	usernameTemp = '';
  }
  var passwordTemp = req.query.password;
  if (passwordTemp === undefined) {
  	passwordTemp = '';
  }
  var emailTemp = req.query.email;
  if (emailTemp === undefined) {
  	emailTemp = '';
  }
 

  	var errorMessage = '';
 	var error = false;
 	var usernameFinal = false;
 	var passwordFinal = false;
 	var emailFinal = false;

	if (usernameTemp.length < 5) {
		errorMessage +='<p>Invalid Username</p>';
		error = true;
	} else {
		usernameFinal = usernameTemp;
	}
	
	if (passwordTemp.length < 5) {
		errorMessage +='<p>Invalid Password</p>';
		error = true;
	} else {
		passwordFinal = passwordTemp;
	}
	
	if (emailTemp.length < 5) {
		errorMessage +='<p>Invalid email</p>';
		error = true;
	} else {
		emailFinal = emailTemp;
	}
	if (!error) {
		checkUniqueName(usernameTemp, function(result){ 
			if (result) {
				knex('users').insert({name: usernameTemp, password: passwordTemp, email: emailTemp}).then();
				res.render('registration', { title: 'Better Twitter', message: errorMessage });
			}
			else{
				errorMessage ='<p>Username already exists.  Please sign in or choose a different user name.</p>';
				res.render('registration', { title: 'Better Twitter', message: errorMessage });
			}	
		});
	} else {
		res.render('registration', { title: 'Better Twitter', message: errorMessage });
	}
 
}); //close router.get

 
function setLoggedInCookie(){};

function checkLoggedInStatus(){};




module.exports = router;
