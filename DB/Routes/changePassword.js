const express = require('express');
const router = express.Router();
const pool = require('../pool');

router.post('/changePassword', async (req, res) => {
    try{
        let userName = req.query.userName;
        let checkPasswordQuery = `UPDATE users SET password = '${req.body.fNewPassword}' WHERE username = '${userName}'`;

        pool.query(checkPasswordQuery, (error, result) => {
            if (error) {
                console.error('Error occured : ', error);
                res.status(500).send('An error occured while changing your password');
            } else {
                console.log(`Password changed for ${userName}`);
                res.redirect('/');
            }
        });
    }
    catch(error){
        console.error("Error fetching items:", error);
        res.status(500).json({ error: "Database error", details: error.message });
    }
});

module.exports = router;
