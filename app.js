const express = require('express');
const path = require('path');
const bodyparser = require("body-parser");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");

const router = require('./routes/routes.js');
const loginRouter = require('./routes/loginRoute.js');
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }))

// Set template engine
app.set('view engine', 'ejs');

app.use('/', express.static('public'))

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/assets', express.static(path.join(__dirname, 'public/media')))
app.use('/assets', express.static(path.join(__dirname, 'public/css')))
app.use('/assets', express.static(path.join(__dirname, 'public/js')))
// Routes
app.use('/', require('./routes/routes'));
app.use('/', require('./routes/loginRoute'));
app.use(session({
    secret: uuidv4(), //  '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    resave: false,
    saveUninitialized: true
}));

// app.route('/login').get(function(req, res) { 
//     return res.sendFile(path.join(__dirname, '/')); 
// });
app.use('/home', router);
app.use('/login', loginRouter);
app.use('/', loginRouter);

const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log("Server has started at port " + PORT))