import express from 'express';
import checksheetController from './checksheet.controller';
const SchemaValidator = require('../../middleware/schemaValidator');
const validateRequest = SchemaValidator(true);

export default express
  /**
   * @typedef Checksheet
   * @property {string} _id - unique identifier generated by MongoDB
   * @property {string} machineName - The name of the equipment being check
   * @property {string} supervisor - Your supervisor
   * @property {string} completedBy - Who wrote up this sheet
   * @property {string} date - The date the check sheet was writen
   * @property {Array.<Check>} checks - A list of checks that should be done
   * @property {Array.<Comment>} comments - a list comments
   */

  .Router()
  /*
   * POST
   */
  /**
   * create a CheckSheet
   * @route POST /checksheet
   * @group Checksheet
   * @param {Checksheet.model} Checksheet.body.required - The checksheet object to be created
   * @param {date} date - The date created...for now
   * @returns {Checksheet} 201 - successfully created comment
   */
  .post('/checksheet', validateRequest, checksheetController.create)

  /*
   * GET
   */
  /**
   * Get a list of all comments related to specific idea
   * @route GET /checksheets
   * @group Checksheet
   * @returns {Array.<Checksheet>} 200 - A list of comments
   */
  .get('/checksheets', checksheetController.all)

  /*
   * GET
   */
  /**
   * Get a single checksheet based on id
   * @route GET /checksheets/{id}
   * @group Checksheet
   * @param {string} id.path.required - id of the Checksheet in the route URL
   * @returns {checksheet} 200 - returns a checksheet
   * @returns {Error}  400 - Invalid id provided
   * @returns {Error}  404 - The checksheet with id: *** was not found
   * @returns {Error} 500 - Internal server error
   */

  .get('/checksheets/:id', checksheetController.byId)

  //TODO write swagger definition for this route
  /**
   * PATCH
   * @route PATCH /checkssheets/{id}
   * @group Checksheet
   * @param {string} id.path.required - id of the Checksheet in the route URL
   * @param {Checksheet.model} Checksheet.body.required - object to be udated
   * @returns {checksheet} 201 - returns an updated checksheet
   * @returns {Error}  400 - Invalid id provided
   * @returns {Error}  404 - The checksheet with id: *** was not found
   * @returns {Error} 500 - Internal server error
   */
  .patch('/checksheets/:id', validateRequest, checksheetController.patch)

  //TODO write swagger definition for this route
  .put('/checksheets/:id', validateRequest, checksheetController.put)

  /*
   * DELETE
   */
  /**
   * Delete a Checksheet
   * @route Delete /checksheets/{id}
   * @group Checksheet
   * @param {string} id.path.required - id of the Checksheet in the route URL
   * @returns {string} 200 - Successfully deleted checksheet
   */
  .delete('/checksheets/:id', checksheetController.remove);

/**
 * @typedef Comment
 * @property {string} _id - unique identifier generated by MongoDB
 * @property {string} text.required - the comment
 * @property {string} createdBy - The person who this comment
 * @property {string} createdAt - The date the comment was written
 */

/**
 * @typedef Check
 * @property {string} _id - unique identifier generted by MongoDB
 * @property {string} Description.required - what is being checked on the equipment
 * @property {string} status - The result of the check { ok, not, job raised}
 * @property {string} createdAt - The Date of when the check was done
 */
