// dependencies
const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const { v4: uuid4 } = require("uuid");

// get notes.. might have an issue here... causing issues with the GET in index.js
router.get("/", (req, res) => {
  const existingNotes = JSON.parse(fs.readFileSync(__dirname, "db", "db.json"));
  res.json(existingNotes);
});

// save new notes
router.post("/", (req, res) => {
  const { title, text } = req.body;
  const newNote = { title, text, id: uuid4() };
  const existingNotes = JSON.parse(fs.readFileSync("./db/db.json"));

  existingNotes.push(newNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(existingNotes));
  res.json(newNote);
});

module.exports = router;
