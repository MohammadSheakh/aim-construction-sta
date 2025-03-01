import express from 'express';
// import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../shared/validateRequest';
// import { UserValidation } from './user.validation';
import fileUploadHandler from '../../shared/fileUploadHandler';
import convertHeicToPngMiddleware from '../../shared/convertHeicToPngMiddleware';
import { ProjectController } from './project.controller';
const UPLOADS_FOLDER = 'uploads/users';
const upload = fileUploadHandler(UPLOADS_FOLDER);

const router = express.Router();

// router.route("/").get(
//     auth('projectManager'),
//     // validateRequest(UserValidation.createUserValidationSchema),
//     ProjectController.getAllProject
// )

router.route("/:projectId").get(
    auth('projectManager'),
    // validateRequest(UserValidation.createUserValidationSchema),
    ProjectController.getAProject
)


router.route("/paginate").get(
    auth('projectManager'),
    // validateRequest(UserValidation.createUserValidationSchema),
    ProjectController.getAllProjectWithPagination
)

router.route("/create").post(
    auth('projectManager'),
    // validateRequest(UserValidation.createUserValidationSchema),
    ProjectController.createProject
)

// router.route("/update/:projectId").put(
//     auth('projectManager'),
//     // validateRequest(UserValidation.createUserValidationSchema),
//     ProjectController.updateById
// )

// router.route("/delete/:projectId").delete(
//     auth('projectManager'),
//     // validateRequest(UserValidation.createUserValidationSchema),
//     ProjectController.deleteById
// )


export const ProjectRoutes = router;
