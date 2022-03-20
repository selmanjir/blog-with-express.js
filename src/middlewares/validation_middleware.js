
const {body} = require('express-validator');

const registerValidate = () => {
    return [
        body('email').trim().isEmail().withMessage('Geçerli bir mail adresi giriniz.'),

        body('password').trim().isLength({min : 6}).withMessage('Şifre en az 6 karakterden oluşmalıdır'),
        body('password').trim().isLength({max : 20}).withMessage('Şifre en fazla 20 karakterden oluşmalıdır'),

        body('username').trim().isLength({min : 6}).withMessage('Kullanıcı adı en az 6 karakterden oluşmalıdır'),
        body('username').trim().isLength({max : 14}).withMessage('Kullanıcı en fazla 14 karakterden oluşmalıdır'),

        body('full_name').trim().isLength({min : 6}).withMessage('Adınız ve soyadınız en az 6 karakterden oluşmalıdır'),
        body('full_name').trim().isLength({max : 30}).withMessage('Adınız ve soyadınız en fazla 30 karakterden oluşmalıdır'),

        body('repassword').trim().custom((value, {req}) => {
            if(value !== req.body.password) {
                throw new Error('Şifreler aynı değil')
            }
            return true;
        })
    ];
}
const loginValidate = () => {
    return [
        
        body('username').trim().isLength({min : 6}).withMessage('Kullanıcı adı en az 6 karakterden oluşmalıdır'),
        body('username').trim().isLength({max : 14}).withMessage('Kullanıcı en fazla 14 karakterden oluşmalıdır'),

        body('password').trim().isLength({min : 6}).withMessage('Şifre en az 6 karakterden oluşmalıdır'),
        body('password').trim().isLength({max : 20}).withMessage('Şifre en fazla 20 karakterden oluşmalıdır'),

    ];
}

module.exports = {
    registerValidate,
    loginValidate
}