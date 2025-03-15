const express = require('express');
const router = express.Router();
const pool = require('../pool');

router.delete('/deletePost', async (req, res) => {
    try {
        const itemID = req.body.itemId;
        if (!itemID) {
            return res.status(400).json({ error: 'Missing itemID parameter' });
        }

        let deleteImageQuery = `DELETE FROM itemimages WHERE itemid = $1`;

        await pool.query(deleteImageQuery, [itemID]);

        let deleteQuery = `DELETE FROM items WHERE id = $1`;

        await pool.query(deleteQuery, [itemID]);

        res.json({ success: true, message: 'Post deleted successfully' });

    }
    catch(error){
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Database error while deleting post' });
    }
});

module.exports = router;