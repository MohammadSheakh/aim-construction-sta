import { Model, Types } from 'mongoose';
import { PaginateOptions, PaginateResult } from '../../types/paginate';

export interface IAttachment {
  _id?: Types.ObjectId;
  attachment: string;
  attachedTo: string;
  uploadedByUserId?: Types.ObjectId | string;
  uploaderRole: 'admin' | 'technician' | 'company';
  viewStatus?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAttachmentModel extends Model<IAttachment> {
  paginate: (
    query: Record<string, any>,
    options: PaginateOptions
  ) => Promise<PaginateResult<IAttachment>>;
}