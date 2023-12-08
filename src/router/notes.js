import {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote
} from "../controllers/notes.js";
import { isauthenticated, isowner } from "../middlewares/index.js";

export default function authentication(router) {
  router.get("/notes", isauthenticated, getAllNotes);
  router.get("/notes/:id", isauthenticated, isowner, getNote);
  router.post("/notes", isauthenticated, createNote);
  router.patch("/notes/:id", isauthenticated, isowner, updateNote);
  router.delete("/notes/:id", isauthenticated, isowner, deleteNote);
}
