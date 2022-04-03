checkAuth = (req, res, next) => {
    if(req.isAuthenticated()){
        res.locals.user = req.user
    }
    res.locals.isAuth = req.isAuthenticated()
    next()
}
module.exports = {
    checkAuth
}