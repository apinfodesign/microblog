var logoutButton = document.getElementById('logout');

logoutButton.addEventListener("click", function() {
	document.cookie = 'last-login-time=0';
	document.location.reload();
});