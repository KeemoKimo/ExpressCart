const express = require('express');
const router = express.Router();
const pool = require('../pool');

router.get('/getUserItemsData', async (req, res) => {

    let userName = req.query.userName;

    if (!userName) {
        return res.status(400).json({ message: "Missing userName parameter" });
    }

    try {

        let userIdQuery = `SELECT * FROM users WHERE username = $1`;
        let userIdResult = await pool.query(userIdQuery, [userName]);

        if (userIdResult.rowCount === 0) {
            return res.status(404).json({ message: "No user ID foud" });
        }

        let userId = userIdResult.rows[0].id;

        let totalValueQuery = `SELECT SUM(price::numeric) AS total_value from items WHERE ownerid = $1`;

        let totalItemsQuery = `SELECT COUNT(*) AS total_item_count from items WHERE ownerid = $1`;

        let itemsQuery = `SELECT * FROM items  
                        LEFT JOIN itemimages on items.id = itemimages.itemid`;

        itemsQuery += ` WHERE items.ownerid = $1`;


        const [totalValueResult, totalItemsResult, itemsResult] = await Promise.all([
            pool.query(totalValueQuery, [userId]),
            pool.query(totalItemsQuery, [userId]),
            pool.query(itemsQuery, [userId])
        ]);

        let responseData = {
            userId: userId,
            totalValue: totalValueResult.rows[0]?.total_value || 0,
            totalItems: totalItemsResult.rows[0]?.total_item_count || 0,
            items: itemsResult.rows
        };

        res.json(responseData);

    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ error: "Database error", details: error.message });
    }
});

module.exports = router;