const express = require('express');
const router = express.Router();
const pool = require('../pool');

router.post('/updateItem', async (req, res) => {
    try{
        const itemID = req.query.itemId;
        const userName = req.query.userName;

        const updateQuery = `UPDATE items SET name = $1,
            category = $2,
            price = $3,
            condition = $4,
            location = $5,
            description = $6 WHERE items.id = ${itemID}`;
        
        const updateQueryResult = await pool.query(updateQuery, [
            req.body.txtName,
            req.body.categories,
            req.body.txtPrice,
            req.body.conditions,
            req.body.txtLocation,
            req.body.txtDescription
        ]);
    
        if (updateQueryResult.rowCount > 0) {
            console.log(`Item ${itemID} edited successfully`);
            res.redirect(`/mainPage?userName=${userName}`);
        } else {
            res.status(500).send("Failed to insert item.");
        }
    }catch(error){
        console.error('Error occurred:', error);
        res.status(500).send('An error occurred while editing your item.');
    }
});

module.exports = router;