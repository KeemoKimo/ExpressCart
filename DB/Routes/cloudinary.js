require("dotenv").config({
    path: './ExpressCart/.env'
});
const cloudinary = require('cloudinary').v2;
const express = require('express');
const router = express.Router();
const multer = require('multer');
const pool = require('../pool');

cloudinary.config({
    cloud_name: 'dkgfcemw4',
    secure: true,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/uploadImage', upload.single('image'), (req, res) => {

    const userName = req.query.userName?.split("=")[1] || req.query.userName;

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error uploading to Cloudinary' });
        }

        const insertPfpImageQuery = `UPDATE users SET profileimg = $1 WHERE username = $2`;
        const values = [result.secure_url, userName];
        console.log("Updating profile to link : " + result.secure_url + ", For : " + userName);

        pool.query(insertPfpImageQuery, values, (error, result) => {
            if (error) {
                console.error('Error occured : ', error);
                res.status(500).send('An error occured while updating profile picture');
            } else {
                console.log(`Profile picture updated for ${userName}`);
                res.redirect(req.get("Referrer") || "/");
            }
        });

        //console.log(res.json({ public_id: result.public_id, url: result.secure_url }));
    }).end(req.file.buffer);
});

module.exports = router;