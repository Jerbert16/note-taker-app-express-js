if (window.location.pathname === "/notes") {
  const allNotes = document.querySelectorAll(".list-container .list-group");
  const noteTitle = document.querySelector(".note-title");
  const noteText = document.querySelector(".note-textarea");
  const addNoteBtn = document.querySelector(".new-note");
  const saveBtn = document.querySelector(".save-note");
  const noteCard = document.querySelector(".list-group");
  saveBtn.style.display = "inline";

  // can view objects with insomnia, so route works
  const getNote = fetch("/api/notes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const deleteNote = (id) =>
    fetch(`/api/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

  // saveNote actually adds to the db wooooo!

  const saveNote = (note) =>
    fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

  function addNotesToDb() {
    const newNote = {
      title: noteTitle.value,
      text: noteText.value,
    };
    saveNote(newNote);
  };

  function renderNotes() {
    getNote
      .then((resp) => resp.json())
      .then((data) => {
        let newNoteCard = document.createElement("li");
          console.log(data);
          data.forEach(element => noteCard.appendChild(newNoteCard).textContent = data[data.length -1].title);
        }
      );
  };

  function addNote() {
    addNotesToDb();
    const freshNote = document.createElement("li");
    const noteDetails = {
      title: noteTitle.value,
      text: noteText.value,
    };
    noteCard.appendChild(freshNote).textContent = JSON.stringify(noteDetails.title);
  };

  renderNotes();

  saveBtn.addEventListener("click", addNotesToDb);
  addNoteBtn.addEventListener(
    "click",
   addNote
  );
};
