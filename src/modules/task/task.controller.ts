
import { GenericService } from '../Generic Service/generic.services';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import pick from '../../shared/pick';
import { Task } from './task.model';
import { TaskService } from './task.service';
import { TaskStatus } from './task.constant';
import { AttachmentService } from '../attachments/attachment.service';
import { FolderName } from '../../enums/folderNames';
import { AttachedToType } from '../attachments/attachment.constant';

const taskService = new TaskService();
const attachmentService = new AttachmentService();

//[🚧][🧑‍💻✅][🧪🆗] // working perfectly
const createTask = catchAsync(async (req, res) => {
  
  console.log('req.body 🧪', req.body);

  if (req.user.userId) {
    req.body.createdBy = req.user.userId;
  }

  req.body.task_status = TaskStatus.open;

  let attachments = [];
  
    if (req.files && req.files.attachments) {
      attachments.push(
        ...(await Promise.all(
          req.files.attachments.map(async file => {
            const attachmenId = await attachmentService.uploadSingleAttachment(
              file,
              FolderName.task,
              req.body.projectId,
              req.user,
              AttachedToType.task
            );
            return attachmenId;
          })
        ))
      );
    }

    req.body.attachments = attachments;
  
  const result = await taskService.create(req.body);

// Now loop through the attachments array and update the attachedToId and attachedToType
if (attachments.length > 0) {
  await Promise.all(
    attachments.map(async attachmentId => {
      // Assuming you have a service or model method to update the attachment's attachedToId and attachedToType
      await attachmentService.updateById(
        attachmentId, // Pass the attachment ID
        {
          attachedToId: result._id,
        }
      );
    })
  );
}


  sendResponse(res, {
    code: StatusCodes.OK,
    data: result,
    message: 'Task created successfully',
  });
});

const getATask = catchAsync(async (req, res) => {
  const result = await taskService.getById(req.params.taskId);
  sendResponse(res, {
    code: StatusCodes.OK,
    data: result,
    message: 'Task retrieved successfully',
  });
});

const getAllTask = catchAsync(async (req, res) => {
  const result = await taskService.getAll();
  sendResponse(res, {
    code: StatusCodes.OK,
    data: result,
    message: 'All Tasks',
  });
});

const getAllTaskWithPagination = catchAsync(async (req, res) => {
  const filters = pick(req.query, [ '_id']); // 'projectName',
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);

  const result = await taskService.getAllWithPagination(filters, options);

  sendResponse(res, {
    code: StatusCodes.OK,
    data: result,
    message: 'All tasks with Pagination',
  });
});

const updateById = catchAsync(async (req, res) => {
  const result = await taskService.updateById(
    req.params.taskId,
    req.body
  );
  sendResponse(res, {
    code: StatusCodes.OK,
    data: result,
    message: 'Task updated successfully',
  });
});

//[🚧][🧑‍💻✅][🧪🆗] // working perfectly
const deleteById = catchAsync(async (req, res) => {
  const task = await taskService.getById(req.params.taskId);

  console.log("task 🧪🧪🧪🧪", task)
  if(task){
    if(task.attachments && task.attachments.length > 0){
      await Promise.all(
        task.attachments.map(async (attachmentId) => {
          // ei attachment id ta exist kore kina sheta age check korte hobe 
          let attachment = await attachmentService.getById(attachmentId);
          if(attachment){
            const attachmentDeleteRes = await attachmentService.deleteById(attachmentId);
          }else{
            console.log("attachment not found ...");
          }
        })
    )}
  }
  await taskService.deleteById(req.params.taskId);
  sendResponse(res, {
    code: StatusCodes.OK,
    message: 'Task deleted successfully',
  });
});

export const TaskController = {
  createTask,
  getAllTask,
  getAllTaskWithPagination,
  getATask,
  updateById,
  deleteById,
};
