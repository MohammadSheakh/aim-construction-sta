import { Project } from './project.model';
import { GenericService } from '../Generic Service/generic.services';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import pick from '../../shared/pick';
import { ProjectService } from './project.service';

const projectService = new ProjectService();

// const getProjectByProjectName = catchAsync(async (req, res) => {
//   const result = await projectService.getProjectByProjectName(
//     req.params.projectName
//   );
//   sendResponse(res, {
//     code: StatusCodes.OK,
//     data: result,
//     message: 'Project retrieved successfully',
//   });
// });


///////////////////////////////////////////
const createProject = catchAsync(async (req, res) => {
  console.log('req.body 🧪', req.body);
  const result = await projectService.create(req.body);

  sendResponse(res, {
    code: StatusCodes.OK,
    data: result,
    message: 'Project created successfully',
  });
});

const getAProject = catchAsync(async (req, res) => {
  const result = await projectService.getById(req.params.projectId);
  sendResponse(res, {
    code: StatusCodes.OK,
    data: result,
    message: 'Project retrieved successfully',
  });
});

const getAllProject = catchAsync(async (req, res) => {
  const result = await projectService.getAll();
  sendResponse(res, {
    code: StatusCodes.OK,
    data: result,
    message: 'All projects',
  });
});

const getAllProjectWithPagination = catchAsync(async (req, res) => {
  const filters = pick(req.query, ['projectName', '_id']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);

  const result = await projectService.getAllWithPagination(filters, options);

  sendResponse(res, {
    code: StatusCodes.OK,
    data: result,
    message: 'All projects with Pagination',
  });
});

const updateById = catchAsync(async (req, res) => {
  const result = await projectService.updateById(
    req.params.projectId,
    req.body
  );
  sendResponse(res, {
    code: StatusCodes.OK,
    data: result,
    message: 'Project updated successfully',
  });
});

const deleteById = catchAsync(async (req, res) => {
  await projectService.deleteById(req.params.projectId);
  sendResponse(res, {
    code: StatusCodes.OK,
    message: 'Project deleted successfully',
  });
});


///////////////////////////////////////

const getAllimagesOrDocumentOFnoteOrTaskOrProjectByProjectId = catchAsync(
  async (req, res) => {
    console.log(req.query);
    const { projectId, noteOrTaskOrProject, imageOrDocument, uploaderRole } = req.query;
    let result;
    if (projectId) {
      result =
        await projectService.getAllimagesOrDocumentOFnoteOrTaskByProjectId(
          projectId,
          noteOrTaskOrProject,
          imageOrDocument,
          uploaderRole
        );
    }
    sendResponse(res, {
      code: StatusCodes.OK,
      data: result,
      message: 'All notes by date and project id',
    });
  }
);

export const ProjectController = {
  createProject,
  getAllProject,
  getAllProjectWithPagination,
  getAProject,
  updateById,
  deleteById,
  ///////////////////////
  getAllimagesOrDocumentOFnoteOrTaskOrProjectByProjectId
  // getProjectByProjectName
};
