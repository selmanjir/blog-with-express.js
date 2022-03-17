
const mysql = require("mysql");
const config = require("../config/db");
const user = require("../../src/models/user")
// login page
const login = async (req, res, next) => 	{
    
    res.render('login',{
        layout: './layout/auth_layout.ejs'
    });
}
const register = async (req, res, next) => 	{
    
    res.render('register',{
        layout: './layout/auth_layout.ejs'
    });
}

const registerPost = async (req, res, next) => 	{
    console.log(req.body);
    res.render('register',{
        layout: './layout/auth_layout.ejs'
    });
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


module.exports = {
    login,
    loginPost,
    register,
    forget_password,
    registerPost,
    forget_password_post
};