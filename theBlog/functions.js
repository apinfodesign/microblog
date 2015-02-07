var development = require('./knexfile.js').development;
var knex = require('knex')(development);


function checkUserExists (username, pword, callback){
	var result= true;
 
	var id ="";
	knex('users').where({name: username, password: pword}).select('id').then( function (allpairs) { 
		if (allpairs.length === 0){
			result=false;
		}  //if any results returned, then false	
		else
		{
			id=allpairs[0].id  
		}
 
  	callback(result, id);
 	});
};   //dh

///THIS VERSION IS DEPRECIATED
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
				contents = '<div class="name"> User Name: ' + obj.name + '</div>' + '<div class= posts > ' + obj.text +'</div>' ;
				//	console.log(contents);
			//PUSH ELEMENT TO ARRAY
				somePosts.push(contents);   //ASSEMBLE ARRAY
				//	console.log (somePosts + " is somePosts");
		});
	somePosts.reverse();   		//REVERSE ARRAY ORDER 
	var reducedPosts = somePosts.slice(0,6);      //KEEP FIRST N ELEMENTS ONLY
	var stringifiedPosts = reducedPosts.join('');   	//TRANSFORM TO STRING
				 console.log("UUUUUUUUUUUUUUUU  " + stringifiedPosts + " is somePosts string");
	contents=stringifiedPosts;			//HAND TO CONTENTS
  	callback(contents);			//HAND TO CALLBACK
 	});
};    //mh





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
 
 
 	if ( ((Date.now() - previousCookieTime)/1000)  < 3000 )
 
		{callback(true) }
	else
		{callback(false) }
 };   //mh

	//read cookie
	//if no cookie return FALSE
	//if cookie > 5 minutes old return FALSE
	//if cookie is < 5 minutes old return TRUE



module.exports = {
	'checkUniqueName': checkUniqueName,
	'displayPostsPage': displayPostsPage,
	'checkLoggedInStatus': checkLoggedInStatus,
	'checkUserExists': checkUserExists
}