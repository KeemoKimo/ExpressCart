const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join('')));

app.get('/', (req, res) => {
    const filePath = path.resolve(__dirname, '..', '..', 'ExpressCart', 'HTML', 'loginPage.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(err.status || 500).send('Error loading the page');
        }
    });
});

// Import routes
const signUpRoute = require('../DB/Routes/signUp');

// Use routes
app.use('/api', signUpRoute);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});