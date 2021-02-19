const express = require('express');
const path = require('path');
const app = express();

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


//HTML Routes
app.get(`/`, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

//API Routes


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))