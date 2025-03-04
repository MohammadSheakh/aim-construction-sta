
import { GenericService } from '../Generic Service/generic.services';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import pick from '../../shared/pick';
import { DailyLog } from './dailyLog.model';
import { DailyLogService } from './dailyLog.service';

// INFO :  Daily Log is not needed  
// INFO :  We can remove total dailyLog module .. 

const dailyLogService = new DailyLogService();

const createDailyLog = catchAsync(async (req, res) => {
  console.log('req.body 🧪', req.body);
  const result = await dailyLogService.create(req.body);

  sendResponse(res, {
    code: StatusCodes.OK,
    data: result,
    message: 'DailyLog created successfully',
  });
});

const getADailyLog = catchAsync(async (req, res) => {
  const result = await dailyLogService.getById(req.params.dailyLogId);
  sendResponse(res, {
    code: StatusCodes.OK,
    data: result,
    message: 'DailyLog retrieved successfully',
  });
});

const getAllDailyLog = catchAsync(async (req, res) => {
  const result = await dailyLogService.getAll();
  sendResponse(res, {
    code: StatusCodes.OK,
    data: result,
    message: 'All dailyLogs',
  });
});

const getAllDailyLogWithPagination = catchAsync(async (req, res) => {
  const filters = pick(req.query, [ '_id']); // 'projectName ',
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);

  const result = await dailyLogService.getAllWithPagination(filters, options);

  sendResponse(res, {
    code: StatusCodes.OK,
    data: result,
    message: 'All dailyLogs with Pagination',
  });
});

const updateById = catchAsync(async (req, res) => {
  const result = await dailyLogService.updateById(
    req.params.dailyLogId,
    req.body
  );
  sendResponse(res, {
    code: StatusCodes.OK,
    data: result,
    message: 'DailyLog updated successfully',
  });
});

const deleteById = catchAsync(async (req, res) => {
  await dailyLogService.deleteById(req.params.dailyLogId);
  sendResponse(res, {
    code: StatusCodes.OK,
    message: 'DailyLog deleted successfully',
  });
});

export const DailyLogController = {
  createDailyLog,
  getAllDailyLog,
  getAllDailyLogWithPagination,
  getADailyLog,
  updateById,
  deleteById,
};
