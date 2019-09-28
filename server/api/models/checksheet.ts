import mongoose from 'mongoose';
import comment, { IComment } from './comment';
import check, { ICheck } from './check';
///import { type } from 'os';

const Schema = mongoose.Schema;

export interface IChecksheet extends mongoose.Document {
  machineName: string;
  completedBy: string;
  supervisor: string;
  date: Date;
  checks: mongoose.Types.DocumentArray<ICheck>;
  comments: mongoose.Types.DocumentArray<IComment>;
}

const checksheetSchema = new Schema({
  machineName: { type: String, required: true },
  completedBy: { type: String, required: true },
  supervisor: { type: String, required: true },
  date: Date,
  checks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Check'
    }
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});
//checksheetSchema.plugin(require('mongoose-autopopulate'));
// Always attach `populate()` to `find()` calls
checksheetSchema.pre('find', function() {
  this.populate('check');
  this.populate('comment');
});

let collectionName = 'checksheets';
export default mongoose.model<IChecksheet>(
  'Checksheet',
  checksheetSchema,
  collectionName
);
