/**
 * Executaion       :1.default node      cmd>nodemon start
 *
 * purpose          :to save find update and delete in the database
 *
 * @file            :note.js
 * @author          :Gautam Biswal
 * @version         :1.0.0
*/
const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  color: { type: String, required: false },
  isPined: { type: Boolean, default: false },
  isArchieved: { type: Boolean, default: false },
  isReminder: { type: String, default: false },
  isTrashed: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  labelId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Label' }],
}, {
  timestamps: true, versionKey: false,
});

const NoteModel = mongoose.model('Note', noteSchema);

class NoteModels {
  /**
 * @description     : It is use to create and save a new note in data base.
 * @param           : data, callback
 * @method          : save to save the coming data in data base
*/
  create = (data, callback) => {
    const note = new NoteModel({
      title: data.title,
      description: data.description,
      userId: data.userId,
    });
    note.save()
      .then((dataOne) => {
        callback(null, dataOne);
      });
  }

  /**
   * @description   : It updating the existing note for the perticular user
   * @param {*} data
   * @param {*} callback
  */
  updateNote = (data, callback) => {
    NoteModel.findByIdAndUpdate(data.noteId, {
      title: data.title,
      description: data.description,
    })
      .then((note) => {
        callback(null, note);
      });
  }

  /**
   * @description   : It find all the existing notes
   * @param {*} data
   * @param {*} callback
  */
  getAllNotes = (data, callback) => {
    NoteModel.find()
      .then((notes) => {
        callback(null, notes);
      });
  }

  /**
   * @description   : It deleting the existing note and change the trash value to true
   * @param {*} data
   * @param {*} callback
  */
  deleteNote = (data, callback) => {
    NoteModel.findByIdAndUpdate(data, { isTrashed: true })
      .then((note) => {
        callback(null, note);
      });
  }

  /**
   * @description   : It adds label to an existing note
   * @param {*} data
   * @returns       : Promise
  */
  addLabelToNote = (data) => {
    return new Promise((resolve, reject) => {
      NoteModel.findByIdAndUpdate(data.noteId, { $addToSet: { labelId: data.labelId } })
        .then((label) => resolve(label))
        .catch((err) => reject(err));
    });
  }

  /**
   * @description   : It removes label from an existing note
   * @param {*} data
   * @returns       : Promise
  */
  removeLabelFromNote = (data) => {
    return new Promise((resolve, reject) => {
      NoteModel.findByIdAndUpdate(data.noteId, { $pull: { labelId: data.labelId } })
        .then((label) => resolve(label))
        .catch((err) => reject(err));
    });
  }
}

module.exports = new NoteModels();
