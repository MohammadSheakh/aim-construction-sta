import { GenericService } from "../Generic Service/generic.services";
import { Task } from "./task.model";

export class TaskService extends GenericService<typeof Task> {
    constructor() {
        super(Task);
    }
    
}