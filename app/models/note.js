const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  color: { type: String, required: true },
  isPin: { type: Boolean, required: false },
  isArchie: { type: Boolean, required: false },
  isReminder: { type: Boolean, required: false },
  isTrash: { type: Boolean, required: false },
}, {
  timestamps: true, versionKey: false,
});

const NoteModel = mongoose.model('Note', noteSchema);

class NoteModels {
    create = (data, callback) => {
      const note = new NoteModel({
        title: data.title,
        description: data.description,
        color: data.color,
      });
      note.save()
        .then((dataOne) => {
          callback(null, dataOne);
        }).catch((err) => {
          callback(err);
        });
    }
}

module.exports = new NoteModels();
