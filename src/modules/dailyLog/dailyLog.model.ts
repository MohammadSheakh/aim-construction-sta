import { model, Schema } from 'mongoose';
import { INotification, INotificationModal } from './notification.interface';
import { roles } from '../../middlewares/roles';
import paginate from '../../common/plugins/paginate';

const dailyLogModel = new Schema<INotification>(
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

export const dailyLog = model<INotification, INotificationModal>(
  'DailyLog',
  dailyLogModel
);
