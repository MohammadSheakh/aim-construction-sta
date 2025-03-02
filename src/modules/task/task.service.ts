import { GenericService } from "../Generic Service/generic.services";
import { Task } from "./task.model";

export class TaskService extends GenericService<typeof Task> {
    constructor() {
        super(Task);
    }
    
    // async getProjectByProjectName(projectName: string) {
    //     return this.model.findOne({ projectName }); 
    // }
}