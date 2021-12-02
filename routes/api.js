const api = require("express").Router();
const { readFilePromise, addNote, deleteNote } = require("../utils/utils");

// Use uuid module to create unique ids
const { v1: uuidv1 } = require("uuid");

const dbFile = "./db/db.json";

// GET Route for retrieving all notes
api.get("/notes", (req, res) => {
  readFilePromise(dbFile).then((data) => res.json(JSON.parse(data)));
});

// POST Route for submitting a new note
api.post("/notes/", (req, res) => {
  let newNote = {
    ...req.body,
    id: uuidv1(),
  };

  addNote(newNote, dbFile);

  res.status(200).send("Note added successfully.");
});

// DELETE route for removing notes by unique ID
api.delete("/notes/:id", (req, res) => {
  deleteNote(req.params.id, dbFile);

  res.status(200).send("Delete operation OK.");
});

module.exports = api;
