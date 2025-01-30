const express = require('express');
const router = express.Router();
const pool = require('../pool');

router.post('/signup', (req, res) => {
    const query = `INSERT INTO users (username, emailaddress, password) 
    VALUES ('${req.body.fUsername_Register}' , '${req.body.fEmail}' , '${req.body.fPassword_Register}')`;

    pool.query(query, (error, result) => {
        if(error){
            console.error('Error occured : ', error);
            res.status(500).send('An error occured while adding user to the database');
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;