
const  credential = {
    email : "selmanjir@gmail.com",
    password : "admin123"
}

// login page
const login = (req, res) => {
    res.render('login',{
        
    });
}


const loginPost = (req, res)=>{
    if(req.body.email == credential.email && req.body.password == credential.password){
        req.session.user = req.body.email;
        res.redirect('/');
        //res.end("Login Successful...!");
    }else{
        res.end("Invalid Username")
    }

}
module.exports = {
    login,
    loginPost
};