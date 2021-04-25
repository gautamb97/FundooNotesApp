/* eslint-disable linebreak-style */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const fundooNoteSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, requires: true },
  password: { type: String, required: true },
}, {
  timestamps: true,
});

fundooNoteSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hassedPassword = await bcrypt.hash(this.password, salt);
    this.password = hassedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const FundooNote = mongoose.model('FundooNote', fundooNoteSchema);

class Model {
  create = (data, callback) => {
    const note = new FundooNote({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    });
    note.save()
      .then((dataOne) => {
        callback(null, dataOne);
      }).catch((err) => {
        callback(err);
      });
  }

  findAll = (callback) => {
    FundooNote.find()
      .select('firstName lastName email password _id')
      .then((dataOne) => {
        callback(null, dataOne);
      }).catch((err) => {
        callback(err);
      });
  }
}
module.exports = new Model();
