const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require("uuid");



router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

router.post("/api/notes", (req, res) => {
    fs.readFile("db/db.json", "utf8", (err, response) => {
        if (err) throw err;
        let notes = JSON.parse(response);
        let newNote = req.body;
        newNote.id = uuidv4();
        notes.push(newNote);
        fs.writeFile("db/db.json", JSON.stringify(notes, '\t'), (err) => {
            if (err) throw err;
            res.send("Added Note: " + newNote.title);           
        });
    });
});

router.get("/api/notes", (req, res) => {
    fs.readFile("db/db.json", "utf8", (err, response) => {
        if (err) throw err;
        let notes = JSON.parse(response);
        res.json(notes);
    });
});

router.delete("/api/notes/:id", (req, res) => {
    fs.readFile("db/db.json", "utf8", (err, response) => {
        if (err) throw err;
        let notes = JSON.parse(response);
        let notDeleted = notes.filter((note) => {
            return note.id !== req.params.id;
        });
        
        fs.writeFile("db/db.json", JSON.stringify(notDeleted, '\t'), (err) =>{
            if (err) throw err;
            res.sendFile(path.join(__dirname, "../public/notes.html"));
            console.log("Deleted Note"); 
        });
    });
});

router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});



module.exports = router;








