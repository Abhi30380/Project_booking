// controllers/uploadController.js
const download = require('image-downloader');
const fs = require('fs');
const multer = require('multer');
const uploadmulter = multer({ dest: 'uploads/' });

const uploadByLink = async (req, res) => {
  const { link } = req.body;
  const newName = 'photo' + Date.now() + '.jpg';
  await download.image({
    url: link,
    dest: __dirname + '/../uploads/' + newName,
  });
  res.json(newName);
};

const upload = (req, res) => {
  const uploadedFiles = [];
  for (const fileInfo of req.files) {
    const { path, originalname } = fileInfo;
    const part = originalname.split('.');
    const ext = part[part.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace('uploads\\', ''));
  }
  res.json(uploadedFiles);
};

module.exports = { uploadByLink, upload, uploadmulter };
