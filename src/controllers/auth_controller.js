
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const mysql = require("mysql");
const config = require("../config/db");
const user = require("../models/user");

const {validationResult} = require('express-validator');
const passport = require("passport");
// passport-local bizden bir passport objesi bekliyordu burada require ettiğimiz passport'u gönderiyoruz
require('../config/passport_local')(passport);


const login = async (req, res, next) => {
    
    res.render('login',{
        layout: './layout/layout.ejs'
    });
}
const loginPost = async (req ,res, next) => {
    const errors  = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        // requestten gelen hatalar objesi boş değilse validation_error yolla içini errors dizi ile doldur 
        req.flash('validation_error', errors.array());
        
    }
    
    let olds = {'email' : req.body.email}
    req.flash('olds',olds)
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
    (req, res, next);
    
    
    // login test
    // const username = req.body.username;
    // const password = req.body.password;
    
    // let userLog = await user.findOne({
    //     where: {
    //         username: username,
    //         password: password
    //     }
    // })
    // const notFound = '<h1 class="notfound-404" >:(</h1>';
    // if (userLog){
    //     req.session.user = userLog
    //     res.send('başarılı bir şekilde giriş yapıldı')
    // }else{
    //     res.render('error',{
    //         layout : './testLayout/test.ejs',
    //         username,
    //         password,
    //         notFound
    //     })
    // };
    
};
const logout = (req, res, next) => {
    // sessiondaki id bilgisi siler
    req.logout();
    // drekt session siler
    req.session.destroy((erroy) => {
        res.clearCookie('connect.sid');
        res.redirect('/login');
    })
}


const register = async (req, res, next) => 	{
    
    res.render('register',{
        
        layout: './layout/layout.ejs'
    });
}


const registerPost = async (req, res, next) => 	{
    const errors  = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('validation_error', errors.array());
        let olds = {'full_name' : req.body.full_name, 'username' : req.body.username, 'email' : req.body.email,}
        req.flash('olds', olds);
        console.log("1.hata bloğu");
        
        res.redirect('/register') 
    }
    else {
        try {
            const _user = await user.findOne({ 
                where : {
                    email : req.body.email
                }
            });
            
            if (_user && _user.email_active == true) {
                req.flash('validation_error', [{msg : "Bu mail kullanımda"}]);
                let olds = {'full_name' : req.body.full_name, 'username' : req.body.username, 'email' : req.body.email,}
                req.flash('olds', olds);
                res.redirect('/register');
                console.log("email hatası çalıştı");
            }else if ((_user && _user.email_active == false) || _user == null) {
                
                // kullanıcı var ama mail aktif değil aynı zamanda tekrardan kayıt sağlanmaya çalışıyorsa aktif olmayan hesabı siler 
                if (_user) {
                    await user.destroy({where : {id : _user.id}});
                }
                
                const newUser = new user({
                    email : req.body.email,
                    username : req.body.username,
                    full_name : req.body.full_name,
                    email_active : false,
                    // yeni bir kullanıcı kaydederken şifresini hashliyoruz
                    password : await bcrypt.hash(req.body.password, 10),
                });
                //veri tabanına kaydolması için.
                await newUser.save();
                console.log("Kullanıcı kaydedildi");
                
                req.flash('success_message', [{msg : 'Kayıt başarılı, lütfen mail kutunuzu kontrol edin. '}])
                res.redirect('/login');
                
                //jwt
                const jwtInfo = {
                    id : newUser.id,
                    email : newUser.email
                }
                // jwt oluşturn
                // expiresIn:'1d'  = bu token 1 gün boyunca geçerli

                const secret = process.env.CONFIRM_EMAIL_JWT_SECRET + '-' + newUser.email_active
                console.log(secret);
                const jwtToken = jwt.sign(jwtInfo,secret, {expiresIn:'1d'})
                console.log(jwtToken);
                
                // SEND MAİL
                const url = process.env.WEB_SITE_URL+'verify'+ '/' + newUser.id + "/" + jwtToken;
                
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth : {
                        user : process.env.GMAIL_USER,
                        pass : process.env.GMAIL_PASS
                    }
                });
                
                
                await transporter.sendMail({
                    
                    from : 'Express-BlogProject <info@nodejstestmail85.com',
                    to : newUser.email,
                    subject : 'Emailinizi lütfen onaylayın',
                    text : 'Emailinizi onaylamak için lütfen bu linke tıklayınız.' + url,
                    
                }), (err, info) => {
                    if (err) {
                        console.log('kayıt hata çalıştı ' + err);   
                    }
                    console.log('Mail gönderildi');
                    transporter.close();
                }
                
                
            }
        } catch (err) {
            console.log("kayıt hata2 çalıştı"+ err);
        }
    }
    
}

const verify_email = async (req, res, next) => {
    
    // registerPost içinde mailde bulunun url de 1 adet request query parametresi belirttik burda onu çağırıyoruz.
    const idInToken = req.params.token;
    const  idInUrl= req.params.id;
    console.log(idInToken);
    if (idInToken && idInUrl) {
        const _findUser= await user.findOne({where : {id : idInUrl}})
        console.log( _findUser.email_active);
        const secret = process.env.CONFIRM_EMAIL_JWT_SECRET + '-' + _findUser.email_active;

        try {
            jwt.verify(idInToken,secret, async (err, decoded) => {
                console.log(secret);
                if (err) {
                    console.log(err);
                    req.flash('error', 'Link hatalı yada süresi geçmiş')
                    res.redirect('/login')
                } else {
                    const idInToken = decoded.id;
                    
                    const result = await user.update(
                        { email_active : true},
                        { where : {id : idInToken}}
                        
                        )
                        if (result) {
                            
                            req.flash('success_message',[{msg : 'Mail başarı ile onaylandı'}])
                            res.redirect('/login');
                        } else {
                            req.flash('error','Lütfen yeni bir hesap oluşturun')
                            res.redirect('/login');
                        }
                    }
                    
                    
                } )
            } catch (err) {
                
            }
            
        } else {
            console.log('Mail onayında token bulunmadı');
        }
    }
    
    
    const forget_password = async (req, res, next) => 	{
        
        res.render('forget_password',{
            layout: './layout/layout.ejs'
        });
    }
    const forget_passwordPost = async (req, res, next) => 	{
        const errors  = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('validation_error', errors.array());
            let olds = {'email' : req.body.email,}
            req.flash('olds', olds);
            
            res.redirect('/register') 
        }
        else {
            
            try {
                const _user = await user.findOne({
                    where : {email : req.body.email}
                });
                if (!_user || _user.email_active == false) {
                    req.flash('validation_error', [{msg : 'Bu mail adresi kayıtlı değil veya kullanıcı mail onayını gerçekleştirmemiş'}])
                    let olds = {'email' : req.body.email,}
                    req.flash('olds',olds);
                    res.redirect('/forget_password');
                }
                // Kullanıcının düzgün mail girdiği durumda =>
                else {
                    
                    const jwtInfo = {
                        id : _user.id,
                        email : _user.email
                    }
                    const secret = process.env.RESET_PASSWORD_JWT_SECRET+ '-' + _user.password;
                    
                    // jwt oluşturn
                    // expiresIn:'1d'  = bu token 1 gün boyunca geçerli
                    const jwtToken = jwt.sign(jwtInfo,secret, {expiresIn:'1d'})
                    
                    // SEND MAİL
                    const url = process.env.WEB_SITE_URL + "new_password/" + _user.id + "/" + jwtToken;
                    
                    let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth : {
                            user : process.env.GMAIL_USER,
                            pass : process.env.GMAIL_PASS
                        }
                    });
                    
                    
                    await transporter.sendMail({
                        
                        from : 'Express-BlogProject <info@nodejstestmail85.com',
                        to : _user.email,
                        subject : 'Şifre güncelleme ',
                        text : 'Şifrenizi güncellemek için lütfen bu linke tıklayınız.' + url,
                        
                    }, (err, info) => {
                        if (err) {
                            console.log('kayıt hata çalıştı ' + err);   
                        }
                        console.log('Mail gönderildi');
                        transporter.close();
                    });   
                    
                    
                    
                    req.flash('success_message', [{msg : 'Lütfen mail kutunuzu kontrol ediniz.'}]);
                    res.redirect('/login')
                }
                
                
                
            } catch (err) {
                
            }
            
        }
    }
    const new_password = async (req, res, next) => {
        
        const idInUrl = req.params.id;
        const tokenInUrl = req.params.token;
        
        if (idInUrl && tokenInUrl) {
            
            const _findUser= await user.findOne({where : {id : idInUrl}})
            
            const secret = process.env.RESET_PASSWORD_JWT_SECRET + '-' + _findUser.password;
            
            try {
                jwt.verify(tokenInUrl,secret, async (err, decoded) => {
                    
                    if (err) {
                        req.flash('error', 'Link hatalı yada süresi geçmiş')
                        res.redirect('/forget_password')
                    } else {
                        req.flash('olds',{id: idInUrl, token : tokenInUrl,})
                        console.log(res.locals.olds);
                        res.render('reset_password',{
                            // Kullanıcı şifreyi sıfırlama sayfasında bir hata yapınca yani validate devreye girince yeni sayfada
                            // id ve token değeri kaybolacağı için sayfanın içine gömüyoruz.
                            id : idInUrl,
                            token : tokenInUrl,
                            layout: './layout/layout.ejs'
                        });
                        
                        
                    }
                    console.log(req.params.id);
                    console.log(req.params.token);
                    
                } )
            } catch (err) {
                
            }
            
        } else {
            
            req.flash('validation_error', [{msg : 'Erişim sağlanmadı lütfen maildeki linke tıklayın.'}])
            
            res.redirect('forget_password')
            
        }
        
    }
    const new_passwordPost = async (req, res, next) => {
        const errors  = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('validation_error', errors.array());
            res.redirect('/new_password'+ "/"+req.body.id + "/" + req.body.token );
            
            
        }else{
            const result = await user.update(
                { password : await bcrypt.hash(req.body.password, 10)},
                { where : {id : req.body.id}}
                
                )
                if (result) {
                    req.flash('success_message',[{msg :'Şifre başarılı bir şekilde değiştirildi Giriş yapabilirsiniz.'}])
                    res.redirect('/login')
                } else {
                    req.flash('error',[{msg :'Lütfen şifre sıfırlama işlemlerini tekrarlayınız'}])
                    res.redirect('/forget_passoword')
                }
            }
        }
        
        
        module.exports = {
            login,
            loginPost,
            register,
            registerPost,
            forget_password,
            forget_passwordPost,
            logout,
            verify_email,
            new_password,
            new_passwordPost
        };