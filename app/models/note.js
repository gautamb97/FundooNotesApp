const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  color: { type: String, required: false },
  isPined: { type: Boolean, default: false },
  isArchieved: { type: Boolean, default: false },
  isReminder: { type: Boolean, default: false },
  isTrashed: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true, versionKey: false,
});

const NoteModel = mongoose.model('Note', noteSchema);

class NoteModels {
    create = (data, callback) => {
      const note = new NoteModel({
        title: data.title,
        description: data.description,
        userId: data.userId,
      });
      note.save()
        .then((dataOne) => {
          callback(null, dataOne);
        }).catch((err) => {
          callback(err);
        });
    }

    updateNote = (data, callback) => {
      NoteModel.findByIdAndUpdate(data.noteId, {
        title: data.title,
        description: data.description,
      })
        .then((note) => {
          callback(null, note);
        }).catch((err) => {
          callback(err);
        });
    }

    getAllNotes = (data, callback) => {
      NoteModel.find()
        .then((notes) => {
          callback(null, notes);
        }).catch((err) => {
          callback(err);
        });
    }
}

module.exports = new NoteModels();
