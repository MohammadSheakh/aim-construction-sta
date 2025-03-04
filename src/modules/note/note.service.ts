import mongoose from "mongoose";
import { GenericService } from "../Generic Service/generic.services";
import { Note } from "./note.model";
import { StatusCodes } from "http-status-codes";
import ApiError from "../../errors/ApiError";

export class NoteService extends GenericService<typeof Note> {
    constructor() {
        super(Note);
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
        createdAt: { $gte: startOfDay, $lte: endOfDay }
    }).exec();


        console.log("result :: 🔖🔖🔖", result)

        return result ;
    }
}