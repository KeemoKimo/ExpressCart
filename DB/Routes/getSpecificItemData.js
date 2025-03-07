const express = require('express');
const router = express.Router();
const pool = require('../pool');

router.get('/item', (req, res) => {
    const itemID = req.query.itemID;
    const userName = req.query.loggedInUser;
    console.log(itemID);
    console.log(userName);

    let userIdQuery = `SELECT id from users WHERE username = $1`;

    pool.query(userIdQuery, [userName], (error, userResult) => {
        if (error) {
            console.error('Error occurred while getting user:', error);
            res.status(500).json({ error: 'Database error while getting user' });
            return;
        }

        if (userResult.rowCount === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        } 

        const loggedInID = userResult.rows[0].id;
        console.log('Logged in user:', loggedInID);

        let query = `SELECT items.id AS item_id, 
            itemimages.id AS image_id, 
            items.ownerid AS owner_id,
            items.*, 
            itemimages.*,
            users.username AS ownerUsername,
            users.emailaddress AS ownerEmail,
            users.datejoined AS ownerDateJoined,
            users.profileimg AS ownerimg
            FROM items 
            JOIN itemimages ON items.id = itemimages.itemid
            JOIN users ON items.ownerid = users.id
            WHERE items.id = $1`;

        pool.query(query, [itemID], (error, result) => {
            if (error) {
                console.error('Error occurred:', error);
                res.status(500).json({ error: 'Database error' });
            } else {
                if (result.rowCount === 0) {
                    res.status(404).json({ error: 'Item not found' });
                } else {
                    const data = result.rows[0];

                    data.loggedInUser = loggedInID;

                    delete data.itemid;
                    delete data.ownerid;
                    delete data.id;

                    console.log(data);
                    res.json(data);
                }
            }
        });

    });
});

module.exports = router;