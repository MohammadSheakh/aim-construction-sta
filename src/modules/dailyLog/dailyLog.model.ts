import { model, Schema } from 'mongoose';
import paginate from '../../common/plugins/paginate';
import { IDailyLog, IDailyLogModel } from './dailyLog.interface';

const dailyLogModel = new Schema<IDailyLog>(
  {
    // TODO : multiple notes can be added
    noteId: {
      type: Schema.Types.ObjectId,
      ref: 'Note',
      required: [false, 'Note is required'],
    },
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
    
    viewStatus: { type: Boolean, default: false },
  },
  { timestamps: true }
);

dailyLogModel.plugin(paginate);

export const DailyLog = model<IDailyLog, IDailyLogModel>(
  'DailyLog',
  dailyLogModel
);
