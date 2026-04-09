let notes = JSON.parse(localStorage.getItem("notes")) || [];
let filteredNotes = [...notes];

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function addNote() {
  const input = document.getElementById("noteInput");
  const text = input.value.trim();

  if (!text) return;

  notes.push({
    id: Date.now(),
    text
  });

  input.value = "";
  saveNotes();
  renderNotes();
}

function deleteNote(id) {
  notes = notes.filter(note => note.id !== id);
  saveNotes();
  renderNotes();
}

function renderNotes() {
  const container = document.getElementById("notes");
  container.innerHTML = "";

  filteredNotes = notes;

  filteredNotes.forEach(note => {
    const div = document.createElement("div");
    div.className = "note";

    div.innerHTML = `
      ${note.text}
      <button onclick="deleteNote(${note.id})">❌</button>
    `;

    container.appendChild(div);
  });
}

function searchNotes() {
  const value = document.getElementById("search").value.toLowerCase();

  filteredNotes = notes.filter(note =>
    note.text.toLowerCase().includes(value)
  );

  const container = document.getElementById("notes");
  container.innerHTML = "";

  filteredNotes.forEach(note => {
    const div = document.createElement("div");
    div.className = "note";

    div.innerHTML = `
      ${note.text}
      <button onclick="deleteNote(${note.id})">❌</button>
    `;

    container.appendChild(div);
  });
}

function toggleTheme() {
  document.body.classList.toggle("light");
}

renderNotes();
