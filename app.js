const express = require('express');
const path = require('path');
const bodyparser = require("body-parser");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
const router = require('./routes/userRouter');
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }))

// Set template engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Routes
app.use('/', require('./routes/routes'));
app.use(session({
    secret: uuidv4(), //  '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    resave: false,
    saveUninitialized: true
}));


app.use('/route', router);

app.get('/', (req, res) =>{
    res.render('base', { title : "Login System"});
})
const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log("Server has started at port " + PORT))