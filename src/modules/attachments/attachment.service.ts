//[🚧][🧑‍💻✅][🧪] // 🆗 

import { GenericService } from "../Generic Service/generic.services";
import { Attachment } from "./attachment.model";

export class AttachmentService extends GenericService<typeof Attachment> {
    constructor() {
        super(Attachment);
    }
    
    // async getProjectByProjectName(projectName: string) {
    //     return this.model.findOne({ projectName }); 
    // }

}