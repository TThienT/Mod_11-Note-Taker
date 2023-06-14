const express = require('express');
const path = require('path');

const router = express.Router();

// Serve the index.html file for the root URL "/"
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// Serve the notes.html file for the "/notes" URL
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

// Redirect all other URLs to the root page
router.get('*', (req, res) => {
  res.redirect('/');
});

module.exports = router;
