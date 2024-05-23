const multer = require('multer');
const crypto = require('crypto');
const path = require('path');




const storage = multer.diskStorage({
    destination: path.resolve('uploads/imagens/user'),
    filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, buf) => {
            if (err) return cb(err);

            const fileExtension = path.extname(file.originalname);
            const newFileName = buf.toString('hex') + fileExtension;
            cb(null, newFileName);
        });
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 80 * 10240 * 10240 }, // 8 megabytes
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Apenas imagens JPEG ou PNG são permitidas.'));
        }
    },
});




module.exports = upload;