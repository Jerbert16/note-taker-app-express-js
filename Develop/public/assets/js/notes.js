const express = require("express");
const { write } = require("fs");
const path = require("path");
const allNotes = require("../../../db/db.json");
const PORT = process.env.port || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/api", api);

app.use(express.static("public"));

// GET Route for homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../../notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.json(allNotes);
});

app.post("/api/notes", (req, res) => {
  const saveNote = createNewNote(req.body, allNotes);
  res.json(saveNote);
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT} 🚀`);
});
