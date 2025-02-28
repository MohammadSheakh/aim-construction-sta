import { model, Schema } from 'mongoose';
import { INotification, INotificationModal } from './notification.interface';
import { roles } from '../../middlewares/roles';
import paginate from '../../common/plugins/paginate';

const noteModel = new Schema<INotification>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    attachments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Attachment',
        required: [true, 'Attachments is required'],
      }
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [false, 'User is required'],
    },
    dailyLogId: {
      type: Schema.Types.ObjectId,
      ref: 'DailyLog',
      required: [false, 'DailyLog is required'],
    },
    // TODO : project Id ki dorkar ase ?
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'DailyLog',
      required: [false, 'DailyLog is required'],
    },
    // TODO : viewStatus lagbe kina
    // viewStatus: { type: Boolean, default: false },
  },
  { timestamps: true }
);

noteModel.plugin(paginate);

// FIXME : type fix korte hobe ..  
export const Note = model<INotification, INotificationModal>(
  'Note',
  noteModel
);
