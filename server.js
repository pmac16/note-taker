const express = require('express');
const path = require('path');

const app = express();
const notes = require("./db/db.json")
const { v4: uuidv4 } = require('uuid');
const util = require('util');
const fs = require('fs');


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//HTML Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

//Global
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

//API Routes
app.get('/api/notes', async (req,res) => {
    var getNotes = await readFileFunc();
    console.log(getNotes);
    return res.json(getNotes); 
});

app.post('/api/notes', (req, res) => {
    var newNote = req.body;
    //give each note a unique id
    newNote.id = uuidv4();
    var savedNoteFunc = saveNote(newNote) 
    return res.json(savedNoteFunc)
});

app.delete('/api/notes/:id', async (req,res) => {
    var id = req.params.id
    var getNotes = await readFileFunc();
    var database = getNotes.filter((note) => {
        return note.id !== id
    });
    writeFile(path.join(__dirname, "./db/db.json"),JSON.stringify(database));
    return res.json(database);
});

const saveNote = newNote => {
       return readFile(path.join(__dirname, "./db/db.json"), "utf8")
        .then(notes => {
          let database = JSON.parse(notes);
           return database;
        }).then(database => {
            database.push(newNote);
            return writeFile(path.join(__dirname, "./db/db.json"),JSON.stringify(database));
    
        }).then(()=>newNote)
}

const readFileFunc = () => {
    return readFile(path.join(__dirname, "./db/db.json"), "utf8")
    .then(notes => {
       let database = JSON.parse(notes);
       return database;
    })
}

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))