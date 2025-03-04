import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../shared/validateRequest';
import { ContractController } from './contract.controller';


// import fileUploadHandler from '../../shared/fileUploadHandler';
// import convertHeicToPngMiddleware from '../../shared/convertHeicToPngMiddleware';
// const UPLOADS_FOLDER = 'uploads/users';
// const upload = fileUploadHandler(UPLOADS_FOLDER);

const router = express.Router();

//info : pagination route must be before the route with params
router.route('/paginate').get(
  auth('projectManager'),
  ContractController.getAllContractWithPagination
);

router.route('/:contractId').get(
  auth('projectManager'),
  ContractController.getAContract
);

router.route('/update/:contractId').put(
  auth('projectManager'),
  // validateRequest(UserValidation.createUserValidationSchema),
  ContractController.updateById
);

router.route('/').get(
  auth('projectManager'),
  ContractController.getAllContract
);

router.route('/create').post(
  auth('projectManager'),
  // validateRequest(UserValidation.createUserValidationSchema),
  ContractController.createContract
);

router.route('/delete/:contractId').delete(
  auth('projectManager'),
   ContractController.deleteById
);

// router.route('/search/:projectName').get(
//   // auth('projectManager'),
//   // validateRequest(UserValidation.createUserValidationSchema),
//   ProjectController.getProjectByProjectName
// );

export const ContractRoutes = router;
