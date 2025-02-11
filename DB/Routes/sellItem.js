const express = require('express');
const router = express.Router();
const pool = require('../pool');


router.post('/sellItem', (req, res) => {
    var defaultImageURL = 'https://res.cloudinary.com/dkgfcemw4/image/upload/v1739280006/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector_urz4tl.jpg';

    const query = `INSERT INTO items (name, category, price, condition, location, ownerId, description) VALUES ('${req.body.txtName}', '${req.body.categories}' , '${req.body.txtPrice}', '${req.body.conditions}', '${req.body.txtLocation}', '${req.body.lblUserId}', '${req.body.txtDescription}')`;
    
    pool.query(query, (error, result) => {
        if (error) {
            console.error('Error occured : ', error);
            res.status(500).send('An error occured while selling your item');
        } else {
            const getItemID = `SELECT id FROM items WHERE name = $1 AND ownerid = $2 AND price = $3`;
            pool.query(getItemID, [req.body.txtName, req.body.lblUserId, req.body.txtPrice] , (error, getItemResult) => {
                if (error) {
                    console.error('Error occured : ', error);
                    res.status(500).send('An error occured while selling your item');
                } else {       
                    if(getItemResult.rowCount > 0){
                        const itemID = getItemResult.rows[0].id;
                        const defaultImageQuery = `INSERT INTO itemimages (url, itemid) VALUES ('${defaultImageURL}', '${itemID}')`;
                        pool.query(defaultImageQuery, (error, imageResult) => {
                            if (error) {
                                console.error('Error occured : ', error);
                                res.status(500).send('An error occured while selling your item');
                            } else { 
                                console.log("Item sell posted successfully");
                                res.redirect(`/mainPage?userName=${req.body.lblUserName}`);
                            }
                        });
                    }
                }
            });
        }
    });
});

module.exports = router;