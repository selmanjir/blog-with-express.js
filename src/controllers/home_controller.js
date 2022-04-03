const user = require('../models/user');


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
    
    try {
       
        // passport local nasıl ki bizim requestmize user gibi bir alan getiriyorsa multer paketide file gibi bir alan getiriyor
        //console.log(req.file); 
       
        
        const result = await user.update(
            { username : req.body.username,
              full_name : req.body.full_name,
              avatar : req.file.filename    
            },
            { where : {id : req.user.id} },
            )
            if (result) {
                console.log("Güncelleme işlemi başarılı ");
                req.flash('success_message_black',[{msg  :'Bilgiler başarılı bir şekilde güncellendi'}])
                res.redirect('/get-profile')
            }else{
                req.flash('error',[{msg :'Güncelleme işlemi başarısız'}])
                res.redirect('/get-profile')
            }
            
            
            
        } catch (error) {
            console.log(error);
        }
    }
    
    module.exports = {
        get_home,
        get_profile,
        post_profile
    };
    