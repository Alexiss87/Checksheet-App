import { Types as mongooseTypes } from 'mongoose';
import L from '../../common/logger';
import * as HttpStatus from 'http-status-codes';
import * as errors from '../../common/errors';

import Checksheet, { IChecksheet } from '../models/checksheet';
import l from '../../common/logger';
import check, { ICheck } from '../models/check';
import comment, { IComment } from '../models/comment';
import checksheet from '../models/checksheet';

export class ChecksheetService {
  async all(): Promise<IChecksheet[]> {
    L.info('fetch all checksheets');

    const docs = (await Checksheet.find()
      //.sort({ createdAt: 'asc' })
      //.lean()
      .populate('checks')
      .populate('comments', { text: true })
      .exec()) as IChecksheet[];

    return docs;
  }

  async byId(id: string): Promise<IChecksheet> {
    L.info(`fetch checksheet with id ${id}`);

    if (!mongooseTypes.ObjectId.isValid(id)) {
      let e = new Error(`The id: ${id} is not a vaild id `);
      throw new errors.HttpError(HttpStatus.BAD_REQUEST, e);
    }

    const doc = (await Checksheet.findOne({ _id: id })
      //.lean()
      .populate('checks')
      .populate('comments')
      .exec()) as IChecksheet;

    if (!doc)
      throw new errors.HttpError(
        HttpStatus.NOT_FOUND,
        Error(`The checksheet with id: ${id} was not found `)
      );

    return doc;
  }

  async create(checksheetData: IChecksheet): Promise<IChecksheet> {
    L.info(`create checksheet with data ${checksheetData}`);
    //destructure checkSheetdata dataoject
    let { supervisor, completedBy, machineName } = checksheetData;

    // created and casted and array of checks to Icheck after saving
    //to database
    let checks: Array<ICheck> = [];
    for (var chck in checksheetData.checks) {
      checks.push(await new check(checksheetData.checks[chck]).save());
    }
    //same as checks above
    let comments = [];
    for (var com in checksheetData.comments) {
      l.debug(`coment: ${com}`);
      comments.push(await new comment(checksheetData.comments[com]).save());
    }

    //create a check sheet object to saved with checks and comments
    const checksheet = new Checksheet({
      supervisor,
      completedBy,
      machineName,
      checks,
      comments
    });

    l.info(`ChecksheetObject: ${checksheet}`);

    const doc = (await checksheet.save()) as IChecksheet;

    return doc;
  }

  async patch(
    id: string,
    checksheetData: IChecksheet
  ): Promise<any> /** : Promise<IChecksheet>*/ {
    l.info('THE PATCH UPDATE HIT');
    l.debug('CHECKSHEET OBJECT', checksheetData);

    // let error = new Error();
    // error ={
    //   message: 'Umplimented toute'
    // }
    let error = new Error('Umplimented route');
    //return error;

    throw new errors.HttpError(HttpStatus.BAD_REQUEST, error);
  }
  async put(id: string, checksheetData: IChecksheet): Promise<IChecksheet> {
    l.info('THE PUT UPDATE HIT');
    l.debug('CHECKSHEET OBJECT', checksheetData);

    let checks: Array<ICheck> = [];
    for (var chck in checksheetData.checks) {
      checks.push(await new check(checksheetData.checks[chck]).save());
    }
    l.info(`Checks: ${checks}`);

    //same as checks above in the post method
    let comments = [];
    for (var com in checksheetData.comments) {
      comments.push(await new comment(checksheetData.comments[com]).save());
    }

    let { supervisor, completedBy, machineName } = checksheetData;

    const updatedChecksheet = {
      supervisor,
      completedBy,
      machineName,
      checks,
      comments
    };

    L.info(`update checksheet with id ${id} with data ${updatedChecksheet}`);

    try {
      const doc = (await Checksheet.findOneAndUpdate(
        { _id: id },
        { $set: updatedChecksheet },
        { new: true }
      )
        .populate('checks')
        .populate('comments')
        .exec()) as IChecksheet;
      //if (!doc) throw new errors.HttpError(HttpStatus.NOT_FOUND);
      return doc;
    } catch (error) {
      l.error(error);

      throw new errors.HttpError(HttpStatus.BAD_REQUEST, error);
      //new errors.HttpError(HttpStatus.NOT_FOUND);
    }
  }
  async remove(id: string): Promise<void> {
    L.info(`delete checksheet with id ${id}`);

    return await Checksheet.findOneAndRemove({ _id: id })
      .lean()
      .exec();
  }
}

export default new ChecksheetService();
