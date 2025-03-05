import mongoose from "mongoose";
import { GenericService } from "../Generic Service/generic.services";
import { Project } from "./project.model";
import ApiError from "../../errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { Attachment } from "../attachments/attachment.model";

export class ProjectService extends GenericService<typeof Project> {
    constructor() {
        super(Project);
    }


    async getAllimagesOrDocumentOFnoteOrTaskByProjectId(
        projectId: string,
        noteOrTaskOrProject: string,
        imageOrDocument: string,
        uploaderRole : string
      ) {
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
          throw new ApiError(StatusCodes.NOT_FOUND, 'Invalid projectId');
        }
    
        //🟢 Query Notes with exact date match for the given projectId and date range
        const result = await Attachment.find({
          //attachedToType: noteOrTaskOrProject, // 'note'
          projectId: projectId,
          attachmentType: imageOrDocument, // 'image'
          uploaderRole : uploaderRole
        })
          .select(
            '-projectId -updatedAt -__v -attachedToId -note -_attachmentId -attachmentType'
          )
          .exec();
    
        console.log('result :: 🔖🔖🔖', result);
    
        return result;
      }
    
    // async getProjectByProjectName(projectName: string) {
    //     return this.model.findOne({ projectName }); 
    // }

}