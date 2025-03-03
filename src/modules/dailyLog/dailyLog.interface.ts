import { Model, Types } from 'mongoose';
import { PaginateOptions, PaginateResult } from '../../types/paginate';
import { TAccepted } from './dailyLog.constant';

export interface IDailyLog {
  _id?: Types.ObjectId;
  notes?: Types.ObjectId | string;
  createdBy?: Types.ObjectId | string;
  projectId?: Types.ObjectId | string;
  viewStatus?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  isAccepted : TAccepted;
}

export interface IDailyLogModel extends Model<IDailyLog> {
  paginate: (
    query: Record<string, any>,
    options: PaginateOptions
  ) => Promise<PaginateResult<IDailyLog>>;
}