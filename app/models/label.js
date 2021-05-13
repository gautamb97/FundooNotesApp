/**
 * Executaion       :1.default node      cmd>nodemon start
 *
 * purpose          :to save find update and delete in the database
 *
 * @file            :label.js
 * @author          :Gautam Biswal
 * @version         :1.0.0
*/
const mongoose = require('mongoose');

const labelSchema = mongoose.Schema({
  label: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true, versionKey: false,
});

const LabelModel = mongoose.model('Label', labelSchema);

class Model {
    createLabel = (data) => {
      const label = new LabelModel({
        label: data.label,
        userId: data.userId,
      });
      label.save();
    }

    updateLabel = (data) => {
      LabelModel.findByIdAndUpdate(data.labelId, {
        label: data.label,
      })
        .then((note) => note);
    }
}

module.exports = new Model();
