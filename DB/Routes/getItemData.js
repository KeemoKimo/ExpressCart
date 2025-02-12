const express = require('express');
const router = express.Router();
const pool = require('../pool');

router.get('/getItemData', async (req, res) => {
    try {

        let userName = req.query.userName;

        let query = `
            SELECT items.id, items.name, items.location, items.price, items.condition, items.dateposted, 
                itemimages.url AS image_url
            FROM items
            LEFT JOIN itemimages ON items.id = itemimages.itemid
        `;

        let params = [];

        if (userName) {
            query += ` INNER JOIN users ON items.ownerid = users.id WHERE users.username = $1`;
            params.push(userName);
        }

        query += ` ORDER BY items.dateposted DESC`;

        let result = await pool.query(query, params);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "No items found" });
        }

        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ error: "Database error", details: error.message });
    }      
});

module.exports = router;