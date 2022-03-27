const express = require('express');

const {body, checkSchema, validationResult} = require('express-validator');

const {login, loginPost, register, registerPost, forget_password, forget_passwordPost, new_password, new_passwordPost, logout, verify_email} = require('../controllers/auth_controller')
const {get_home} = require('../controllers/home_controller')


const {registerValidate, passwordValidate} = require('../middlewares/validation_middleware');

const {Authenticated, UnAuthenticated} = require('../middlewares/auth_middleware');


const router = express.Router();


router.get('/',UnAuthenticated, get_home);


router.get('/login',UnAuthenticated , login);

router.post('/login-post',UnAuthenticated, loginPost)

router.get('/logout',Authenticated, logout); 


router.get('/register',UnAuthenticated, register);

router.post('/register-post',[checkSchema(registerValidate),UnAuthenticated], registerPost);

router.get('/verify', UnAuthenticated, verify_email)


router.get('/forget_password',UnAuthenticated, forget_password);

router.post('/forget_password-post',UnAuthenticated, forget_passwordPost); 


router.get('/new_password/:id/:token',UnAuthenticated, new_password );

router.get('/new_password',UnAuthenticated, new_password );

router.post('/new_password-post',[checkSchema(passwordValidate),UnAuthenticated], new_passwordPost );


module.exports = router;