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
app.use(express.static(path.join(__dirname, '..', '..', 'ExpressCart', 'HTML')));
app.use(express.static(path.join(__dirname, '..', '..', 'ExpressCart', 'CSS')));
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

// Use routes
app.use('/api', signUpRoute);
app.use('/api', signInRoute);
app.use('/api', getuserDataRoute);
app.use('/api', uploadImage);
app.use('/api', sellItem);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});