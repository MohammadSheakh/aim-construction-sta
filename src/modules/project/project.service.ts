import { GenericService } from "../Generic Service/generic.services";
import { Project } from "./project.model";

export class ProjectService extends GenericService<typeof Project> {
    constructor() {
        super(Project);
    }
    
    // async getProjectByProjectName(projectName: string) {
    //     return this.model.findOne({ projectName }); 
    // }

}