import express from "express";
const router = express.Router();

import authentication from "./authentication.js";
import notes from "./notes.js";

export default function () {
  authentication(router);
  notes(router);

  return router;
}
