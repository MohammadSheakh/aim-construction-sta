import { model, Schema } from 'mongoose';
import paginate from '../../common/plugins/paginate';
import { IContract, IContractModel } from './contract.interface';

const contractModel = new Schema<IContract>(
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

export const Contract = model<IContract, IContractModel>(
  'Contract',
  contractModel
);
