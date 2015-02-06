var postMaster = require('../functions.js');


describe("checkUserExists", function () {
	it("should pass true to the callback only if username and password match the name and password of a row in the users table", function(done) {
		postMaster.checkUserExists('', '', expectFalse1);
		
		function expectFalse1 (result) {
			expect(result).toEqual(false);
			console.log('test 1: ' + result);
			postMaster.checkUserExists('DAVID', 'PASSWORD', expectTrue1);
		};

		function expectTrue1 (result) {
			expect(result).toEqual(true);
			console.log('test2: ' + result);
			done();
		};
	});
});

describe("checkUniqueName", function () {
	it("should pass false to the callback only if username matches the name of a row in the users table", function(done) {
		postMaster.checkUniqueName('DAVID', expectFalse2);
		
		function expectFalse2 (result) {
			expect(result).toEqual(false);
			console.log('test 1: ' + result);
			postMaster.checkUniqueName('', expectTrue2);
		};

		function expectTrue2 (result) {
			expect(result).toEqual(true);
			console.log('test2: ' + result);
			done();
		};
	});
});



describe("displayPostsPage", function () {
	it("should pass html containing authors and posts to the callback", function(done) {
		postMaster.displayPostsPage(expectPost);
		
		function expectPost (result) {
			expect(result).toEqual('<h3>Miles</h3><p>this is the first post</p>');
			console.log('test 1: ' + result);
			done();
		};
	});
});



describe("checkLoggedInStatus", function () {
	it("should pass true to the callback if cookies['last-login-time'] is within 60 seconds of date.getTime()", function(done) {
		postMaster.checkLoggedInStatus({'last-login-time': Date.now() - 55000}, function(result) {
			expect(result).toEqual(true);
			postMaster.checkLoggedInStatus({'last-login-time': Date.now() - 65000}, function(result) {
				expect(result).toEqual(false);
				done();
			});
		});
	});
});



