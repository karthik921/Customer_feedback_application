const passport= require('passport');


module.exports=function(app){
/*	app.get('/', function(req,res){
		res.send('helo');
	});
*/
	app.get('/auth/google', passport.authenticate('google',{
		scope:['profile', 'email']
		})
	);

	app.get('/auth/google/callback', passport.authenticate('google'), function(req, res){
		res.redirect('/surveys');
	});

	app.get('/api/logout', function(req,res){
		req.logout();
		res.redirect('/');
	});

	app.get('/api/current_user', function(req, res){
		res.send(req.user);
	});
};