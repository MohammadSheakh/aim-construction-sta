import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../shared/validateRequest';
import { DailyLogController } from './dailyLog.controller';

// INFO :  Daily Log is not needed  
// INFO :  We can remove total dailyLog module .. 


// import fileUploadHandler from '../../shared/fileUploadHandler';
// import convertHeicToPngMiddleware from '../../shared/convertHeicToPngMiddleware';
// const UPLOADS_FOLDER = 'uploads/users';
// const upload = fileUploadHandler(UPLOADS_FOLDER);

const router = express.Router();

//info : pagination route must be before the route with params
router.route('/paginate').get(
  auth('projectManager'),
  // validateRequest(UserValidation.createUserValidationSchema),
  DailyLogController.getAllDailyLogWithPagination
);

router.route('/:dailyLogId').get(
  auth('projectManager'),
  // validateRequest(UserValidation.createUserValidationSchema),
  DailyLogController.getADailyLog
);

router.route('/update/:dailyLogId').put(
  auth('projectManager'),
  // validateRequest(UserValidation.createUserValidationSchema),
  DailyLogController.updateById
);

router.route('/').get(
  auth('projectManager'),
  // validateRequest(UserValidation.createUserValidationSchema),
  DailyLogController.getAllDailyLog
);

router.route('/create').post(
  auth('projectManager'),
  // validateRequest(UserValidation.createUserValidationSchema),
  DailyLogController.createDailyLog
);

router.route('/delete/:dailyLogId').delete(
  auth('projectManager'),
  // validateRequest(UserValidation.createUserValidationSchema),
  DailyLogController.deleteById
);

// router.route('/search/:projectName').get(
//   // auth('projectManager'),
//   // validateRequest(UserValidation.createUserValidationSchema),
//   ProjectController.getProjectByProjectName
// );

export const DailyLogRoutes = router;
