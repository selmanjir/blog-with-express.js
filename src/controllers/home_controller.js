const get_home = async (req, res, next) =>  {
    res.render('./index', {
        layout: './layout/layout.ejs',
        user: req.user ,
        isAuth: req.isAuthenticated()
    });
}
const get_profile = async (req, res, next) => {
    res.render('./profile', {
        layout : './layout/layout.ejs',
        user: req.user ,
        isAuth: req.isAuthenticated()
    })
}
const post_profile = async (req, res, next) => {

}

module.exports = {
    get_home,
    get_profile,
    post_profile
};
