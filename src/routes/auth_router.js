const express = require('express');

const middlewares = require('../middlewares/validation_middleware');
const authController = require('../controllers/auth_controller')

const router = express.Router();

router.get('/login',authController.login);

router.post('/login-post',middlewares.loginValidate(),authController.loginPost)

router.get('/register',authController.register);

router.post('/register',middlewares.registerValidate(),authController.registerPost);

router.get('/forget_password',authController.forget_password);

router.post('/forget_password',authController.forget_password_post); 


module.exports = router;