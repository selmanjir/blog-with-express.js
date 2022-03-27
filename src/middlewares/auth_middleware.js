

const Authenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        res.locals.user = req.user
        
        res.locals.isAuth = req.isAuthenticated()
    }
    else {
        req.flash('error', ['Lütfen önce oturum açın']);
        
        res.redirect('/login')
    }
    
    next();
    
}

const UnAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        
        res.locals.user = req.user
        
        
        res.locals.isAuth = req.isAuthenticated()
    } else {
        
    }
    
    next();
    
}
module.exports = {
    Authenticated,
    UnAuthenticated
}
