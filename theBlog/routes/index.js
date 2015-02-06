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

//if FALSE, checkUserExists()
	// if FALSE return "INVALID LOGIN" message
	// if TRUE setCookie() and displayPostsPage()
// if TRUE, displayPostsPage()

 
	if (postMaster.checkLoggedInStatus(req.cookies, function(result) {
		return result;
	})  //status TRUE
		{
 		console.log ("dipslayPostsPage should happen here")
 		//postMaster.displayPostsPage();
		}	
	else  //checkLoggedInStatus is FALSE
	{
		if(postMaster.checkUserExists() )  //status TRUE
			{
			res.cookie('last-login-time', date.getTime() ) ;
		 	res.render('index', { title: 'BETTER TWITTER 2'});
 
//  		 	console.log("THIS MANY SECONDS since last visit = " +  
// 		 		(date.getTime() - previousCookieTime)/1000  );
			
			  //make user logged in
			//postMaster.displayPostsPage();    //display posts page
			console.log("cookie set and ready to display a page")
			}
		else   //status of exists is false
			{
			console.log("return invalid login message to page!")
			}
	};

res.render('index', {title: 'Better Twitter'});
});






//posts display for logged in user
router.get('/posts', function(req,res,net){

		res.render('posts', { title: 'Better Twitter'  });

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
		checkUniqueName(usernameTemp, function(result){ 
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
