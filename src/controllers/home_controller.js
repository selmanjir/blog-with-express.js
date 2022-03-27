const get_home = async (req, res, next) =>  {
    res.render('./index', {
        layout: './layout/layout.ejs',
        user: req.user ,
        isAuth: req.isAuthenticated()
    });
}



module.exports = {
    get_home
};
