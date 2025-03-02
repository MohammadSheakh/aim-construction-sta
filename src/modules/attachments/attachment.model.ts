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
    attachmentType : {
      enum : ['pdf', 'image'],
      type: String,
      required: [true, 'Attached Type is required. It can be pdf / image'],
    },
    attachedToId : {
      type: String,
      required: [true, 'AttachedToId is required.'],
    },
    attachedToType : {
      enum: ['note', 'task'],
      type: String,
      required: [true, 'AttachedToType is required. It can be note / task'],
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, 'Project Id is required'],
    },
    uploadedByUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [false, 'User Id is required'],
    },
    uploaderRole: {
      type: String,
      enum: Roles,
      required: true,
    },

    // Add reactions field to track user reactions to the attachment
    reactions: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      }
    ],
    
    // viewStatus: { type: Boolean, default: false },
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