var express = require('express');
var router = express.Router();
var development = require('../knexfile.js').development;
var knex = require('knex')(development);
var postMaster = require('../functions.js');

/* GET SIGN IN page. */
router.get('/', function(req, res, next) {
 
    var usernameReg = req.query.usernameRegistered;
    var passwordReg = req.query.passwordRegistered;

  	console.log(usernameReg + " is usernameReg");
 	console.log(passwordReg + " is passwordReg");


 	postMaster.checkLoggedInStatus(req.cookies, function(result) {
		console.log('logged in status is ' + result);
		if (result)  //status TRUE
			{
				console.log ("dipslayPostsPage should happen here")
				res.redirect('/posts');
			}	
		else  //checkLoggedInStatus is FALSE
		{
			postMaster.checkUserExists(usernameReg, passwordReg, function (result) {
				console.log('successfull login status is ' + result);
				if(result)  //status TRUE
				{
					res.cookie('last-login-time', Date.now() ) ;
					res.redirect('/posts');

		//  		 	console.log("THIS MANY SECONDS since last visit = " +  
		// 		 		(date.getTime() - previousCookieTime)/1000  );
		
						//make user logged in
					//postMaster.displayPostsPage();    //display posts page
					console.log("cookie set and ready to display a page")
				}
				else   //status of exists is false
				{
				 res.render('index', {title: 'Better Twitter', message: '<p>Login failed</p>' });
				}
			
			});
		}
	})
});






//posts display for logged in user
router.get('/posts', function(req,res,net){
	postMaster.checkLoggedInStatus(req.cookies, function(result) {
		console.log('logged in status is ' + result);
		if (result)  //status TRUE
			{
				console.log ("dipslayPostsPage should happen here")
				postMaster.displayPostsPage(function (result) {
					res.render('posts', {title: 'BETTER TWITTER 2', text: result})
				});
			}
		else
			{
				res.redirect('/');
			}
	});
});





router.get('/registration/', function (req, res, next) {

  var usernameTemp = req.query.username;
  if (usernameTemp === undefined) {
  	usernameTemp = [];
  }
  var passwordTemp = req.query.password;
  if (passwordTemp === undefined) {
  	passwordTemp = [];
  }
  var emailTemp = req.query.email;
  if (emailTemp === undefined) {
  	emailTemp = [];
  }
 

  var errorMessage = '';
  var error = false;
  var usernameFinal = '';
  var passwordFinal = '';
  var emailFinal = '';

	if (usernameTemp === []) {
		errorMessage +='<p>Please enter a username</p>';
		error = true;
	} else if (usernameTemp.length < 5) {
		errorMessage +='<p>Invalid Username</p>';
		error = true;
	} else {
		usernameFinal = usernameTemp;
	}
	
	if (passwordTemp === []) {
		errorMessage +='<p>Please enter a password</p>';
		error = true;
	} else if (passwordTemp.length < 5) {
		errorMessage +='<p>Invalid Password</p>';
		error = true;
	} else {
		passwordFinal = passwordTemp;
	}
	
	if (emailTemp === []) {
		errorMessage +='<p>Please enter an email</p>';
		error = true;
	} else if (emailTemp.length < 5) {
		errorMessage +='<p>Invalid email</p>';
		error = true;
	} else {
		emailFinal = emailTemp;
	}
	if (!error) {
		postMaster.checkUniqueName(usernameTemp, function(result){ 
			if (result) {
				knex('users').insert({name: usernameTemp, password: passwordTemp, email: emailTemp}).then();
				res.render('index', { title: 'Better Twitter' });
			}
			else{
				errorMessage ='<p>Username already exists.  Please sign in or choose a different user name.</p>';
				res.render('registration', { title: 'Better Twitter', message: errorMessage, uname: usernameFinal, pass: passwordFinal, email: emailFinal });
			}	
		});
	} else {
		res.render('registration', { title: 'Better Twitter', message: errorMessage, uname: usernameFinal, pass: passwordFinal, email: emailFinal });
	}
 
}); //close router.get


 

module.exports = router;
