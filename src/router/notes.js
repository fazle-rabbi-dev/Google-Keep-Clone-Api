import {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
  publishNote,
  unpublishNote,
  getPublicNote
} from "../controllers/notes.js";
import { isauthenticated, isowner } from "../middlewares/index.js";

export default function authentication(router) {
  router.get("/notes", isauthenticated, getAllNotes);
  router.get("/notes/:id", isauthenticated, isowner, getNote);
  router.post("/notes", isauthenticated, createNote);
  router.patch("/notes/:id", isauthenticated, isowner, updateNote);
  router.delete("/notes/:id", isauthenticated, isowner, deleteNote);
  router.get("/notes/publish/:id", isauthenticated, isowner, publishNote);
  router.get("/notes/unpublish/:id", isauthenticated, isowner, unpublishNote);
  router.get("/notes/public/:id", getPublicNote);
}
