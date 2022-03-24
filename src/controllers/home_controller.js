const getHome = async (req, res, next) =>  {
    res.render('./index', {
        layout: './layout/layout.ejs',
        user: req.user ,
        isAuth: req.isAuthenticated()
    });
}



module.exports = {
    getHome
};
