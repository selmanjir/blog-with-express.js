const Authenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    else {
        req.flash('error', ['Lütfen önce oturum açın']);
        
        res.redirect('/login');
    }
    
    next();
    
}

const UnAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        
        return next();
    } else {
    
        res.redirect('/');
    }

    
}
module.exports = {
    Authenticated,
    UnAuthenticated
}
