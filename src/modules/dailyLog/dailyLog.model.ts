import { model, Schema } from 'mongoose';
import paginate from '../../common/plugins/paginate';
import { IDailyLog, IDailyLogModel } from './dailyLog.interface';
import { Accepted } from './dailyLog.constant';


// INFO :  Daily Log is not needed  
// INFO :  We can remove total dailyLog module .. 

const dailyLogSchema = new Schema<IDailyLog>(
  {
    // TODO : multiple notes can be added
    // notes: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Note',
    //     required: [false, 'Note is required'],
    //   },
    // ] ,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [false, 'Created By is required'],
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: [false, 'Project Id is required'],
    },
    isAccepted : {
      type: String,
      enum:  [Accepted.accepted ,Accepted.pending],  
      required: [false, 'Status is required. It can be accepted / pending'],
    },
    // viewStatus: { type: Boolean, default: false },
  },
  { timestamps: true }
);

dailyLogSchema.plugin(paginate);

// Use transform to rename _id to _projectId
dailyLogSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret._dailyLogId = ret._id;  // Rename _id to _projectId
    delete ret._id;  // Remove the original _id field
    return ret;
  }
});

export const DailyLog = model<IDailyLog, IDailyLogModel>(
  'DailyLog',
  dailyLogSchema
);
