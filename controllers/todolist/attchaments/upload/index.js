const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

const storage = multer.diskStorage({
    destination: path.resolve('uploads/todolist/attchaments'),
    filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, buf) => {
            if (err) return cb(err);

            const fileExtension = path.extname(file.originalname);
            const newFileName = buf.toString('hex') + fileExtension;
            cb(null, newFileName);
        });
    },
});

const uploadAttchamentsFile = multer({
    storage: storage,
    limits: { fileSize: 8 * 1024 * 1024 }, // 8 megabytes
    fileFilter: (req, file, cb) => {
        const allowedFileExtensions = ['.doc', '.pdf', '.jpeg', '.jpg', '.png', '.xlsx'];
        const fileExtension = path.extname(file.originalname).toLowerCase();

        if (allowedFileExtensions.includes(fileExtension)) {
            cb(null, true);
        } else {
            cb(new Error('Only DOC, PDF, JPEG, PNG, JPG and Excel'));
        }
    },
});

const uploadAttchaments = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No File' });
    }
    const fileName = req.file.filename;
    res.json({ fileName });

}

module.exports = { uploadAttchamentsFile, uploadAttchaments }