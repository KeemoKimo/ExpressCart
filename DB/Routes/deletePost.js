const express = require('express');
const router = express.Router();
const pool = require('../pool');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const defaultImageUrl = 'https://res.cloudinary.com/dkgfcemw4/image/upload/v1742222613/49b22b6c-2664-4271-bda2-576e84661667.png';


router.delete('/deletePost', async (req, res) => {
    try {
        const itemID = req.body.itemId;
        if (!itemID) {
            return res.status(400).json({ error: 'Missing itemID parameter' });
        }

        const imageQuery = `SELECT url FROM itemimages WHERE itemid = $1`;
        const { rows } = await pool.query(imageQuery, [itemID]);

        for (let row of rows) {
            const imageUrl = row.url;

            if (imageUrl === defaultImageUrl) {
                console.log('Skipping default image, no deletion performed');
                continue;
            }

            const publicId = extractPublicId(imageUrl);

            if (publicId) {
                await cloudinary.uploader.destroy(publicId);
            }
        }


        let deleteImageQuery = `DELETE FROM itemimages WHERE itemid = $1`;

        await pool.query(deleteImageQuery, [itemID]);

        let deleteQuery = `DELETE FROM items WHERE id = $1`;

        await pool.query(deleteQuery, [itemID]);

        res.json({ success: true, message: 'Post deleted successfully' });

    }
    catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Database error while deleting post' });
    }
});

function extractPublicId(url) {
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    return filename.split('.')[0];
}

module.exports = router;