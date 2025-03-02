//[🚧][🧑‍💻✅][🧪] // 🆗 

import { GenericService } from "../Generic Service/generic.services";
import { DailyLog } from "./dailyLog.model";


export class DailyLogService extends GenericService<typeof DailyLog> {
    constructor() {
        super(DailyLog);
    }
    
    // async getProjectByProjectName(projectName: string) {
    //     return this.model.findOne({ projectName }); 
    // }
}