import ChecksheetService from '../services/checksheet.service';
import { Request, Response, NextFunction } from 'express';
import * as HttpStatus from 'http-status-codes';
import * as errors from '../../common/errors';
import l from '../../common/logger';
import _ from 'lodash';

export class Controller {
  async all(req: Request, res: Response, next: NextFunction) {
    try {
      var url = require('url');
      var url_parts = url.parse(req.url, true);
      var query = url_parts.query;
      let cleanQuery = _.mapValues(query, _.method('toLowerCase'));

      const docs = await ChecksheetService.all({ ...cleanQuery });
      return res.status(HttpStatus.OK).json(docs);
    } catch (err) {
      return next(err);
    }
  }

  async byId(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await ChecksheetService.byId(req.params.id);
      l.debug(doc);
      if (doc != null || doc != undefined) {
        return res.status(HttpStatus.OK).json(doc);
      } else {
        let error = {
          status: 404,
          message: `The checksheet with id: ${req.params.id} was not found `
        };
        next(error);
      }
    } catch (err) {
      //l.error(err);
      return next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await ChecksheetService.create(req.body);
      return res
        .status(HttpStatus.CREATED)
        .location(`/api/v1/checksheet/${doc._id}`)
        .json(doc);
    } catch (err) {
      l.debug('Error: ', err);
      if (err.name == 'ValidationError') {
        l.debug('validation fail');
        l.debug(err.stack);
        // let valError = new errors.HttpError(HttpStatus., err);
        return next({
          status: 422,
          message: err.message
        });
      }
      return next(err);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await ChecksheetService.update(req.params.id, req.body);
      return res
        .status(HttpStatus.OK)
        .location(`/api/v1/checksheet/${doc._id}`)
        .json(doc);
    } catch (err) {
      return next(err);
    }
  }

  async patch(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await ChecksheetService.patch(req.params.id, req.body);
      return res
        .status(HttpStatus.OK)
        .location(`/api/v1/checksheet/${doc._id}`)
        .json(doc);
    } catch (err) {
      return next(err);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await ChecksheetService.remove(req.params.id);
      return res.status(HttpStatus.OK).send('successfully deleted checksheet');
    } catch (err) {
      return next(err);
    }
  }
}

export default new Controller();
