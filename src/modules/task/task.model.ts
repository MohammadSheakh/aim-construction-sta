import { model, Schema } from 'mongoose';
import paginate from '../../common/plugins/paginate';
import { ITask, ITaskModel } from './task.interface';

const taskModel = new Schema<ITask>(
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

export const Task = model<ITask, ITaskModel>(
  'Task',
  taskModel
);
