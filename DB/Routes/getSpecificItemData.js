const express = require('express');
const router = express.Router();
const pool = require('../pool');

router.get('/item', (req, res) => {
    const itemID = req.query.itemID; 
    console.log(itemID);   

    let query = `SELECT * FROM items join itemimages ON items.id = itemimages.itemid WHERE items.id = $1`;

    console.log("NOT it here");
    pool.query(query, [itemID], (error, result) => {
        if(error){
            console.error('Error occurred:', error);
            res.status(500).json({ error: 'Database error' });
        }else{
            if (result.rowCount === 0) {
                res.status(404).json({ error: 'Item not found' });
            } else {
                console.log("MAde to fetch data!");
                res.json(result.rows[0]);
            }
        }
    });
});

module.exports = router;