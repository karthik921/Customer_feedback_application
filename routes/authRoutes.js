const passport= require('passport');


module.exports=function(app){
	app.get('/', function(req,res){
		res.send('helo');
	});

	app.get('/auth/google', passport.authenticate('google',{
		scope:['profile', 'email']
		})
	);

	app.get('/auth/google/callback', passport.authenticate('google'));

	app.get('/api/logout', function(req,res){
		req.logout();
		res.send(req.user);
	});
};