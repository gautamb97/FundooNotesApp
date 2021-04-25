/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const fundooNoteSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
}, {
  timestamps: true,
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
}
module.exports = new Model();
