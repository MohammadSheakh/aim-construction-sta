import { GenericService } from '../Generic Service/generic.services';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import pick from '../../shared/pick';
import { Note } from './note.model';
import { NoteService } from './note.service';
import { AttachmentService } from '../attachments/attachment.service';
import { FolderName } from '../../enums/folderNames';
import { AttachedToType } from '../attachments/attachment.constant';

const noteService = new NoteService();
const attachmentService = new AttachmentService();

//[🚧][🧑‍💻✅][🧪🆗] // working perfectly 
const createNote = catchAsync(async (req, res) => {
  console.log('req.body 🧪', req.body);

  if(req.user.userId){
    req.body.createdBy = req.user.userId;
  }

  req.body.isAccepted = "pending";

  // TODO : attachment upload handle kora lagbe 

  // let attachments = [];

  // if (req.files && req.files.attachments) {
  //   attachments.push(
  //     ...(await Promise.all(
  //       req.files.attachments.map(async (file) => {
  //         const attachmentUrl = await attachmentService.uploadSingleAttachment(file, FolderName.note)
  //         return attachmentUrl;        })
  //     ))
  //   );
  // }

  let attachments = [];

  if (req.files && req.files.attachments) {
    attachments.push(
      ...(await Promise.all(
        req.files.attachments.map(async (file) => {
          const attachmenId = await attachmentService.uploadSingleAttachment(file, FolderName.note , req.body.projectId, req.user)
          return attachmenId;        })
      ))
    );
  }




  // INFO : its useful for update .. 
  // else{
  //   attachments = [...note.attachments]
  // }



  req.body.attachments = attachments;


  const result = await noteService.create(req.body);


  console.log('attachments 🔴result🔴', result);



    // Now loop through the attachments array and update the attachedToId and attachedToType
if (attachments.length > 0) {
  await Promise.all(
    attachments.map(async (attachmentId) => {
      
      // Assuming you have a service or model method to update the attachment's attachedToId and attachedToType
      await attachmentService.updateById(
        attachmentId, // Pass the attachment ID
        {
          attachedToId: result._id,
          attachedToType: AttachedToType.note,
        }
      );
    })
  );
}





  sendResponse(res, {
    code: StatusCodes.OK,
    data: result,
    message: 'Note created successfully',
  });
});

const getANote = catchAsync(async (req, res) => {
  const result = await noteService.getById(req.params.noteId);
  sendResponse(res, {
    code: StatusCodes.OK,
    data: result,
    message: 'Note retrieved successfully',
  });
});

const getAllNote = catchAsync(async (req, res) => {
  const result = await noteService.getAll();
  sendResponse(res, {
    code: StatusCodes.OK,
    data: result,
    message: 'All notes',
  });
});

const getAllNoteWithPagination = catchAsync(async (req, res) => {
  const filters = pick(req.query, ['noteName', '_id']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);

  const result = await noteService.getAllWithPagination(filters, options);

  sendResponse(res, {
    code: StatusCodes.OK,
    data: result,
    message: 'All notes with Pagination',
  });
});

const updateById = catchAsync(async (req, res) => {
  const result = await noteService.updateById(
    req.params.noteId,
    req.body
  );
  sendResponse(res, {
    code: StatusCodes.OK,
    data: result,
    message: 'Note updated successfully',
  });
});

const deleteById = catchAsync(async (req, res) => {
  await noteService.deleteById(req.params.noteId);
  sendResponse(res, {
    code: StatusCodes.OK,
    message: 'Note deleted successfully',
  });
});

/////////////////////////////////

const getAllByDateAndProjectId = catchAsync(async (req, res) => {
  const result = await noteService.getAllByDateAndProjectId(req.params.date, req.params.projectId);
  sendResponse(res, {
    code: StatusCodes.OK,
    data: result,
    message: 'All notes by date and project id',
  });
});

export const NoteController = {
  createNote,
  getAllNote,
  getAllNoteWithPagination,
  getANote,
  updateById,
  deleteById,
  /////////
  getAllByDateAndProjectId
};
