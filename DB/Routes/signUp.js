const express = require('express');
const router = express.Router();
const pool = require('../pool');

router.post('/signup', (req, res) => {
    const searchQuery = `SELECT * FROM users WHERE username = '${req.body.fUsername_Register}'
    OR emailaddress = '${req.body.fEmail_Register}'`;

    const query = `INSERT INTO users (username, emailaddress, password) 
    VALUES ('${req.body.fUsername_Register}' , '${req.body.fEmail}' , '${req.body.fPassword_Register}')`;

    pool.query(searchQuery, (error, result) => {
        if (result.rowCount > 0) {
            return res.status(500).json({ success: false, message: 'User Already Exists!!' });
        } else {
            pool.query(query, (error, result) => {
                if (error) {
                    console.error('Error occured : ', error);
                    res.status(500).send('An error occured while adding user to the database');
                } else {
                    console.log("Account Registered succesfully!");
                    res.redirect('/');
                }
            });
        }
    });
});

module.exports = router;