/* eslint-disable linebreak-style */
/**
 * @description   : It is use to create schema in data base and doing schema vlidation and
 *                  encrypting password.
 * @package       : mongoose, bcrypt
 * @file          : user.js
 * @author        : Gautam Biswal <gautam971997@gmail.com>
*/
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const fundooNoteSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {
  timestamps: true,
});
/**
 * @description     : It is converting password content to a encrypted to form using pre middleware
 *                    of mongoose and bcrypt npm package.
*/
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
  /**
   * @description     : It is use to create and save a new note in data base.
  */
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

  login = (data, callback) => {
    let username = data.email;
    let password = data.password;

    FundooNote.findOne({ email: username })
      .then((user) => {
        if (user) {
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
              callback(err, null);
            }
            if (result) {
              let resultOne = {
                message: 'success',
              };
              callback(null, resultOne);
            } else {
              callback('Password does not match');
            }
          });
        } else {
          callback('user not found');
        }
      });
  }
}

module.exports = new Model();
