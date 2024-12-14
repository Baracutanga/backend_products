const multer = require('multer');
const path = require('path');
const fs = require('fs');

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const pastaUpload = path.resolve(__dirname, "upload");
    cb(null, pastaUpload);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.originalname}`;
    cb(null, fileName);
  },
});

const fileFilter = (req,file, cb) => {
    const allowMimes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('tipo de arquivo inválido.'))
    }
};

module.exports = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }
});