var express = require('express');
var router = express.Router();
var development = require('../knexfile.js').development;
var knex = require('knex')(development);
var postMaster = require('../functions.js');
 
var redis = require("redis"),
    client = redis.createClient(); 

var idValue=22;
var authorIDvalue="joe";
var text = "here is my post ";

client.set("key", "string val", function(err, response){
  client.get("key", function(err, response){
     console.log(response);
  	
  });
});

// console.log( key);

// client.mset("id", idValue, "author_id", authorIDvalue, "text", text, redis.print);
// console.log (id +  author_id + text);



//client.get('id', "author_id", "text", redis.print);

  
 
function readFromCacheOrContinueToDatabase(){
	//check cache for current user
		//if user posts present and recent hand back
		//else continue to current function


};

 
//RECEIVES request cookies
	//OUTPUTS request cookies
		//RECEIVES request cookies and checkLoggedInStatus function
			//OUTPUTS: logged in status true and redirect to POSTS page
		//RECEIVES username pwd and checkUserExists function
			//OUTPUTS user exists true >>> reset cookie
			//OUTPUTS user exists false >>> error message

/* GET SIGN IN page. */
router.get('/', function(req, res, next) {
 
  var usernameReg = req.query.usernameRegistered;    
  var passwordReg = req.query.passwordRegistered;

 	postMaster.checkLoggedInStatus(req.cookies, function(result) {
		console.log('logged in status is ' + result);
		if (result===true) {  //status TRUE - USER HAS RECENT COOKIE
		
			res.redirect('/posts');
		}	
		else { //checkLoggedInStatus is FALSE - USER HAS NO RECENT COOKIE
			postMaster.checkUserExists(usernameReg, passwordReg, function (result, id, name) {
				console.log('CURRENT login status is ' + result);
				if(result)  //status TRUE - USER DOES EXIST 
				{
					res.cookie('last-login-time', Date.now());   //SET NEW TIME COOKIE
//				res.cookie('rememberme', '1', { maxAge: 10000, httpOnly: true });
					res.cookie('id', id);                        //SET NEW ID COOKIE
					res.cookie('name', name);    //ALSO SEND USER NAME TO COOKIE
					res.redirect('/posts');						 //REDIRECT TO POSTS PAGE
				}
				else { //status FALSE - USER DOES NOT EXIST and COOKIE IS OLD
 					res.render('index', {title: 'Better Twitter', message: '<p>Login failed</p>' });
				}
			});  //close checkUserExists
 		}
 	});  //close checkLoggedInStatus
}); // close router.get
 
var time;
//posts display for logged in user
router.get('/posts', function(req,res,next){      
	//AS USUAL, READ REQUEST COOKIES, RETURN/DO CALLBACK FUNCTION

	if (req.query.logoutRequest === true)
		{
		console.log("logout request received");
		res.clearCookie('last-login-time'); 

		res.redirect('/'); 
		}

 	//RECEIVES: req.cookies and a call back function
		//RECEIVES:  user logged in status
			//OUTPUTS:  saves the user post
			//OUTPUTS:  display the posts list
	 
	postMaster.checkLoggedInStatus(req.cookies, function(result) {
		console.log('logged in status is ' + result);       
		if (result)  //status TRUE (USER LOGGED IN and NEW COOKIE SET) 
			{
 				//IF STATEMENT - AVOID IDENTICAL POST AND AVOID UNDEFINED POST AND AVOID EMPTY POST - IF SO, SAVE NEW POST
				console.log('req.query.post is ' + req.query.post + '\nreq.cookies[\'last-post\'] is ' + req.cookies['last-post']); 

				if (req.query.post !== req.cookies['last-post'] && req.query.post !== undefined && req.query.post !== '') {
					var newpost = req.query.post;    
					res.cookie('last-post', newpost);  
					var id = req.cookies.id;  //GRAB AUTHOR ID FOR DATABASE WRITE
					knex('posts').insert({author_id: id, text: newpost }).then();   
				}
				
				setTimeout(function () {
 
					res.cookie('last-login-time', Date.now());
					var welMes = ("<p>Welcome "  +  req.cookies.name  + '!</p>')
					client.get('postsText', function (err, getResult) {
						if (getResult !== null) {
							console.log('get result is: ' + getResult);
							console.log('cached version showing after ' + ((Date.now() - time)/1000) + ' seconds');
								res.render('posts', {title: 'BETTER TWITTER', text: getResult, message: welMes,});
						} else {
							console.log('get result is: ' + getResult);
							console.log('postgres version showing after ' + ((Date.now() - time)/1000) + ' seconds');
							postMaster.displayPostsPage(function (result) {
								client.set('postsText', result, 'ex', '10', function (){time = Date.now()});
 
								res.render('posts', {title: 'BETTER TWITTER', text: result, message: welMes,}) 
							});
						}
					});
				}, 500);
   			}
		else
			{	console.log("User not logged in - Message KKKKKK")
				res.redirect('/');   //USER NOT LOGGED IN 
			}
	});
});


//CREATES A NEW USER NAME PWD EMAIL

router.get('/registration/', function (req, res, next) {

  var usernameTemp = req.query.username;    //READ INCOMING USERNAME
  if (usernameTemp === undefined) {         //DON'T LET USERNAME BE UNDEFINED
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

								//REQUIRE VALID USERNAME PASSWORD EMAIL
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

	// IF NO ERROR IN NAME/PASSWORD/EMAIL SHAPE, THEN BEGIN CREATE ACCOUNT
	//
	//  give it a user name and the checkUniqueName function  and return a result of true or false
	if (!error) {
		postMaster.checkUniqueName(usernameTemp, function(result){   //IF NAME UNIQUE, WRITE TO DATABASE
			if (result) {
				knex('users').insert({name: usernameTemp, password: passwordTemp, email: emailTemp}).then();
				res.render('index', { title: 'Better Twitter' });
			}
			else{
				errorMessage ='<p>Username already exists.  Please sign in or choose a different user name.</p>';
				res.render('registration', { title: 'Better Twitter', message: errorMessage, uname: usernameFinal, pass: passwordFinal, email: emailFinal });
			}	
		});
	} else {   //IF NAME/PASSWORD/EMAIL SHAPE IS BAD RENDER REG PAGE WITH ERROR MESSAGE AND GOOD USER ENTERED VALUES ONLY
		res.render('registration', { title: 'Better Twitter', message: errorMessage, uname: usernameFinal, pass: passwordFinal, email: emailFinal });
	}
 
}); //close router.get



module.exports = router;
