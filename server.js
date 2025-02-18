const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// In-memory storage for shortened URLs
const urlMap = {};

// Function to generate a short ID
function generateShortId() {
  return Math.random().toString(36).substring(2, 8);
}

// Route to shorten a URL
app.post('/shorten', (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  const shortId = generateShortId();
  const shortUrl = `https://url-shortener-j7kg.onrender.com/${shortId}`; // Replace with your Render app URL

  urlMap[shortId] = url;

  res.json({ shortUrl });
});

// Route to redirect to the original URL
app.get('/:shortId', (req, res) => {
  const { shortId } = req.params;
  const originalUrl = urlMap[shortId];

  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).send('URL not found');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});