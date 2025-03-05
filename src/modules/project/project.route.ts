import express from 'express';
// import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../shared/validateRequest';
// import { UserValidation } from './user.validation';
import fileUploadHandler from '../../shared/fileUploadHandler';
import convertHeicToPngMiddleware from '../../shared/convertHeicToPngMiddleware';
import { ProjectController } from './project.controller';
import { NoteController } from '../note/note.controller';
const UPLOADS_FOLDER = 'uploads/users';
const upload = fileUploadHandler(UPLOADS_FOLDER);

const router = express.Router();

//info : pagination route must be before the route with params
router.route('/paginate').get(
  auth('projectManager'),
  
  ProjectController.getAllProjectWithPagination
);
///////////////////////////////////////////////////////////////////////
router.route('/getAllImagesOfAllNotesOfAProjectId')
  .get(
    auth('common'),
    ProjectController.getAllimagesOrDocumentOFnoteOrTaskOrProjectByProjectId
  );

router.route('/:projectId').get(
  auth('projectManager'),
  ProjectController.getAProject
);

router.route('/update/:projectId').put(
  auth('projectManager'),
  // validateRequest(UserValidation.createUserValidationSchema),
  ProjectController.updateById
);

//[🚧][🧑‍💻✅][🧪] // 🆗 
router.route('/').get(
  auth('projectManager'),
  ProjectController.getAllProject
);

//[🚧][🧑‍💻✅][🧪] // 🆗 
router.route('/create').post(
  [upload.single("projectLogo")],
  auth('projectManager'),
  // validateRequest(UserValidation.createUserValidationSchema),
  ProjectController.createProject
);

router.route('/delete/:projectId').delete(
  auth('projectManager'),
  ProjectController.deleteById
);

////////////////////////////////////////////////////////////////




// router.route('/dailyLog').get(
//   auth('common'),
//   NoteController.getAllDailyLog
// );


// router.route('/search/:projectName').get(
//   // auth('projectManager'),
//   // validateRequest(UserValidation.createUserValidationSchema),
//   ProjectController.getProjectByProjectName
// );

export const ProjectRoutes = router;
