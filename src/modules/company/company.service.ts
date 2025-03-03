//[🚧][🧑‍💻✅][🧪] // 🆗 

import { GenericService } from "../Generic Service/generic.services";
import { Company } from "./company.model";


export class AttachmentService extends GenericService<typeof Company> {
    constructor() {
        super(Company);
    }
    
    // async getProjectByProjectName(projectName: string) {
    //     return this.model.findOne({ projectName }); 
    // }

}