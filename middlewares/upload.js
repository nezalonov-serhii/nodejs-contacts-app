const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "..", "tmp");
// const dirPath = path.join(__dirname, '..', 'public', 'avatars');

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, tempDir);
   },
   filename: (req, file, cb) => {
      cb(null, file.originalname);
   },
});

const upload = multer({ storage });

module.exports = upload;
