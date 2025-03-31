require("dotenv").config({
    path: './ExpressCart/.env'
});
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../')));
app.use('/JS', express.static(path.join(__dirname, '../JS')));
app.use(express.static(path.join(__dirname, '..', '..', 'ExpressCart', 'HTML')));
app.use(express.static(path.join(__dirname, '..', '..', 'ExpressCart', 'CSS')));
app.use(express.static(path.join(__dirname, '..', '..', 'ExpressCart', 'JS')));
app.use(express.json());


app.use(express.static(path.join('')));

app.get('/', (req, res) => {
    const filePath = path.resolve(__dirname, '..', '..', 'ExpressCart', 'HTML', 'loginPage.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(err.status || 500).send('Error loading the page');
        }
    });
});``
 
app.get('/mainPage', (req, res) => {
    const filePath = path.resolve(__dirname, '..', '..', 'ExpressCart', 'HTML', 'mainPage.html');
    const userName = req.query.userName;
    res.sendFile(filePath, (err) => {
        if (err) { 
            console.error('Error sending file:', err);
            res.status(err.status || 500).send('Error loading the page');
        }
    });
});

// Import routes
const signUpRoute = require('../DB/Routes/signUp');
const signInRoute = require('../DB/Routes/signIn');
const getuserDataRoute = require('../DB//Routes/getuserData');
const uploadImage = require('../DB/Routes/cloudinary');
const sellItem = require('../DB/Routes/sellItem');
const getItemData = require('../DB/Routes/getItemData');
const userItemsData = require('../DB/Routes/userItemsData');
const changePassword = require('../DB/Routes/changePassword');
const getSpecificItemData = require('../DB/Routes/getSpecificItemData');
const updateItemInfo = require('../DB/Routes/updateItemData');
const relatedPost = require('../DB/Routes/relatedPost');
const deletePost = require('../DB/Routes/deletePost');
const markAsSold = require('../DB/Routes/markAsSold');

// Use routes
app.use('/api', signUpRoute);
app.use('/api', signInRoute);
app.use('/api', getuserDataRoute);
app.use('/api', uploadImage);
app.use('/api', sellItem);
app.use('/api', getItemData);
app.use('/api', userItemsData);
app.use('/api', changePassword);
app.use('/api', getSpecificItemData);
app.use('/api', updateItemInfo);
app.use('/api', relatedPost);
app.use('/api', deletePost);
app.use('/api', markAsSold);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});