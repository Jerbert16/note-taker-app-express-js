const express = require("express");
const path = require("path");
const htmlRoute = require("./routes/html.js");
const notesRoute = require("./routes/notes.js");

const PORT = process.env.PORT || 3001;
const app = express();

// The middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use("/", htmlRoute);
app.use("/notes", notesRoute);
app.use("/api/notes", notesRoute);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
