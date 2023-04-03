// dependencies
const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const { v4: uuid4 } = require("uuid");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);

// get notes 
router.get("/", (req, res) => {
  // const existingNotes = JSON.parse(fs.readFileSync(__dirname, "db", "db.json"));
  // res.json(existingNotes);
  readFileAsync("./db/db.json", "utf8").then(function(data){
    notes = [].concat(JSON.parse(data))
    res.json(notes)
  })
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
