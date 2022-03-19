
const mysql = require("mysql");
const config = require("../config/db");
const user = require("../../src/models/user");

const {validationResult} = require('express-validator');
 


const login = async (req, res, next) => 	{
    
    res.render('login',{
        layout: './layout/auth_layout.ejs'
    });
}
const loginPost = async (req ,res, next) => {
    
	const username = req.body.username;
	const password = req.body.password;

    let userLog = await user.findOne({
        where: {
            username: username,
            password: password
        }
    })
    const notFound = '<h1 class="notfound-404" >:(</h1>';
    if (userLog){
        req.session.user = userLog
        res.send('başarılı bir şekilde giriş yapıldı')
    }else{
        res.render('error',{
            layout : './testLayout/test.ejs',
            username,
            password,
            notFound
        })
    };

};



const register = async (req, res, next) => 	{

    res.render('register',{
        
        layout: './layout/auth_layout.ejs'
    });
}

const registerPost = async (req, res, next) => 	{
    const errors  = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('validation_error', errors.array());
        req.flash('email', req.body.email);
        req.flash('username', req.body.username);
        req.flash('password', req.body.password);
        req.flash('repassword', req.body.repassword);
        req.flash('full_name', req.body.full_name);
        res.redirect('/register') 
    }

}
const forget_password = async (req, res, next) => 	{
    
    res.render('forget_password',{
        layout: './layout/auth_layout.ejs'
    });
}
const forget_password_post = async (req, res, next) => 	{
    
    console.log(req.body);
    res.render('forget_password',{
        layout: './layout/auth_layout.ejs'
    });
}

module.exports = {
    login,
    loginPost,
    register,
    registerPost,
    forget_password,
    forget_password_post
};