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

        let relatedPostQuery = `
            SELECT 
            items.id, items.name, items.category, items.price, items.condition, 
            items.location, items.dateposted, 
            COALESCE(STRING_AGG(itemimages.url, ','), '') AS image_urls
            FROM items 
            LEFT JOIN itemimages ON items.id = itemimages.itemid 
            WHERE items.category = $1 AND items.id != $2
            GROUP BY items.id, items.name, items.category, items.price, items.condition, 
                    items.location, items.dateposted;
        `;

        pool.query(relatedPostQuery, [category, itemID], (error, finalResult) => {
            if (error) {
                console.error('Error occurred:', error);
                res.status(500).json({ error: 'Database error' });
            } else {
                res.json(finalResult.rows);
            }
        });
    });
});

module.exports = router;