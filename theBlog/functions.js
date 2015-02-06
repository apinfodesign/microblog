var development = require('./knexfile.js').development;
var knex = require('knex')(development);

function checkLoggedInStatus(){};   //mh

function checkUserExists (username, pword, callback){
	var result= true;
	
	knex('users').where({name: username, password: pword}).select('name').then( function (allpairs) { 
		if (allpairs.length === 0){
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

module.exports = {
	'checkUniqueName': checkUniqueName,
	'displayPostsPage': displayPostsPage,
	'setCookie': setCookie,
	'checkLoggedInStatus': checkLoggedInStatus,
	'checkUserExists': checkUserExists
}