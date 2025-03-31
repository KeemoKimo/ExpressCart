const express = require('express');
const router = express.Router();
const pool = require('../pool');

router.post('/markAsSold', async (req, res) => {
    try {
        const itemID = req.body.itemId; 
        const userName = req.body.userName;

        if (!itemID) {
            return res.status(400).json({ message: "Missing itemId parameter" });
        }

        const updateQuery = `UPDATE items SET is_sold = TRUE WHERE id = $1`;
        const updateQueryResult = await pool.query(updateQuery, [itemID]);

        if (updateQueryResult.rowCount > 0) {
            console.log(`Item ${itemID} marked as sold successfully`);
            res.json({ success: true, message: "Item marked as sold!" });
        } else {
            res.status(500).json({ success: false, message: "Failed to mark item as sold." });
        }
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ success: false, message: "An error occurred while updating the item." });
    }
});

module.exports = router;