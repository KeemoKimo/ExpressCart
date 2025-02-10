const express = require('express');
const router = express.Router();
const pool = require('../pool');


router.post('/sellItem', (req, res) => {
    const query = `INSERT INTO items (name, category, price, condition, location, ownerId, description) VALUES ('${req.body.txtName}', '${req.body.categories}' , '${req.body.txtPrice}', '${req.body.conditions}', '${req.body.txtLocation}', '${req.body.lblUserId}', '${req.body.txtDescription}')`;
    
    pool.query(query, (error, result) => {
        if (error) {
            console.error('Error occured : ', error);
            res.status(500).send('An error occured while selling your item');
        } else {
                console.log("Item sell posted successfully");
                //res.redirect(`/mainPage?userName=${req.body.fUsername}`);
        }
    });
});

module.exports = router;