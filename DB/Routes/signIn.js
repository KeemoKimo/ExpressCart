const express = require('express');
const router = express.Router();
const pool = require('../pool');

router.post('/signIn', (req, res) => {
    const query = `SELECT * FROM users WHERE username = '${req.body.fUsername}'
     AND password = '${req.body.fPassword}'`;

    pool.query(query, (error, result) => {
        if (error) {
            console.error('Error occured : ', error);
            res.status(500).send('An error occured while Logging into the website');
        } else {
            if(result.rowCount == 0){
                console.error('Error occured : ', error);
                res.status(500).send('We did not find that specified user in our system.');
            }else{
                console.log("Good");
                res.redirect(`/mainPage?userName=${req.body.fUsername}`);
            }
        }
    });
});

module.exports = router;