import { model, Schema } from 'mongoose';

import paginate from '../../common/plugins/paginate';
import { IProject, IProjectModel } from './project.interface';

const projectModel = new Schema<IProject>(
  {
    projectName: {
      type: String,
      required: [true, 'Project name is required'],
    },
    projectLogo: {
      type: String,
      required: [true, 'Project logo is required'],
    },
    // IDEA : project Manager er id o ki ekhane rakhte hobe kina.. 
    projectSuperVisorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [false, 'User is required'],
    },

    address: {
      streetAddress : {
        type: String,
        required: [true, 'Street Address is required']
      },
      city : {
        type: String,
        required: [true, 'City is required']
      },
      zipCode : {
        type: String,
        required: [true, 'Address is required']
      },
      country : {
        type: String,
        required: [true, 'Address is required']
      },
    },
    deadline : {
      startDate : {
        type: Date,
        required: [true, 'Start Date is required']
      },
      endDate : {
        type: Date,
        required: [true, 'End Date is required']
      },
    },
    attachments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Attachment',
        required: [true, 'Attachments is required'],
      }
    ],
  },
  { timestamps: true }
);

projectModel.plugin(paginate);

export const Project = model<IProject, IProjectModel>(
  'Project',
  projectModel
);
