const express = require('express');

const {login,loginPost} = require('../controllers/loginController')

const router = express.Router();

router.get('/login',login);

router.post('/login-post',loginPost)

module.exports = router;