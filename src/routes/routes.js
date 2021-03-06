const express = require('express');

const {body, checkSchema, validationResult} = require('express-validator');

const {login, loginPost, register, registerPost, forget_password, forget_passwordPost, new_password, new_passwordPost, logout, verify_email,} = require('../controllers/auth_controller')
const {get_home, get_profile, post_profile} = require('../controllers/home_controller')
const {create_post, create_postPost} = require('../controllers/post_controller')


const {registerValidate, passwordValidate} = require('../middlewares/validation_middleware');
const {Authenticated, UnAuthenticated, } = require('../middlewares/auth_middleware');
const {checkAuth} = require('../middlewares/checkAuth');

const {imageUpload} = require('../config/multer_config');


const router = express.Router();


router.get('/', get_home);
router.get('/get-profile',Authenticated, checkAuth, get_profile);
router.post('/post-profile',Authenticated, checkAuth, imageUpload.single('avatar'), post_profile);

// login register forget-password..
router.get('/login',UnAuthenticated , checkAuth, login);

router.post('/login-post',UnAuthenticated, checkAuth, loginPost)

router.get('/logout',Authenticated, checkAuth, logout); 


router.get('/register',UnAuthenticated, checkAuth, register);

router.post('/register-post',[checkSchema(registerValidate),UnAuthenticated, checkAuth,], registerPost);

router.get('/verify/:id/:token', UnAuthenticated, checkAuth, verify_email)
router.get('/verify', UnAuthenticated, checkAuth, verify_email)


router.get('/forget_password',UnAuthenticated, checkAuth, forget_password);

router.post('/forget_password-post',UnAuthenticated, checkAuth, forget_passwordPost); 


router.get('/new_password/:id/:token',UnAuthenticated, checkAuth, new_password );
router.get('/new_password',UnAuthenticated, checkAuth, new_password );

router.post('/new_password-post',[checkSchema(passwordValidate),UnAuthenticated], new_passwordPost );

// post

router.get('/create-post',Authenticated,create_post);
router.post('/create-postPost',Authenticated,create_postPost);

module.exports = router;