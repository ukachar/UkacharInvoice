const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
var easyinvoice = require('easyinvoice');

// Parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handling GET requests
app.get('/', (req, res) => {
    res.send('Hello, this is a GET request!');
});

// Handling POST requests
app.post('/', (req, res) => {
    const { data } = req.body; // Assuming the incoming POST data has a 'data' field
    res.send(`Received POST request with data: ${data}`);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
