const express = require('express');
const router = express.Router();
const pool = require('../pool');

router.post('/sellItem', async (req, res) => {
    try {
        const defaultImageURL = 'https://res-console.cloudinary.com/dkgfcemw4/thumbnails/v1/image/upload/v1743509390/Tm8tSW1hZ2UtUGxhY2Vob2xkZXIuc3ZnX3ZxMnVpbg==/drilldown';

        const insertItemQuery = `
            INSERT INTO items (name, category, price, condition, location, ownerId, description) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) 
            RETURNING id`;  // Get inserted item ID directly
       
        const itemResult = await pool.query(insertItemQuery, [
            req.body.txtName,
            req.body.categories,
            req.body.txtPrice,
            req.body.conditions,
            req.body.txtLocation,
            req.body.lblUserId,
            req.body.txtDescription
        ]);

        if (itemResult.rowCount > 0) {
            const itemID = itemResult.rows[0].id;

            const insertImageQuery = `INSERT INTO itemimages (url, itemid) VALUES ($1, $2)`;
            await pool.query(insertImageQuery, [defaultImageURL, itemID]);

            console.log("Item sell posted successfully");
            res.redirect(`/mainPage?userName=${req.body.lblUserName}`);
        } else {
            res.status(500).send("Failed to insert item.");
        }

    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send('An error occurred while selling your item.');
    }
});

module.exports = router;
