import { Model, Types } from 'mongoose';
import { PaginateOptions, PaginateResult } from '../../types/paginate';

export interface IContract {
  attachments: Types.ObjectId[]; // Array of ObjectId references to Attachment
  description: string;
  projectId?: Types.ObjectId | string;
  createdBy?: Types.ObjectId | string;
  creatorRole?: 'admin' | 'technician' | 'company'; // Optional field for creator role
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IContractModel extends Model<IContract> {
  paginate: (
    query: Record<string, any>,
    options: PaginateOptions
  ) => Promise<PaginateResult<IContract>>;
}