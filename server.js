const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public")); // Frontend buradan sunulacak

const NOTES_FILE = "./notes.json";

// Notlar dosyası yoksa oluştur
if (!fs.existsSync(NOTES_FILE)) {
  fs.writeFileSync(NOTES_FILE, "[]", "utf8");
}

// Notları oku
function readNotes() {
  const data = fs.readFileSync(NOTES_FILE, "utf8");
  return JSON.parse(data);
}

// Notları kaydet
function saveNotes(notes) {
  fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2), "utf8");
}

// Notları getir
app.get("/notes", (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

// Not ekle/güncelle
app.post("/notes", (req, res) => {
  const newNotes = req.body;
  if (!Array.isArray(newNotes)) {
    return res.status(400).json({ error: "Notes should be an array" });
  }
  saveNotes(newNotes);
  res.json({ status: "success" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
