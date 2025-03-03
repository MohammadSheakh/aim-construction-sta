import { Model, Types } from 'mongoose';
import { PaginateOptions, PaginateResult } from '../../types/paginate';
import { Accepted } from '../dailyLog/dailyLog.constant';


export interface INote {
  _id?: Types.ObjectId;
  title: string;
  description : string;
  attachments: Types.ObjectId[]; // Array of ObjectId references to Attachment
  createdBy?: Types.ObjectId | string;
  dailyLogId?: Types.ObjectId | string;
  projectId?: Types.ObjectId | string; // Optional field for projectId, remove if not needed
  viewStatus?: boolean; // Optional field for viewStatus
  createdAt?: Date;
  updatedAt?: Date;
  isAccepted? : Accepted.accepted | Accepted.pending;
}

export interface INoteModel extends Model<INote> {
  paginate: (
    query: Record<string, any>,
    options: PaginateOptions
  ) => Promise<PaginateResult<INote>>;
}