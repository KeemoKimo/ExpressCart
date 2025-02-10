require("dotenv").config({
    path: './ExpressCart/.env'
});
const cloudinary = require('cloudinary').v2;
const express = require('express');
const router = express.Router();
const multer = require('multer');

cloudinary.config({
    cloud_name: 'dkgfcemw4',
    secure : true,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/uploadImage', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error uploading to Cloudinary' });
        }

        // res.json({ public_id: result.public_id, url: result.secure_url });
    }).end(req.file.buffer);
});

module.exports = router;