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
   author: {
     type: String,
     required: true,
   },
   createdOn: {
      type: Date,
      default: Date.now
   }
});

export const NoteModel = mongoose.model("Note", NoteSchema);

// Note Actions
export const createNewNote = value => new NoteModel(value).save().then(note => note.toObject());
export const getNotes = id => NoteModel.find({ author:  id});
export const getNoteById = id => NoteModel.findById(id);
export const deleteNoteById = id => NoteModel.findOneAndDelete({ _id:id });
export const updateNoteById = (id, value) => NoteModel.findByIdAndUpdate(id, value, {new:true});
