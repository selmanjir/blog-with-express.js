const express = require('express');
const app = express();

const dotenv = require('dotenv').config();
const path = require('path');

const db_connect = require('./src/config/db');
const associations = require('./src/models/associations')

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

	res.locals.success_message_black = req.flash('success_message_black');
	
	res.locals.login_error = req.flash('login_error');


	// son girdinin inputta kayıtlı kalması için controller tarafında request ile yolladığımız verileri response ediyoruz
	res.locals.olds =req.flash('olds');
	next();
});

associations();

app.use(passport.initialize());

app.use(passport.session());


// http://localhost:4111/ adresindesindeyken public klasörüne erişim sağladık
app.use('/', express.static('public'));

// __dirname'ye birkez daha değiniyim bize önceden belirttiğimiz uploads klasörünün arkasında kalan bütün path'i vermiş oldu.
// artık uploads'a bir istekte bulunduğumuzda belirttiğimiz yola gitmiş olacağız.
app.use('/uploads', express.static(path.join(__dirname,'./src/uploads')));

app.use(expressLayouts);

app.use(express.json());

app.use(express.urlencoded({extended : true }));
 // Express statik dosyaların(js, css,) yerlerine ana dizine (public) bağlı olarak bakar.

app.use('/', require('./src/routes/routes.js'));



app.set('view engine', 'ejs'); 
app.set('views',path.resolve(__dirname,'./src/views'));

app.listen(process.env.PORT, console.log(`Server has started at port ${process.env.PORT}` ))