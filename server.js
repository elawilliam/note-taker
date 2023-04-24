const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;
const app = express();

// Parsing JSON using middleware //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// API routes //
app.get('/api/notes', (req, res) =>
    res.sendFile(path.join(__dirname, './db/db.json'))
);

// Using Post to add the new note to db.json //
app.post('/api/notes', (req, res) => {
    const notation = JSON.parse(fs.readFileSync('./db/db.json'));
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };
        notation.push(newNotation);

        const response = {
            status: 'success',
            body: newNotation,
        };

        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error: Unable to Post Notation');
    }

    fs.writeFileSync('./db/db.json', JSON.stringify(notation), "utf-8");
    res.json(notation);
});

// Delete notations //
app.delete('/api/notes/:id', (req, res) => {
    const notation = JSON.parse(fs.readFileSync('./db/db.json'));
    const deleteNotation = notation.filter((delNotation) => delNotation.id !== req.params.id);
    fs.writeFileSync('./db/db.json', JSON.stringify(deleteNotation));
    res.json(deleteNotation);
});

// GET Route for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notations page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
    console.log(`Listening on http://localhost:${PORT} 🚀`)
);