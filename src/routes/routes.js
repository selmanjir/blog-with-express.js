const express = require('express');

const {body, checkSchema, validationResult} = require('express-validator');

const {login, loginPost, register, registerPost, forget_password, forget_password_post, logout, verifyEmail} = require('../controllers/auth_controller')
const {getHome} = require('../controllers/home_controller')


const {registerValidate} = require('../middlewares/validation_middleware');

const checkAuth = require('../middlewares/checkAuth');


const router = express.Router();


router.get('/',checkAuth, getHome);


router.get('/login',checkAuth, login);

router.post('/login-post',checkAuth, loginPost)

router.get('/logout',checkAuth, logout); 


router.get('/register',checkAuth, register);

router.post('/register-post',[checkSchema(registerValidate),checkAuth], registerPost);

router.get('/verify',verifyEmail)


router.get('/forget_password',checkAuth, forget_password);

router.post('/forget_password_post',checkAuth, forget_password_post); 



module.exports = router;