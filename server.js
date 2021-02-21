const express = require('express');
const path = require('path');

const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set static folder
// app.use(express.static(path.join(__dirname, 'public')));

//HTML Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

//API Routes
// app.get('/api/notes', (req,res) => {
//     return res.json(notes) 
// });

// app.post('/api/notes', (req, res) => {
//     let newNote = req.body;
//     console.log(newNote);
//     notes.push(newNote);
//     res.json(newNote);
// });


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))