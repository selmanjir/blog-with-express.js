const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');


module.exports =  (passport) =>  {
    const options = {
        usernameField: 'email',
        passwordField: 'password'
    }
    
    passport.use(new LocalStrategy(options, async (email, password, done) =>  {
        
        try {
            const _findUser = await User.findOne({where : {
                email : email
            }});
            
            if (!_findUser) {
                return done(null, false, {message : 'Kullanıcı bulunamadı'});
            }
            const checkPassword = await bcrypt.compare(password, _findUser.password);

            if (!checkPassword) {
                return done(null, false, {message : 'Hatalı şifre'});
            }
            else {
                if (_findUser && _findUser.email_active == false) {
                    return done(null, false, {message : 'Lütfen mailinizi onaylayın.'});
                }else {
                    
                return done(null, _findUser);
                }
            }
            
            
            
            
        } catch (err) {
            return done(err);
        }
        
    }));
    
    passport.serializeUser((user, done) => {
        //cookie de id sakla
        console.log('sessiona kaydedildi'+ ' ' + user.email);
        done(null, user.id);
    })
    passport.deserializeUser(async(id, done)=> {
        // cookie den okunan id değerinin kullanıcı tablosunda tekrar okunması ve kullanıcının geriye döndürülmesi
        const user = await User.findOne({
            where:{
                id: id
            }
        }
        );
        done(null, user);
    });
    

    
}