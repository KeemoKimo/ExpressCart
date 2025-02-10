const express = require('express');
const router = express.Router();
const pool = require('../pool');

router.get('/getItemData', async (req, res) => {
    try {
        const query = `SELECT name, location, dateposted, price, condition FROM items ORDER BY dateposted DESC`;
        const result = await pool.query(query);

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