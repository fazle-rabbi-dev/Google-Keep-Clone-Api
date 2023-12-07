import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
      trim: true
   },
   body: {
     type: String,
     required: true,
   },
   preferences: {
     bgcolor: {
       type: String,
       default: ""
     },
     pin: {
       type: Boolean, // todo: check
       default: false
     }
   },
   createdOn: {
      type: Date,
      default: Date.now
   }
});

export const NoteModel = mongoose.model("Note", NoteSchema);

// Note Actions
export const getNotes = () => NoteModel.find();
export const getNoteById = id => NoteModel.findById(id);
export const deleteNoteById = id => NoteModel.findOneAndDelete(id);
export const updateNoteById = id => NoteModel.findByIdAndUpdate(id);
