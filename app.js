const express = require('express');
const app = express();

const dotenv = require('dotenv').config();
const path = require('path');

const expressLayouts = require('express-ejs-layouts');
const flash = require ('connect-flash');

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db_connect = require('./src/config/db');

const myStore = new SequelizeStore({
	db: db_connect,
  });

app.use(session( {
	secret : process.env.SESSION_SECRET,
	resave : false,
	saveUninitialized : true,
	 store: myStore,
	cookie : {
	maxAge :1000*60
	} 	
}));
// create database table
myStore.sync();

app.use(flash());
app.use((req,res,next) => {
	res.locals.validation_error = req.flash('validation_error');
	res.locals.success_message = req.flash('success_message');
	res.locals.email = req.flash('email');
	res.locals.username = req.flash('username');
	res.locals.full_name = req.flash('full_name');
	res.locals.password = req.flash('password');
	res.locals.repassword = req.flash('repassword');
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