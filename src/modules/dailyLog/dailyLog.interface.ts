import { Model, Types } from 'mongoose';
import { PaginateOptions, PaginateResult } from '../../types/paginate';

export interface IDailyLog {
  _id?: Types.ObjectId;
  noteId?: Types.ObjectId | string;
  createdBy?: Types.ObjectId | string;
  projectId?: Types.ObjectId | string;
  viewStatus?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IDailyLogModel extends Model<IDailyLog> {
  paginate: (
    query: Record<string, any>,
    options: PaginateOptions
  ) => Promise<PaginateResult<IDailyLog>>;
}