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
       type: Boolean,
       default: false
     },
     published: {
       type: Boolean,
       default: false
     },
     publiclink: {
       type: String,
       default: ""
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
export const getNotes = author => NoteModel.find({ author });
export const getPinnedNotes = author => NoteModel.find({ author, 'preferences.pin': true });
export const getNoteById = id => NoteModel.findById(id);
export const deleteNoteById = id => NoteModel.findOneAndDelete({ _id:id });
export const updateNoteById = (id, value) => NoteModel.findByIdAndUpdate(id, value, {new:true});
