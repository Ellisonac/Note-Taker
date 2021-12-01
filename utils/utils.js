const util = require("util");
const fs = require("fs");

// Utility functions for reading and writing to database file
const readFilePromise = util.promisify(fs.readFile);

const writeNotes = (notes, dbFile) => {
  fs.writeFile(dbFile, JSON.stringify(notes, null), (err) => {
    err ? console.error(err) : console.log("");
  });
};

const addNote = (note, dbFile) => {
  fs.readFile(dbFile, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const notes = JSON.parse(data);
      notes.push(note);
      writeNotes(notes, dbFile);
    }
  });
};

const deleteNote = (id, dbFile) => {
  fs.readFile(dbFile, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const notes = JSON.parse(data);
      for (const [index, note] of notes.entries()) {
        if (id === note.id) {
          notes.splice(index, 1);
          writeNotes(notes, dbFile);
          return;
        }
      }

      console.log("Note id not found in delete operation");
    }
  });
};

module.exports = { readFilePromise, writeNotes, addNote, deleteNote };
