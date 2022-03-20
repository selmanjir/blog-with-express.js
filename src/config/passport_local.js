const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


module.exports = function (passport) {
    
    passport.use(new LocalStrategy( async (username, password, done) =>  {
        
        try {
            const _findUser = await User.findOne({where : {
                username : username
            }});
            
            if (!_findUser) {
                return done(null, false, {message : 'Kullanıcı bulunamadı'});
            }
            
            if (_findUser.password !== password) {
                return done(null, false, {message : 'Hatalı şifre'});
            }
            else {
                return done(null, _findUser);
            }
            
        } catch (err) {
            return done(err);
        }
        
    }));
    
    passport.serializeUser((user, done) => {
        //cookie de id sakla
        console.log('sessiona kaydedildi'+ ' ' + user.id);
        done(null, user.id);
    })
    passport.deserializeUser((id, done)=> {
        // cookie den okunan id değerinin kullanıcı tablosunda tekrar okunması ve kullanıcının geriye döndürülmesi
        User.findByPk(id, (err,user) => {
            done(err, user);
        });
    });
    

    
}