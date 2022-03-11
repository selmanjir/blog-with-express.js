const express = require('express');
const app = express();


require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Set template engine
app.set('view engine', 'ejs');

app.use('/', express.static('public'))

// Routes
app.use('/', require('./routes/routes'));
app.use('/', require('./routes/loginRoute'));

const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log("Server has started at port " + PORT))