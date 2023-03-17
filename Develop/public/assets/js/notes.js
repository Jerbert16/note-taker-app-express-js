const express = require("express");
const { write } = require("fs");
const path = require("path");

const PORT = process.env.port || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/api", api);

app.use(express.static("public"));

// GET Route for homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/Develop/public/assets/js/index.html"))
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/assets/notes.html"))
});

app.get("/api/notes", (req, res) => {
  readFromFile("./db/db.json").then((noteData) => res.json(noteData))});
app.post("/api/notes", (req, res) => {
  const saveNote = req.body;
  writeToFile("/Develop/db/db.json", newNote);
  res.json(`${req.method} recieved`);
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT} 🚀`)
});
