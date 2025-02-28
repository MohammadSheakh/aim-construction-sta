import { model, Schema } from 'mongoose';
import { INotification, INotificationModal } from './notification.interface';
import { roles } from '../../middlewares/roles';
import paginate from '../../common/plugins/paginate';

const contractModel = new Schema<INotification>(
  {
    attachments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Attachment',
        required: [true, 'Attachments is required'],
      }
    ],
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: [false, 'Project Id is required'],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [false, 'User Id is required'],
    },
    // IDEA : ekhane creator role nam e ekta field rakhbo kina .. 
    
  },
  { timestamps: true }
);

contractModel.plugin(paginate);

export const Contract = model<INotification, INotificationModal>(
  'Contract',
  contractModel
);
