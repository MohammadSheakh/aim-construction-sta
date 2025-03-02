//[🚧][🧑‍💻✅][🧪] // 🆗 

import { GenericService } from "../Generic Service/generic.services";
import { Contract } from "./contract.model";

export class ContractService extends GenericService<typeof Contract> {
    constructor() {
        super(Contract);
    }
    
    // async getProjectByProjectName(projectName: string) {
    //     return this.model.findOne({ projectName }); 
    // }
}