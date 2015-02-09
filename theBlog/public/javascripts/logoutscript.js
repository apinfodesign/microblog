<<<<<<< HEAD


#('logout').on(click)function(){
 	docCookies.removeItem('last-login-time');
=======
var logoutButton = document.getElementById('logout');

logoutButton.addEventListener("click", function() {
	document.cookie = 'last-login-time=0';
	document.location.reload();
>>>>>>> 8f2cc93eadc07e7bbe3d4e0298418b43843caa36
});