const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// GET /notes 
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find(); 
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving notes.' });
  }
});

// POST /notes - Add a new note
router.post('/', async (req, res) => {
  const { title, content } = req.body;

  
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required.' });
  }

  const note = new Note({ title, content });

  try {
    const savedNote = await note.save(); 
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(500).json({ message: 'Failed to save note.' });
  }
});

// DELETE /notes/:id 
router.delete('/:id', async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found.' });
    }

    res.json({ message: 'Note is deleted successfully.' });

  } catch (err) {
    res.status(500).json({ message: 'Error deleting note.' });
  }
});

// PUT /notes/:id
router.put('/:id', async (req, res) => {
  const { title, content } = req.body;

  // Validate input
  if (!title || !content) {
    return res.status(400).json({ message: 'Title & content are required.' });
  }

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, runValidators: true } // controlling the behavior of the update.
    );

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found.' });
    }

    res.json(updatedNote);

  } 
    
  catch (err) {
    res.status(500).json({ message: 'Error updating note.' });
  }

});

module.exports = router;
