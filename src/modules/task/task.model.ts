import { model, Schema } from 'mongoose';
import { INotification, INotificationModal } from './notification.interface';
import { roles } from '../../middlewares/roles';
import paginate from '../../common/plugins/paginate';

const taskModel = new Schema<INotification>(
  {
    task_status: {
      type: String,
      enum: ['complete', 'open', 'done'],
      required: [true, 'Task status is required'],
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [false, 'User is required'],
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: [false, 'Project is required'],
    },
    dueDate: {
      type: Date,
    },
    deadline: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
    description : {
      type: String,
      required: [true, 'Description is required'],
    },
    attachments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Attachment',
        required: [true, 'Attachments is required'],
      }
    ],
    //viewStatus: { type: Boolean, default: false },
  },
  { timestamps: true }
);

taskModel.plugin(paginate);

export const Task = model<INotification, INotificationModal>(
  'Task',
  taskModel
);
