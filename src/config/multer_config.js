const multer = require('multer');
const path = require('path');

// Multerın dosyaları aktaracağı yer.
const myStorage = multer.diskStorage( {
    
    destination: (req, file, callback) => {
        // Yüklenecek dosyaların yolu
        callback(null, path.join(__dirname, "../uploads/avatars"));
    },
    
    filename : (req, file, callback) => {
        console.log(req.user.email);
        // Dosya adı
        callback(null, req.user.email+""+path.extname(file.originalname) )
    }
    
    
});

const imageFileFilter = (req, file , callback) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' ) {
        callback(null, true);
    }else {
        callback(null, false); 
    }
}

const imageUpload = multer({storage : myStorage, fileFilter: imageFileFilter });

module.exports = {
    imageUpload
}