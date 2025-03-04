//[🚧][🧑‍💻✅][🧪] // 🆗 

import { GenericService } from "../Generic Service/generic.services";
import { DailyLog } from "./dailyLog.model";

// INFO :  Daily Log is not needed  
// INFO :  We can remove total dailyLog module .. 

export class DailyLogService extends GenericService<typeof DailyLog> {
    constructor() {
        super(DailyLog);
    }
    
    // async getProjectByProjectName(projectName: string) {
    //     return this.model.findOne({ projectName }); 
    // }
}