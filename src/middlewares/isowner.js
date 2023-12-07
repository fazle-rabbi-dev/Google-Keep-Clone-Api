import { getNoteById } from "../database/NoteModel.js";

export default async function (req, res, next) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Oops! session-token invalid or missing"
      });
    }

    const note = await getNoteById(id);

    if (note.author !== req.identity._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "Oops! session-token invalid or missing"
      });
    }

    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Oops! session-token invalid or missing"
    });
  }
}
