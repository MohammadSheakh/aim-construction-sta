import { GenericService } from '../Generic Service/generic.services';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import pick from '../../shared/pick';
import { Attachment } from './attachment.model';
import { AttachmentService } from './attachment.service';
import { FolderName } from '../../enums/folderNames';
import { AttachedToType } from './attachment.constant';
import ApiError from '../../errors/ApiError';
import { NoteService } from '../note/note.service';

const attachmentService = new AttachmentService();
const noteService = new NoteService();

//[🚧][🧑‍💻✅][🧪🆗]
const createAttachment = catchAsync(async (req, res) => {
  console.log('req.body from createAttachment 🧪', req.body);

  const { noteOrTaskOrProject } = req.body;
  if(noteOrTaskOrProject !== AttachedToType.note && noteOrTaskOrProject !== AttachedToType.task && noteOrTaskOrProject !== AttachedToType.project)
  {
    throw new ApiError(StatusCodes.NOT_FOUND, 'noteOrTaskOrProject should be note or task or project');
  }
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
              noteOrTaskOrProject
            );
            return attachmenId;
          })
        ))
      );
    }

  // const result = await attachmentService.create(req.body);

  sendResponse(res, {
    code: StatusCodes.OK,
    data: null,
    message: 'Attachment created successfully',
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

//[🚧][🧑‍💻✅][🧪🆗]

const deleteById = catchAsync(async (req, res) => {

  const attachment = await attachmentService.getById(req.params.attachmentId);
  if (!attachment) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Attachment not found');
  }

  console.log('attachment :: 🧪', attachment);

  let results;

  if(req.user.role == attachment.uploaderRole)
  {
    if(attachment.attachedToType == 'project')
      {
        // taile amra just attachment  delete korbo 
        results = await attachmentService.deleteById(req.params.attachmentId);
      }else if (attachment.attachedToType == 'note'){
        const note =  await noteService.getById(attachment.attachedToId);
        note.attachments = note.attachments.filter(attachmentId => attachmentId._id.toString() !== req.params.attachmentId);
        const result =  await noteService.updateById(note._id, note)
        if(result){
          results = await attachmentService.deleteById(req.params.attachmentId);
        }
      }
      // TODO :  task er jonno kaj korte hobe ... 
  }else{
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'You are not authorized to delete this attachment');
  }
  


  // await attachmentService.deleteById(req.params.attachmentId);
  sendResponse(res, {
    code: StatusCodes.OK,
    message: 'Project deleted successfully',
    data : results
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
