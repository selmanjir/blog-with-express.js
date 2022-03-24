const express = require('express');

const {body, checkSchema, validationResult} = require('express-validator');

const authController = require('../controllers/auth_controller')
const homeController = require('../controllers/home_controller')


const {registerValidate, emailValidate} = require('../middlewares/validation_middleware');

const checkAuth = require('../middlewares/checkAuth');


const router = express.Router();


router.get('/',checkAuth,homeController.getHome);; 

router.get('/login',checkAuth,authController.login);

router.post('/login-post',checkAuth,authController.loginPost)

router.get('/register',checkAuth,authController.register);

router.post('/register-post',[checkSchema(registerValidate),checkAuth], authController.registerPost);

router.get('/forget_password',checkAuth,authController.forget_password);

router.post('/forget_password_post',checkAuth, authController.forget_password_post); 

router.get('/logout',checkAuth,authController.logout); 


module.exports = router;