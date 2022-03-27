const express = require('express');

const {body, checkSchema, validationResult} = require('express-validator');

const {login, loginPost, register, registerPost, forget_password, forget_passwordPost, new_password, new_passwordPost, logout, verify_email} = require('../controllers/auth_controller')
const {get_home} = require('../controllers/home_controller')


const {registerValidate, passwordValidate} = require('../middlewares/validation_middleware');

const checkAuth = require('../middlewares/checkAuth');


const router = express.Router();


router.get('/',checkAuth, get_home);


router.get('/login',checkAuth, login);

router.post('/login-post',checkAuth, loginPost)

router.get('/logout',checkAuth, logout); 


router.get('/register',checkAuth, register);

router.post('/register-post',[checkSchema(registerValidate),checkAuth], registerPost);

router.get('/verify',verify_email)


router.get('/forget_password',checkAuth, forget_password);

router.post('/forget_password-post',checkAuth, forget_passwordPost); 


router.get('/new_password/:id/:token',checkAuth, new_password );

router.get('/new_password',checkAuth, new_password );

router.post('/new_password-post',[checkSchema(passwordValidate),checkAuth], new_passwordPost );


module.exports = router;