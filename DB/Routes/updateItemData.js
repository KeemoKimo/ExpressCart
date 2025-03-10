const express = require('express');
const router = express.Router();
const pool = require('../pool');

router.post('/updateItem', (req, res) => {
    const itemID = req.query.itemId;
    const userName = req.query.loggedInUser;
    const updateQuery = `UPDATE items SET `;
});

module.exports = router;