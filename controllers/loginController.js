const mysql = require("mysql");
const config = require("../db");
// login page
const login = (req, res) => 	{
    res.render('login',{
    
    });
}


const loginPost = (req ,res) => {
	const username = req.body.username;
	const password = req.body.password;

	const connect = mysql.createConnection(config.db_connection);
    connect.connect((err) => {
        if (!err) {
            console.log("Giriş Post için Veri tabanına başarıyla bağlandı!");
        } else {
            console.log(" Giriş Post için Veri tabanına Bağlanamadı !");
        }
    })


    check_query = "select * from users where (user_name='" + username + "') and (password='" + password + "')"
    connect.query(check_query, (err,result) => {
        if (!err) {
            console.log("\n\n\n Hata Oluştu! \n\n\n");
            console.log(err);
            res.render(__dirname + "../views/error.ejs")


        } else {

            if (result==0) // sonuç yoksa yanlış user_name ve password girmiştir.
            {
                req.flash('yanlisgiris', 'Yanlış kullanıcı adı veya şifre');
                res.locals.message = req.flash();
                res.render(__dirname + "../views/error.ejs")
            } else {

                req.session.user = username;
                res.redirect("/");
            }
        }
    } )

};


module.exports = {
    login,
    loginPost,
};