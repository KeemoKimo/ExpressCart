const express = require('express');
const router = express.Router();
const pool = require('../pool');

router.get('/getItemData', async (req, res) => {
    try {

        let userName = req.query.userName;
        let category = req.query.category;

        let query = `
                SELECT items.id, 
                items.name, 
                items.location, 
                items.price, 
                items.condition, 
                items.dateposted, 
                STRING_AGG(itemimages.url, ',' ORDER BY itemimages.id) AS image_urls
                FROM items
                LEFT JOIN itemimages ON items.id = itemimages.itemid
        `;

        if(category){
            category = decodeURIComponent(category);
        }

        let params = [];
        let conditions = [];

        if (userName) {
            let userIdQuery = `SELECT * FROM users WHERE username = $1`;
            let userIdResult = await pool.query(userIdQuery, [userName]);

            if (userIdResult.rowCount === 0) {
                return res.status(404).json({ message: "No user ID found" });
            }

            let userId = userIdResult.rows[0].id;

            conditions.push(`items.ownerid = $${params.length + 1}`);
            params.push(userId);
        }

        if(category && category !== "All Categories"){
            conditions.push(`items.category = $${params.length + 1}`);
            params.push(category);
        }

        if (conditions.length > 0) {
            query += ` WHERE ` + conditions.join(' AND ');
        }

        query += ` GROUP BY items.id, items.name, items.location, items.price, items.condition, items.dateposted
                    ORDER BY items.dateposted DESC`;

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