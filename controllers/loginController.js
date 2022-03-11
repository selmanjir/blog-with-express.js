const  credential = {
    email : "selmanjir@gmail.com",
    password : "123"
}

// login page
const login = (req, res) => {
    res.render('login',{
    
    });
}


const loginPost = (req, res)=>{
    if(req.body.email == credential.email && req.body.password == credential.password){
        res.redirect('/');
    }else{
        res.end("Invalid Username")
    }

}
module.exports = {
    login,
    loginPost
};