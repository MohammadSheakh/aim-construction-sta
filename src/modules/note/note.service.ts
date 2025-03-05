import mongoose from 'mongoose';
import { GenericService } from '../Generic Service/generic.services';
import { Note } from './note.model';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../errors/ApiError';
import { Attachment } from '../attachments/attachment.model';

export class NoteService extends GenericService<typeof Note> {
  constructor() {
    super(Note);
  }

  async getById(id: string) {
    const object = await this.model
      .findById(id)
      .select('-__v')
      .populate({
        path: 'attachments',
        select:
          '-uploadedByUserId -updatedAt -projectId -uploaderRole -reactions -__v -attachedToId -attachedToType -_attachmentId',
        // populate: [
        //   {
        //     path: '',
        //     select: '',
        //   },
        // ],
      })
      .populate({
        path: 'createdBy',
        select:
          '-address -fname -lname -email -profileImage -isEmailVerified -isDeleted -isResetPassword -failedLoginAttempts -createdAt -updatedAt -__v', // Exclude unwanted fields from Location model
      });

    // TODO : aro fine tune korte hobe query optimize korte hobe ..
    // FIXME : : must ..
    if (!object) {
      // throw new ApiError(StatusCodes.BAD_REQUEST, 'No file uploaded');
      return null;
    }
    return object;
  }

  // async getProjectByProjectName(projectName: string) {
  //     return this.model.findOne({ projectName });
  // }

  async getAllByDateAndProjectId(projectId: string, date: string) {
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Invalid projectId');
    }
    // const parsedDate = new Date(date);
    // if (isNaN(parsedDate.getTime())) {

    //     throw new ApiError(StatusCodes.NOT_FOUND, 'Invalid date format');
    // }

    // const result =  await Note.find({ projectId : projectId
    //    , createdAt: { $gte: date }
    // });

    // Parse the date string (e.g., '2025-03-03')
    const parsedDate = new Date(date);

    // Check if parsed date is valid
    if (isNaN(parsedDate.getTime())) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Invalid date format');
    }

    // Set start of the day (00:00:00.000)
    const startOfDay = new Date(parsedDate.setHours(0, 0, 0, 0));

    // Set end of the day (23:59:59.999)
    const endOfDay = new Date(parsedDate.setHours(23, 59, 59, 999));

    //🟢 Query Notes with exact date match for the given projectId and date range
    const result = await Note.find({
      projectId: projectId,
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    }).exec();

    console.log('result :: 🔖🔖🔖', result);

    return result;
  }

  async getAllimagesOrDocumentOFnoteOrTaskByDateAndProjectId(
    projectId: string,
    date: string,
    noteOrTaskOrProject: string,
    imageOrDocument: string,
    uploaderRole : string
  ) {
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Invalid projectId');
    }

    // Parse the date string (e.g., '2025-03-03')
    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Invalid date format');
    }

    const startOfDay = new Date(parsedDate.setHours(0, 0, 0, 0));

    const endOfDay = new Date(parsedDate.setHours(23, 59, 59, 999));

    //🟢 Query Notes with exact date match for the given projectId and date range
    const attachments = await Attachment.find({
      attachedToType: noteOrTaskOrProject, // 'note'
      projectId: projectId,
      attachmentType: imageOrDocument, // 'image'
      uploaderRole : uploaderRole,
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    })
      .select(
        '-projectId -updatedAt -__v -attachedToId -note -_attachmentId -attachmentType'
      )
      .exec();

      //////////////////////////////////////////////////////////////////////////////////////////


       // Helper function to extract the date portion (YYYY-MM-DD)

      //  const extractDate = (date) => {
      //   return new Date(date).toISOString().split('T')[0]; // Extract YYYY-MM-DD
      // };

  // Helper function to format date as "Sunday, February 23, 2025"
  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };



  // Group attachments by date
  const groupedByDate = attachments.reduce((acc, attachment) => {
    //const dateKey = extractDate(attachment.createdAt); // Extract YYYY-MM-DD
    const dateKey = formatDate(attachment.createdAt);
    if (!acc[dateKey]) {
      acc[dateKey] = []; // Initialize array for the date
    }
    acc[dateKey].push(attachment); // Add the attachment to the corresponding date
    return acc;
  }, {});

  // console.log('Grouped by Date:', groupedByDate);

  // Transform into the desired output format
  const result = Object.keys(groupedByDate).map((date) => ({
    date: date,
    attachments: groupedByDate[date]
  }));





      //////////////////////////////////////////////////////////////////////////////////////////


    return result;
  }
}
