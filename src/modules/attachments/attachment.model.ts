import { model, Schema } from 'mongoose';

import paginate from '../../common/plugins/paginate';
import { IAttachment, IAttachmentModel } from './attachment.interface';
import { Roles } from '../../middlewares/roles';

const attachmentSchema = new Schema<IAttachment>(
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

attachmentSchema.plugin(paginate);

// Use transform to rename _id to _projectId
attachmentSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret._attachmentId = ret._id;  // Rename _id to _projectId
    delete ret._id;  // Remove the original _id field
    return ret;
  }
});



export const Attachment = model<IAttachment, IAttachmentModel>(
  'Attachment',
  attachmentSchema
);