if (window.location.pathname === "/notes") {
  const allNotes = document.querySelectorAll(".list-container .list-group");
  const noteTitle = document.querySelector(".note-title");
  const noteText = document.querySelector(".note-textarea");
  const addNoteBtn = document.querySelector(".new-note");
  const saveBtn = document.querySelector(".save-note");
  saveBtn.style.display = "inline";

  const getNote = () => {
    fetch("/api/notes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  //can't seem to access the db.json with getNote().then()..this is what's holding me back but it's late and I've spent hours researching/trying

  const saveNote = (note) =>
    fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

  // saveNote actually adds to the db wooooo!

  const deleteNote = (id) =>
    fetch(`/api/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

  function addNotesToDb() {
    const newNote = {
      title: noteTitle.value,
      text: noteText.value,
    };
    saveNote(newNote);
  }

  saveBtn.addEventListener("click", addNotesToDb);
  addNoteBtn.addEventListener(
    "click",
    console.log("going to write addNotes function")
  );
}
