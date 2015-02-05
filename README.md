# microblog

The requirements of this page are
 - user register.  This requires storing the following:
	* username
	* password
	* email address
	User Submits via Post method
	Check if exists
		// if exists giver error message
		// if does NOT exist, write to User table
			In Index.js is a function that puts name/pwd/email in User table.
			// give congratulation message

user Sign-in
	*username
	*password
	user submits via Post method
	check if user exists
		//if no exist return error
		//if yes exists 
			//set cookie for logged in user with timestamp/expiration
			//display 
				// user info (name)
				// most recent posts (to n)

user Sign-out
	clear cookie
	clear post display

display posts
  	* create posts.  This includes
 		- the text  (user text box)
 		- the date  (supplied by system)
 		- the username (supplied by system)
 		- submit button, via POST method

 	* view posts (reverse time order)
 		- display posts
 		- each username has followers
 		- create display all/followed users only
 
 	* eventually posts should have
 		- searchable tags
 		
 