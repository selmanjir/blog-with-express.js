const dotenv = require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const flash = require ('connect-flash');

let test = 0;
app.use(session( {
	secret : process.env.SESSION_SECRET,
	resave : false,
	saveUninitialized : true,
	cookie : {
	maxAge :1000*5
	} 	
}));

app.use(flash());
app.use((req,res,next) => {
	res.locals.validation_error = req.flash('validation_error');
	next();
});

app.use('/', express.static('public'))

// Set template engine
app.set('view engine', 'ejs');
app.set('views',path.resolve(__dirname,'./src/views'));
app.set('auth_layout',path.resolve(__dirname,'./src/views/layout/'));

app.use(express.static(path.join(__dirname, 'static')))

app.use(expressLayouts);

app.use(express.json());

//formdan gelen değerlerin okunabilmesi için
app.use(express.urlencoded({extended : true }))

// Routes
app.use('/', require('./src/routes/routes'));
app.use('/', require('./src/routes/auth_router'));




app.listen(process.env.PORT, console.log(`Server has started at port ${process.env.PORT}` ))