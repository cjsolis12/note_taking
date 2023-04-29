const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('../helpers/fs.Utils.js');

//GET Route for retrieving all the notes
notes.get('/', (req, res)=>{
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})


//POST Route for submitting notes
notes.post('/', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Tip added successfully 🚀`);
    } else {
      res.error('Error in adding tip');
    }
  });

// DELETE Route for deleting a note by note_id
notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const newJson = json.filter((note) => note.id !== noteId);
        console.log(newJson)
        writeToFile('./db/db.json', newJson);
        res.json(`Note ${noteId} deleted successfully!`);
      })
      .catch((err) => res.json(err));
  });

module.exports = notes;


