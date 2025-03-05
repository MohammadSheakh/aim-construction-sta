import { GenericService } from '../Generic Service/generic.services';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import pick from '../../shared/pick';
import { Attachment } from './attachment.model';
import { AttachmentService } from './attachment.service';
import { FolderName } from '../../enums/folderNames';
import { AttachedToType } from './attachment.constant';

const attachmentService = new AttachmentService();

const createAttachment = catchAsync(async (req, res) => {
  console.log('req.body 🧪', req.body);

  // if (req.user.userId) {
  //   req.body.createdBy = req.user.userId;
  // }
  let attachments = [];
  
    if (req.files && req.files.attachments) {
      attachments.push(
        ...(await Promise.all(
          req.files.attachments.map(async file => {
            const attachmenId = await attachmentService.uploadSingleAttachment(
              file,
              FolderName.note,
              req.body.projectId,
              req.user,
              AttachedToType.project
            );
            return attachmenId;
          })
        ))
      );
    }


    // req.body.attachments = attachments;



  const result = await attachmentService.create(req.body);

  sendResponse(res, {
    code: StatusCodes.OK,
    data: result,
    message: 'Project created successfully',
  });
});

const getAAttachment = catchAsync(async (req, res) => {
  const result = await attachmentService.getById(req.params.attachmentId);
  sendResponse(res, {
    code: StatusCodes.OK,
    data: result,
    message: 'Project retrieved successfully',
  });
});

const getAllAttachment = catchAsync(async (req, res) => {
  const result = await attachmentService.getAll();
  sendResponse(res, {
    code: StatusCodes.OK,
    data: result,
    message: 'All projects',
  });
});

const getAllAttachmentWithPagination = catchAsync(async (req, res) => {
  const filters = pick(req.query, ['projectName', '_id']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);

  const result = await attachmentService.getAllWithPagination(filters, options);

  sendResponse(res, {
    code: StatusCodes.OK,
    data: result,
    message: 'All projects with Pagination',
  });
});

const updateById = catchAsync(async (req, res) => {
  const result = await attachmentService.updateById(
    req.params.attachmentId,
    req.body
  );
  sendResponse(res, {
    code: StatusCodes.OK,
    data: result,
    message: 'Project updated successfully',
  });
});

const deleteById = catchAsync(async (req, res) => {
  await attachmentService.deleteById(req.params.attachmentId);
  sendResponse(res, {
    code: StatusCodes.OK,
    message: 'Project deleted successfully',
  });
});


/////////////////////////////////////////////


export const AttachmentController = {
  createAttachment,
  getAllAttachment,
  getAllAttachmentWithPagination,
  getAAttachment,
  updateById,
  deleteById,
};
