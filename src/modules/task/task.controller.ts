
import { GenericService } from '../Generic Service/generic.services';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import pick from '../../shared/pick';
import { Task } from './task.model';
import { TaskService } from './task.service';

const taskService = new TaskService();

const createTask = catchAsync(async (req, res) => {
  console.log('req.body 🧪', req.body);
  const result = await taskService.create(req.body);

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

const deleteById = catchAsync(async (req, res) => {
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
