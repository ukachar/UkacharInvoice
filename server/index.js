const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());
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



app.get('/settings', async (req, res) => {
    try {
        const filePath = './settings.json';
        const data = await fs.readFile(filePath, 'utf-8');
        console.log(`Settings read from ${filePath}:`, data);
        res.json(JSON.parse(data));
    } catch (error) {
        console.error('Error reading settings:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});


// Endpoint to write to settings.json
app.post('/settings', async (req, res) => {
    try {
        const newData = req.body;

        // Construct the absolute path to the JSON file
        const settingsFilePath = path.join(process.cwd(), 'settings.json');

        // Read existing settings from the JSON file
        const settingsFile = await fs.readFile(settingsFilePath, 'utf-8');
        let settings = JSON.parse(settingsFile);

        // Update or rewrite the contents
        settings = { ...settings, ...newData };

        // Write the updated settings back to the JSON file
        await fs.writeFile(settingsFilePath, JSON.stringify(settings, null, 2));

        console.log('Settings updated:', settings);
        res.json({ success: true, message: 'Settings updated successfully.' });
    } catch (error) {
        console.error('Error updating settings:', error);
        res.status(500).json({ success: false, message: 'Error updating settings.', error: error.message });
    }
});




// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
