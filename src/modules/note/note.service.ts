import { GenericService } from "../Generic Service/generic.services";
import { Note } from "./note.model";

export class NoteService extends GenericService<typeof Note> {
    constructor() {
        super(Note);
    }
    
    // async getProjectByProjectName(projectName: string) {
    //     return this.model.findOne({ projectName }); 
    // }

    async getAllByDateAndProjectId(projectId: string, date: string) {
        return this.model.find({ projectId
             , createdAt: { $gte: date }
        }); 
    }
}