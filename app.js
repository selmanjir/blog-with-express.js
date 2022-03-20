const express = require('express');
const app = express();

const dotenv = require('dotenv').config();
const path = require('path');

const db_connect = require('./src/config/db');

const expressLayouts = require('express-ejs-layouts');
const flash = require ('connect-flash');

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('passport');



const myStore = new SequelizeStore({
	db: db_connect,
});

app.use(session( {
	secret : process.env.SESSION_SECRET,
	resave : false,
	saveUninitialized : true,
	store: myStore,
	cookie : {
	checkExpirationInterval: 15 * 60 * 1000, // Milisaniye cinsinden süresi dolmuş oturumları temizleme aralığı.
	expiration :1000*60*60 //  Geçerli bir oturumun maksimum yaşı (milisaniye cinsinden)
	} 	
}));
// create database table
myStore.sync();

app.use(flash());
app.use((req,res,next) => {
	res.locals.validation_error = req.flash('validation_error');
	
	res.locals.success_message = req.flash('success_message');
	
	res.locals.login_error = req.flash('error');
	
	// son girdinin inputta kayıtlı kalması için controller tarafında request ile yolladığımız verileri response ediyoruz
	res.locals.email = req.flash('email');
	res.locals.username = req.flash('username');
	res.locals.full_name = req.flash('full_name');
	res.locals.password = req.flash('password');
	res.locals.repassword = req.flash('repassword');
	next();
});

app.use(passport.initialize());
app.use(passport.session());

// Express statik dosyaların(js, css,) yerlerine ana dizine (public) bağlı olarak bakar.
app.use('/', express.static('public'))

// Set template engine
app.set('view engine', 'ejs'); 
// default views yoluna güncelleme
app.set('views',path.resolve(__dirname,'./src/views'));

app.use(expressLayouts);

app.use(express.json());

// URL'den gövdeleri ayrıştırmak için ara katman yazılımı.
app.use(express.urlencoded({extended : true }))

// Routes

app.use('/', require('./src/routes/auth_router'));
app.use('/', require('./src/routes/home_page_router'));




app.listen(process.env.PORT, console.log(`Server has started at port ${process.env.PORT}` ))