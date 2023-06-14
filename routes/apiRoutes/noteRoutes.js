// Import the required modules
const fs = require('fs');
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Set the path to the JSON database file
const dbFilePath = './db/db.json';

// GET /api/notes - Retrieve all saved notes as JSON
router.get('/notes', (req, res) => {
  // Read the JSON file
  fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) {
      console.log("Unable to read notes.");
      res.status(500).json({ error: "Unable to read notes." });
      return;
    }

    // Parse the JSON data into an array of notes
    const notes = JSON.parse(data);
    
    // Send the notes as a JSON response
    res.json(notes);
  });
});

// POST /api/notes - Save a new note and return it
router.post('/notes', (req, res) => {
  // Extract the title and text from the request body
  const { title, text } = req.body;

  // Check if both title and text are provided
  if (!title || !text) {
    console.log("Note not properly filled out");
    res.status(400).json({ error: "Title and text are required fields." });
    return;
  }

  // Create a new note object with a unique ID
  const newNote = {
    id: uuidv4(),
    title,
    text
  };

  // Read the JSON file
  fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) {
      console.log("Unable to access notes.");
      res.status(500).json({ error: "Unable to access notes." });
      return;
    }

    // Parse the JSON data into an array of notes or initialize an empty array
    let notes = JSON.parse(data) || [];

    // Add the new note to the array
    notes.push(newNote);

    // Write the updated array of notes back to the JSON file
    fs.writeFile(dbFilePath, JSON.stringify(notes), (err) => {
      if (err) {
        console.log("Unable to store note.");
        res.status(500).json({ error: "Unable to store note." });
        return;
      }

      // Send the new note as a JSON response
      const response = {
        status: 'success',
        body: newNote
      };

      console.log(response);
      res.json(response);
    });
  });
});

// DELETE /api/notes/:id - Delete a note with the given ID
router.delete('/notes/:id', (req, res) => {
  // Read the JSON file
  fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) {
      console.log("Unable to access notes.");
      res.status(500).json({ error: "Unable to access notes." });
      return;
    }

    // Parse the JSON data into an array of notes or initialize an empty array
    let notes = JSON.parse(data) || [];

    // Filter out the note with the given ID
    const updatedNotes = notes.filter(note => note.id !== req.params.id);

    // Check if the note with the given ID was found
    if (notes.length === updatedNotes.length) {
      console.log("Note not found.");
      res.status(404).json({ error: "Note not found." });
      return;
    }

    // Write the updated array of notes back to the JSON file
    fs.writeFile(dbFilePath, JSON.stringify(updatedNotes), (err) => {
      if (err) {
        console.log("Unable to store note.");
        res.status(500).json({ error: "Unable to store note." });
        return;
      }

      // Send a success response
      const response = {
        status: 'success'
      };

      console.log(response);
      res.json(response);
    });
  });
});

// Export the router
module.exports = router;
