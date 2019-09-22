import mongoose from 'mongoose';
import { IChecksheet } from './checksheet';

const Schema = mongoose.Schema;

export interface ICheck extends mongoose.Document {
  description: string;
  status: string;
  valueRecorded?: string;
  date?: Date;
  checkSheet: IChecksheet['_id'];
}

const checkSchema = new Schema({
  checksheet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'checksheet'
  },

  description: String,
  status: {
    type: String,
    default: 'ok',
    enum: ['ok', 'Not ok', 'Job raised ']
  },
  valueRecorded: String,
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<ICheck>('Check', checkSchema);
