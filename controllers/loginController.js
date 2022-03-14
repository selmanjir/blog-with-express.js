const { redirect } = require("express/lib/response");
const mysql = require("mysql");
const config = require("../db");
const user = require("../models/users")
// login page
const login = async (req, res) => 	{
    
    res.render('login',{
    
    });
}


const loginPost = async (req ,res) => {
	const username = req.body.user_name;
	const password = req.body.password;

    let userLog = await user.findOne({
        where: {
            user_name: username,
            password: password
        }
    })

    if (userLog){
        req.session.user = userLog
        res.send('başarılı bir şekilde giriş yapıldı')
    }else{
        res.render('error')
    };

};


module.exports = {
    login,
    loginPost,
};