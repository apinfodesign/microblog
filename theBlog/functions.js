var development = require('./knexfile.js').development;
var knex = require('knex')(development);



function checkUserExists (username, pword, callback){
	var result= true;
	var id = '';
	knex('users').where({name: username, password: pword}).select('id').then( function (allpairs) { 
		
		if (allpairs.length === 0){
			result=false;
		}  //if any results returned, then false
		else {
			id = allpairs[0].id;
		}	
  	callback(result, id);
 	});
};   //dh



function displayPostsPage(callback){
	var contents= '';
	
	knex.select('users.name', 'posts.text').from('posts').leftJoin('users', 'posts.author_id', 'users.id').then( function (authortext) { 
		authortext.forEach( function (obj) {
			contents = '</p>' + contents;
			contents = obj.text + contents;
			contents = '<p>' + contents;
			contents = '</h3>' + contents;
			contents = obj.name + contents;
			contents = '<h3>' + contents;
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


//read and evaluate cookie - takes cookie object returns true/false
function checkLoggedInStatus(cookies, callback){
	var previousCookieTime = cookies['last-login-time']; //get old cookie value

	console.log("Seconds since last visit = " +  (Date.now() - previousCookieTime)/1000  );
 
 	if ( ((Date.now() - previousCookieTime)/1000)  < 600)
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