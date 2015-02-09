var development = require('./knexfile.js').development;
var knex = require('knex')(development);

//
function checkUserExists (username, pword, callback){
	var result= true;
 	var name = "";
	var id ="";
	knex('users').where({name: username, password: pword}).select('id', 'name').then( function (allpairs) { 
		if (allpairs.length === 0){
			result=false;
		}  //if any results returned, then false	
		else
		{
			console.log(allpairs);
			id=allpairs[0].id;  
			name=allpairs[0].name;
			console.log("id and name are " + id + "  " + name);
		}
 
  	callback(result, id, name);
 	});
};   //dh

///THIS VERSION IS DEPRECIATED  -
function displayPostsPageORIGINAL(callback){
	var contents= '';
	
	knex.select('users.name', 'posts.text').from('posts').leftJoin('users', 'posts.author_id', 'users.id').then( function (authortext) { 
		authortext.forEach( function (obj) {
			contents = '</div>' + contents;
			contents = obj.text + contents;
			contents = '<div class="posts" > ' + contents;
			contents = '</div>' + contents;
			contents = obj.name + contents;
			contents = '<div class ="name"> User Name: ' + contents;
		});
  	callback(contents);
 	});
};    //dh

//  NEW VERSION OF displayPostsPage MH
function displayPostsPage(callback){
	var contents= '';
	var somePosts=[];
 	
 
	knex.select('users.name', 'posts.text').from('posts').leftJoin('users', 'posts.author_id', 'users.id').then( function (authortext) { 
		authortext.forEach( function (obj) {
													//ASSEMBLE ONE ELEMENT
			contents = '<div class=\'posts\'><h3> ' + obj.name + '</h3>' + '<p> ' + obj.text +'</p></div>' ;
			somePosts.push(contents);   			//ASSEMBLE ARRAY
			//currentUserName = obj.name;
 		});
	somePosts.reverse();   							//REVERSE ARRAY ORDER 
	var reducedPosts = somePosts.slice(0,6);      	//KEEP MOST RECENT N ELEMENTS ONLY
	var stringifiedPosts = reducedPosts.join('');   //TRANSFORM TO STRING, JOIN USING EMPTY CHARACTER (NO COMMA)
				 				//console.log("UUUUUUUUUUUUUUUU  " + stringifiedPosts + " is somePosts string");
 
	//DOES NOT INSERT CURRENT USER ON FIRST LOGIN AS NEW USER - REFLECTS CURRENT USER AFTER FIRST POST
	contents= stringifiedPosts;	//PASS TO CONTENTS, INCLUDE USERNAME
  	callback(contents);								//PASS TO CALLBACK
 	});
};    //mh


//takes a user name and a call back function >>>>   returns result true or false
function checkUniqueName (username, callback){
	var result= true;
	
	knex('users').where({name: username}).select('name').then(function(allnames){ 
		if (allnames.length!==0){
			result=false;
		}  //if any results returned, then false	
  	callback(result);
 	});
};


//read and evaluate cookie - takes cookie object returns true/false
function checkLoggedInStatus(cookies, callback){
	var previousCookieTime = cookies['last-login-time']; //get old cookie value

	console.log("Seconds since last visit = " +  (Date.now() - previousCookieTime)/1000  );
 
 
 	if ( ((Date.now() - previousCookieTime)/1000)  < 600 )
 
		{callback(true) }
	else
		{callback(false) }
 };   //mh

	//read cookie
	//if no cookie return FALSE
	//if cookie > 5 minutes old return FALSE
	//if cookie is < 5 minutes old return TRUE


//????????
function checkUserCookieIDmatchesUser(cookies, callback){
   var userCookieID = cookies['id'];
   console.log("The user Cookie id number is " + userCookieID);



};


module.exports = {
	'checkUniqueName': checkUniqueName,
	'displayPostsPage': displayPostsPage,
	'checkLoggedInStatus': checkLoggedInStatus,
	'checkUserExists': checkUserExists
}