// controller.js


// index page
const home = (req, res) => {
    res.render('index',{
        layout:'./layout/layout.ejs'
        
    });
}


module.exports =  {
    home
};