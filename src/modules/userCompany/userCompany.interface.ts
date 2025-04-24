import { Model, Types } from 'mongoose';
import { PaginateOptions, PaginateResult } from '../../types/paginate';

// FIX  // TODO : joto jaygay role ase .. role gula check dite hobe .. 
export interface ICompany {
  _id?: Types.ObjectId;
  userId?: Types.ObjectId;
  companyId?: Types.ObjectId;
}

export interface ICompanyModel extends Model<ICompany> {
  paginate: (
    query: Record<string, any>,
    options: PaginateOptions
  ) => Promise<PaginateResult<ICompany>>;
}