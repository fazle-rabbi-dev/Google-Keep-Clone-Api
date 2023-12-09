import {
  createNewNote,
  getNotes,
  getNoteById,
  deleteNoteById,
  updateNoteById,
  getPinnedNotes
} from "../database/NoteModel.js";
import { v4 as uuidv4 } from 'uuid';

export const createNote = async (req, res) => {
  try {
    const { title, body, bgcolor, pin } = req.body;

    if (!title || !body) {
      throw {
        message: "Missing required field. Please check your request body"
      };
    }

    const noteData = {
      title,
      body,
      author: req.identity._id
    };
    
    if (bgcolor) {
      noteData.preferences = {}
      noteData.preferences.bgcolor = bgcolor;
    }
    
    if (pin) {
      noteData.preferences = {
        ...noteData.preferences
      }
      noteData.preferences.pin = pin;
    }
    
    const note = await createNewNote(noteData);

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: {
        note
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: {
        message: "Bad Request",
        details: error.message
      }
    });
  }
};


export const getAllNotes = async (req, res) => {
  const { pinned } = req.query
  
  try {
    let notes;
    
    if(pinned){
      notes = await getPinnedNotes(req.identity._id);
    }else{
      notes = await getNotes(req.identity._id);
    }
    
    res.status(200).json({
      success: true,
      notes
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: {
        message: "Bad Request",
        details: error.message
      }
    });
  }
};


export const getNote = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw {
      success: false,
      message: "Please provide an id as route parameter"
    };
  }

  try {
    const note = await getNoteById(id);
    res.status(200).json({
      success: true,
      note
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: {
        message: "Bad Request",
        details: error.message
      }
    });
  }
};


export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, body, bgcolor, pin } = req.body;

  try {
    if (!id || !title || !body) {
      throw {
        success: false,
        message: "Missing required field. Please check your request body or make sure to provide a noteid as route parameter"
      };
    }

    const noteData = {
      title,
      body
    };
    
    if(bgcolor){
      noteData.preferences = {}
      noteData.preferences.bgcolor = bgcolor;
    }
    if(pin){
      noteData.preferences = {
        ...noteData.preferences
      }
      noteData.preferences.pin = pin;
    }
    
    const note = await updateNoteById(id, noteData);

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: {
        note
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: {
        message: "Bad Request",
        details: error.message
      }
    });
  }
};


export const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      throw {
        success: false,
        message: "Invalid or missing noteid in route parameter"
      };
    }

    const note = await deleteNoteById(id);
    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      note
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: {
        message: "Bad Request",
        details: error.message
      }
    });
  }
};


export const publishNote = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      throw {
        success: false,
        message: "Invalid or missing noteid in route parameter"
      };
    }

    const note = await getNoteById(id);
    note.preferences.published = true;

    const ref = await note.save();
    
    res.status(200).json({
      success: true,
      message: "Note published successfully",
      data: {
        id: ref._id
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: {
        message: "Bad Request",
        details: error.message
      }
    });
  }
};


export const unpublishNote = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      throw {
        success: false,
        message: "Invalid or missing noteid in route parameter"
      };
    }

    const note = await getNoteById(id);
    note.preferences.published = false;

    const ref = await note.save();
    
    res.status(200).json({
      success: true,
      message: "Note unpublished successfully",
      data: {
        id: ref._id
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: {
        message: "Bad Request",
        details: error.message
      }
    });
  }
};


export const getPublicNote = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      throw {
        success: false,
        message: "Invalid or missing noteid in route parameter"
      };
    }

    const note = await getNoteById(id);
    
    if(!note.preferences.published){
      throw {
        success: false,
        status: 401,
        message: "This note not yet published."
      };
    }
    
    res.status(200).json({
      success: true,
      note
    });
  } catch (error) {
    res.status(error?.status || 400).json({
      success: false,
      error: {
        details: error.message
      }
    });
  }
};
