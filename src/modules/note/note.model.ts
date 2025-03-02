import { model, Schema } from 'mongoose';
import paginate from '../../common/plugins/paginate';
import { INote, INoteModel } from './note.interface';

const noteSchema = new Schema<INote>(
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

noteSchema.plugin(paginate);

noteSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret._noteId = ret._id;  // Rename _id to _projectId
    delete ret._id;  // Remove the original _id field
    return ret;
  }
});



// FIXME : type fix korte hobe ..  
export const Note = model<INote, INoteModel>(
  'Note',
  noteSchema
);
