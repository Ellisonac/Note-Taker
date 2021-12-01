const { readFilePromise, addNote, deleteNote } = require('../utils/utils');

const api = require('express').Router();
const { v1: uuidv1 } = require('uuid');

const dbFile = './db/db.json';

// GET Route for retrieving all notes
api.get('/notes', (req, res) => {

  readFilePromise(dbFile).then((data) => res.json(JSON.parse(data)));

});

// POST Route for submitting a new note
api.post('/notes/', (req, res) => {

  let newNote = {
    ...req.body,
    id: uuidv1()
  };

  addNote(newNote,dbFile)

  res.status(200).send('Note added successfully.');

  //readFilePromise(dbFile).then((data) => res.json(JSON.parse(data)));

});

// DELETE route for removing notes by unique ID
api.delete('/notes/:id', (req, res) => {

  deleteNote(req.params.id,dbFile)

  res.status(200).send('Delete operation OK.');

});

module.exports = api;
