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

module.exports = mongoose.model('FundooNote', fundooNoteSchema);
