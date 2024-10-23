const express = require('express');
const app = express();
const path = require('path');

// Serve static files (HTML, CSS, JS) from the frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Define a basic route (just to test)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
