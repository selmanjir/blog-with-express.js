// controller.js


// index page
const home = (req, res) => {
    res.render('index',{
        layout:'./layout/auth_layout.ejs'
        
    });
}


module.exports =  {
    home
};