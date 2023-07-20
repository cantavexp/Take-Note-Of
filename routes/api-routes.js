const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');





router.get("/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
        if (err) throw err;
        console.log(data)
        return res.json(JSON.parse(data));
    });
});

router.post("/notes", (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();

    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
        if (err) throw err;

        const notes = JSON.parse(data);

        notes.push(newNote);

        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notes), (err) => {
            if (err) throw err;
            res.json(newNote);
        });
    });
});

router.delete("/notes/:id", (req, res) => {
    const id = req.params.id;

    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
        if (err) throw err;

        const notes = JSON.parse(data);

        const newNotes = notes.filter((note) => note.id !== id);

        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(newNotes), (err) => {
            if (err) throw err;
            res.json(newNotes);
        });
    });
});



module.exports = router;

