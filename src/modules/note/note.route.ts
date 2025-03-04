import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../shared/validateRequest';
import { NoteController } from './note.controller';
///////////////////////////////////////
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// import fileUploadHandler from '../../shared/fileUploadHandler';
// import convertHeicToPngMiddleware from '../../shared/convertHeicToPngMiddleware';
// const UPLOADS_FOLDER = 'uploads/users';
// const upload = fileUploadHandler(UPLOADS_FOLDER);

const router = express.Router();



//info : pagination route must be before the route with params
router.route('/paginate').get(
  auth('common'),
  NoteController.getAllNoteWithPagination
);



router.route('/:noteId').get(
  auth('common'),
  NoteController.getANote
);

router.route('/update/:noteId').put(
  auth('projectManager'),
  // validateRequest(UserValidation.createUserValidationSchema),
  NoteController.updateById
);

router.route('/').get(
  auth('common'),
  NoteController.getAllNote
);

//[🚧][🧑‍💻✅][🧪🆗] //  
router.route('/create').post(
  [
    upload.fields([
      { name: "attachments", maxCount: 15 }, // Allow up to 5 cover photos
    ]),
  ],
  auth('common'), // INFO :  but eta only superVisor er create korar kotha 
  // validateRequest(UserValidation.createUserValidationSchema),
  // TODO : attachment upload handle kora lagbe 
  NoteController.createNote
);



router.route('/delete/:noteId').delete(
  auth('common'),
  NoteController.deleteById
);

// router.route('/search/:projectName').get(
//   // auth('projectManager'),
//   // validateRequest(UserValidation.createUserValidationSchema),
//   ProjectController.getProjectByProjectName
// );

//////////////////////////////////////////////////////
//[🚧][🧑‍💻✅][🧪🆗]
router.route('/getAllByDateAndProjectId/:projectId/:date').get(
   auth('common'),
  NoteController.getAllByDateAndProjectId
);

export const NoteRoutes = router;
