/**
 * @description   : It is use to taking the request from the client and gives the response.
 * @file          : label.js
 * @author        : Gautam Biswal <gautam971997@gmail.com>
*/
require('dotenv').config();
const services = require('../services/label');

class LabelController {
    /**
     * @description : It is creating a label in fundooNotes for particular user.
     * @param {httprequest} req
     * @param {httpresponse} res
     * @method       : createLabel from service.js
    */
    createLabel = async (req, res) => {
      try {
        const labelDetails = {
          label: req.body.label,
          userId: req.userId,
        };
        const labelData = await services.createLabel(labelDetails);
        if (labelData !== null) {
          return res.status(200).send({
            success: true,
            message: 'label created successfully',
            labelData,
          });
        }
        return res.status(400).send({
          success: false,
          message: 'label was unable to create',
          err,
        });
      } catch (err) {
        res.status(500).send({
          success: false,
          message: 'Internal server error',
        });
      }
    }

  /**
   * @description : It is updating an existing label in fundooNotes for particular user.
   * @param {httprequest} req
   * @param {httpresponse} res
   * @method       : updateLabel from service.js
  */
  updateLabel = (req, res) => {
    try {
      const labelData = {
        label: req.body.label,
        labelId: req.params.labelId,
      };
      if (!labelData.label) {
        res.status(400).send({
          success: false,
          message: 'the field can not be empty which you want to update',
        });
      } else {
        services.updateLabel(labelData).then((data) => {
          res.status(200).send({
            success: true,
            message: 'label update successfully',
            data,
          });
        }).catch((err) => {
          res.status(400).send({
            success: false,
            message: 'label was unable to update',
            err,
          });
        });
      }
    } catch (err) {
      res.status(500).send({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * @description : It is deleting an existing label in fundooNotes
   * @param {httprequest} req
   * @param {httpresponse} res
   * @method       : deleteLabel from service.js
  */
  deleteLabel = (req, res) => {
    try {
      services.deleteLabel(req.params.labelId).then((data) => {
        res.status(200).send({
          success: true,
          message: 'label deleted successfully',
        });
      }).catch((err) => {
        res.status(400).send({
          success: false,
          message: 'label was unable to delete',
          err,
        });
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * @description : It is getting all existing notes from fundooNotes
   * @param {httprequest} req
   * @param {httpresponse} res
   * @method       : getAllLabels from service.js
  */
  getAllLabels = (req, res) => {
    try {
      services.getAllLabels(req).then((labels) => {
        res.status(200).send({
          success: true,
          message: 'fetched all labels successfully',
          labels,
        });
      }).catch((err) => {
        res.status(400).send({
          success: false,
          message: 'unable to fetch labels',
          err,
        });
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: 'Internal server error',
      });
    }
  }
}

module.exports = new LabelController();
