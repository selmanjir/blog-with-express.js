const Authenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    else {
        req.flash('login_error', ['Lütfen önce oturum açın']);
        
        res.redirect('/login');
    }
    
    next();
    
}

const UnAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        
        return next();
    } else {
        
       const msg = '<p > Sayfaya erişebilmek için önce çıkış yapmalısın</p>'

       
       res.render('error',{
        layout: './layout/error_layout.ejs',
        msg
       }
       );
        
    }

    
}
module.exports = {
    Authenticated,
    UnAuthenticated
}
