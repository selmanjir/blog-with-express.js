const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path')


const {login,loginPost} = require('../controllers/loginController')

const router = express.Router();

router.get('/login',login);

router.post('/login-post',loginPost)

module.exports = router;