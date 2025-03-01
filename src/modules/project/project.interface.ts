import { Model, Types } from 'mongoose';
import { PaginateOptions, PaginateResult } from '../../types/paginate';

export interface IProject {
  _id?: Types.ObjectId;
  projectName: string;
  projectLogo: string;
  projectSuperVisorId?: Types.ObjectId | string;
  address: {
    streetAddress: string;
    city: string;
    zipCode: string;
    country: string;
  };
  deadline: {
    startDate: Date;
    endDate: Date;
  };
  attachments: Types.ObjectId[]; // Array of ObjectId references to Attachment
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProjectModel extends Model<IProject> {
  paginate: (
    query: Record<string, any>,
    options: PaginateOptions
  ) => Promise<PaginateResult<IProject>>;
}