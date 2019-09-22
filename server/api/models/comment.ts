import  mongoose  from "mongoose";
import { IChecksheet } from "./checksheet";

const Schema = mongoose.Schema;

export interface IComment extends mongoose.Document {
    checkSheet: IChecksheet['_id'];
    text: string;
    //createdBy: IChecksheet['completedBy']
}

const commentSchema = new Schema({	
	checksheet: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'checksheet'
	},
	text:{
		type: String,
		required: true
	},
	// createdBy: {
	// 	type: mongoose.Schema.Types.String,
	// 	 ref: 'User'
	// },	

}, {
	timestamps:
     { 
     	createdAt: 'createdOn', 
     	updatedAt: 'updatedOn' 
     }
});
export default mongoose.model('Comment', commentSchema);
