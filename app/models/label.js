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
    /**
     * @description     : creating label in the fundooNotesApp using async and await
     * @param {*} data
     * @returns         : saved label from mongoDB
    */
    createLabel = async (data) => {
      const label = new LabelModel({
        label: data.label,
        userId: data.userId,
      });
      const loadLabel = await label.save();
      return loadLabel;
    }

    /**
     * @description     : updating an existing label from fundooNotesApp
     * @param {*} data
     * @returns         : the label which one updated and promise
    */
    updateLabel = (data) => {
      return new Promise((resolve, reject) => {
        LabelModel.findByIdAndUpdate(data.labelId, {
          label: data.label,
        })
          .then((label) => resolve(label))
          .catch((err) => reject(err));
      });
    }

    /**
     * @description     : daleting an existing label from the fundooNotesApp
     * @param {*} data
     * @returns         : label that deleted and promise
    */
    deleteLabel = (data) => {
      return new Promise((resolve, reject) => {
        LabelModel.findByIdAndRemove(data)
          .then((label) => resolve(label))
          .catch((err) => reject(err));
      });
    }

    /**
     * @description     : getting all labels from the fundooNotesApp
     * @returns         : Promise
    */
    getAllLabels = () => {
      return new Promise((resolve, reject) => {
        LabelModel.find()
          .then((labels) => resolve(labels))
          .catch((err) => reject(err));
      });
    }
}

module.exports = new Model();
