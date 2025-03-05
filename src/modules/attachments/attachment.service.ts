//[🚧][🧑‍💻✅][🧪] // 🆗 

import { StatusCodes } from "http-status-codes";
import ApiError from "../../errors/ApiError";
import { GenericService } from "../Generic Service/generic.services";
import { Attachment } from "./attachment.model";
import {uploadFileToSpace}  from "../../middlewares/digitalOcean";
import { AttachmentType } from "./attachment.constant";

export class AttachmentService extends GenericService<typeof Attachment> {
    constructor() {
        super(Attachment);
    }
    
    // async uploadSingleAttachment(file: Express.Multer.File, folderName: string) {
    //   return await uploadFileToSpace(file, folderName); 
    // }


    async uploadSingleAttachment(file: Express.Multer.File, folderName: string, projectId : any, user: any, attachedToType:any ) {
      let uploadedFileUrl =  await uploadFileToSpace(file, folderName);

      console.log("user 🔖🔖", user)

      // console.log(file)

      let fileType;
      if(file.mimetype.includes("image"))
      {
          fileType = AttachmentType.image
      }else if(file.mimetype.includes("application"))
      {
          fileType = AttachmentType.document 
      }
      
      // ekhon amader ke ekta attachment create korte hobe .. 
      return await this.create({
        attachment : uploadedFileUrl,
        attachmentType : fileType,
        // attachedToId : "", 
        // attachedToType : "",
        attachedToType : attachedToType,
        projectId : projectId,
        uploadedByUserId : user.userId,
        uploaderRole : user.role,
      });
    }

    // INFO : multiple file upload korar case e .. controller thekei korte hobe .. loop chalate hobe 
    // async uploadMultipleAttachments() {
    // }

    async deleteAttachment(string: string){
        try {
            await deleteFileFromSpace(string);
           
           } catch (error) {
             // Error handling for file deletion or DB deletion failure
             console.error("Error during file deletion:", error);
             throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to delete image");
             // TODO : kon image delete kortesi shetar hint dite hobe .. 
             // FIXME 
           }
    }
}