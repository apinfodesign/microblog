var express = require('express');
var knex = require('knex')(require('../knexfile.js').development);
var router = express.Router();
var development = require('../knexfile.js').development;
var knex = require('knex')(development);

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

 
	if (checkLoggedInStatus(req.cookies)  //status TRUE
		{
 		console.log ("dipslayPostsPage should happen here")
 		//displayPostsPage();
		}	
	else  //checkLoggedInStatus is FALSE
	{
		if(checkUserExists() )  //status TRUE
			{
			setCookie(req.cookies);  //make user logged in
			//displayPostsPage();    //display posts page
			console.log("cookie set and ready to display a page")
			}
		else   //status of exists is false
			{
			console.log("return invalid login message to page!")
			}
	};

res.render('index', {title: 'Better Twitter'});
});



//read and evaluate cookie - takes cookie object returns true/false
function checkLoggedInStatus(cookies){
 	var date = new Date();
	var previousCookieTime = cookies['last-login-time']; //get old cookie value

	console.log("Seconds since last visit = " +  (date.getTime() - previousCookieTime)/1000  );
 
 	if ( ((date.getTime() - previousCookieTime)/1000)  < 60 )
		{return true }
	else
		{return false}
 };   //mh

	//read cookie
	//if no cookie return FALSE
	//if cookie > 5 minutes old return FALSE
	//if cookie is < 5 minutes old return TRUE

function setCookie(cookies){
			res.cookie('last-login-time', date.getTime() ) ;
		 	res.render('index', { title: 'BETTER TWITTER 2'});
 
 		 	console.log("THIS MANY SECONDS since last visit = " +  
		 		(date.getTime() - previousCookieTime)/1000  );
		});
};  //mh




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

function checkLoggedInStatus(){};   //mh

function checkUserExists (username, pword, callback){
	var result= true;
	
	knex('users').where({name: username, password: pword}).select('name').then( function (allpairs) { 
		if (allpairs.length!==0){
			result=false;
		}  //if any results returned, then false	
  	callback(result);
 	});
};   //dh

function setCookie(){};   	 //mh

function displayPostsPage(callback){
	var contents= '';
	
	knex.select('users.name', 'posts.text').from('posts').leftJoin('users', 'posts.author_id', 'users.id').then( function (authortext) { 
		authortext.forEach( function (obj) {
			contents += '<h3>';
			contents += obj.name;
			contents += '</h3>';
			contents += '<p>';
			contents += obj.text;
			contents += '</p>';
		});
  	callback(contents);
 	});
};    //dh


function checkUniqueName (username, callback){
	var result= true;
	
	knex('users').where({name: username}).select('name').then(function(allnames){ 
		if (allnames.length!==0){
			result=false;
		}  //if any results returned, then false	
  	callback(result);
 	});
};
 

module.exports = router;
