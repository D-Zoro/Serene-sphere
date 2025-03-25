import multer from 'multer';
//cooking the profile picture to uploads folder 
//then we store the path of the picture in the mongodb 


const storage = multer.diskStorage({
    destination: function ( req, file ,cb) {
        cb(null, 'uploads/')//directory where profile pics are gonna be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname )//specify the file name date.now() to avoid duplicate name
    }
});

const upload = multer({ storage: storage });

export default upload;