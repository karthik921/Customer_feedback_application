const express = require('express');

const authRoutes= require('./routes/authRoutes');
const mongoose=require('mongoose');
const keys=require('./config/keys');
require('./models/user');
require('./services/passport');
const cookieSession=require('cookie-session');
const passport=require('passport');

const app= express();

app.use(cookieSession({
		maxAge: 30*24*60*60*1000,
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
mongoose.connect(keys.mongoURI);

if (process.env.NODE_ENV=='production'){
	//express will serve up production assets like main.js or main.css
	app.use(express.static('client/build'));

	//express will serve up the index.html, if it doesn't recognise the route
	const path= require('path');
	app.get('*', (req, res)=>{
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT= process.env.PORT || 5000;
app.listen(PORT);