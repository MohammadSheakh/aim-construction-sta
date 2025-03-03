import { GenericService } from '../../Generic Service/generic.services';
import { IAboutUs } from './aboutUs.interface';
import AboutUs from './aboutUs.model';


//[🚧][🧑‍💻✅][🧪] // 🆗 


export class AboutUsService extends GenericService<typeof AboutUs> {
    constructor() {
        super(AboutUs);
    }
    
    // FIx korte hobe  about us service 

    // async getProjectByProjectName(projectName: string) {
    //     return this.model.findOne({ projectName }); 
    // }
}





/*

// Create or Update only one "About Us" entry
const createOrUpdateAboutUs = async (payload: Partial<IAboutUs>) => {
  const existingAboutUs = await AboutUs.findOne();

  if (existingAboutUs) {
    existingAboutUs.set(payload);
    await existingAboutUs.save();
    return existingAboutUs;
  } else {
    const newAboutUs = await AboutUs.create(payload);
    return newAboutUs;
  }
};

const getAboutUs = async () => {
  const aboutUs = await AboutUs.findOne().sort({ createdAt: -1 }); 
  return aboutUs;
};

export const AboutUsService = {
  createOrUpdateAboutUs,
  getAboutUs,
};


*/