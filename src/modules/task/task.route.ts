import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../shared/validateRequest';

import { TaskController } from './task.controller';

// import fileUploadHandler from '../../shared/fileUploadHandler';
// import convertHeicToPngMiddleware from '../../shared/convertHeicToPngMiddleware';
// const UPLOADS_FOLDER = 'uploads/users';
// const upload = fileUploadHandler(UPLOADS_FOLDER);

const router = express.Router();

//info : pagination route must be before the route with params
router.route('/paginate').get(
  auth('projectManager'),
  TaskController.getAllTaskWithPagination
);

router.route('/:noteId').get(
  auth('projectManager'),
  TaskController.getATask
);

router.route('/update/:noteId').put(
  auth('projectManager'),
  // validateRequest(UserValidation.createUserValidationSchema),
  TaskController.updateById
);

router.route('/').get(
  auth('projectManager'),
  TaskController.getAllTask
);

router.route('/create').post(
  auth('projectManager'),
  // validateRequest(UserValidation.createUserValidationSchema),
  TaskController.createTask
);

router.route('/delete/:noteId').delete(
  auth('projectManager'),
  TaskController.deleteById
);

// router.route('/search/:projectName').get(
//   // auth('projectManager'),
//   // validateRequest(UserValidation.createUserValidationSchema),
//   ProjectController.getProjectByProjectName
// );

export const TaskRoutes = router;
