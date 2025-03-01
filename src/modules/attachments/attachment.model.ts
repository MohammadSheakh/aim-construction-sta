import { model, Schema } from 'mongoose';

import paginate from '../../common/plugins/paginate';
import { IAttachment, IAttachmentModel } from './attachment.interface';
import { Roles } from '../../middlewares/roles';

const attachmentModel = new Schema<IAttachment>(
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
      enum: Roles,
      required: true,
    },
    
    viewStatus: { type: Boolean, default: false },
  },
  { timestamps: true }
);

attachmentModel.plugin(paginate);

export const Attachment = model<IAttachment, IAttachmentModel>(
  'Attachment',
  attachmentModel
);