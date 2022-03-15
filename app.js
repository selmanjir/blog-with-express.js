const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv').config();
const app = express();


const expressLayouts = require('express-ejs-layouts');
const path = require('path');

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

// Set template engine
app.set('view engine', 'ejs');
app.set('views',path.resolve(__dirname,'./src/views'));

app.use(expressLayouts);

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'static')))


app.use('/', require('./src/routes/routes'));
app.use('/', require('./src/routes/auth_router'));

app.use('/', express.static('public'))

// Routes

app.listen(process.env.PORT, console.log(`Server has started at port ${process.env.PORT}` ))