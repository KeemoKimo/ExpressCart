const express = require('express');
const router = express.Router();
const pool = require('../pool');

router.get('/getUserData', (req, res) => {
    const userName = req.query.userName;
    
    const query = `SELECT * FROM users WHERE username = $1`;

    pool.query(query, [userName], (error, result) => {
        if (error) {
            console.error('Error occurred:', error);
            res.status(500).json({ error: 'Database error' });
        } else {
            if (result.rowCount === 0) {
                res.status(404).json({ error: 'User not found' });
            } else {
                res.json(result.rows[0]);
            }
        }
    });
});

module.exports = router;