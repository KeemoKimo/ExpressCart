const express = require('express');
const router = express.Router();
const pool = require('../pool');

router.get('/getRelatedPostData', async (req, res) => {
    const itemID = req.query.itemID;
    var category;

    let itemCategoryQuery = `SELECT category FROM items WHERE id = $1`;

    pool.query(itemCategoryQuery, [itemID], (error, categoryResult) => {
        if (error) {
            console.error('Error occurred while retrieving category:', error);
            res.status(500).json({ error: 'Database error while retrieving category' });
            return;
        }
        category = categoryResult.rows[0].category;
 
        let relatedPostQuery = `SELECT * FROM items WHERE category = $1 AND id !=$2`;
        pool.query(relatedPostQuery, [category, itemID], (error, finalResult) => {
            if (error) {
                console.error('Error occurred:', error);
                res.status(500).json({ error: 'Database error' });
            } else{
                res.json(finalResult.rows);
            }
        });
    });
});

module.exports = router;