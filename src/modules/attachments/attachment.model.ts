import { model, Schema } from 'mongoose';
import { INotification, INotificationModal } from './notification.interface';
//Issue
import { roles } from '../../middlewares/roles';
import paginate from '../../common/plugins/paginate';

const attachmentModel = new Schema<INotification>(
  {
    attachment: {
      type: String,
      required: [true, 'attachment is required'],
    },
    attachedTo : {
      type: String,
      required: [true, 'AttachedTo is required'],
    },
    uploadedByUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [false, 'User is required'],
    },
    uploaderRole: {
      type: String,
      enum: roles,
      required: true,
    },
    
    viewStatus: { type: Boolean, default: false },
  },
  { timestamps: true }
);

attachmentModel.plugin(paginate);

// FIXME :  type change korte hobe 
export const Attachment = model<INotification, INotificationModal>(
  'Attachment',
  attachmentModel
);
