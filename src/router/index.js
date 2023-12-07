import express from "express"
const router = express.Router()

import authentication from "./authentication.js"
import users from "./users.js"
import notes from "./notes.js"

export default function () {
  authentication(router);
  users(router);
  notes(router);
  
  return router;
}