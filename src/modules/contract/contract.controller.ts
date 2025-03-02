
import { GenericService } from '../Generic Service/generic.services';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import pick from '../../shared/pick';
import { Contract } from './contract.model';
import { ContractService } from './contract.service';

const contractService = new ContractService();

const createContract = catchAsync(async (req, res) => {
  console.log('req.body 🧪', req.body);
  const result = await contractService.create(req.body);

  sendResponse(res, {
    code: StatusCodes.OK,
    data: result,
    message: 'Contract created successfully',
  });
});

const getAContract = catchAsync(async (req, res) => {
  const result = await contractService.getById(req.params.contractId);
  sendResponse(res, {
    code: StatusCodes.OK,
    data: result,
    message: 'Contract retrieved successfully',
  });
});

const getAllContract = catchAsync(async (req, res) => {
  const result = await contractService.getAll();
  sendResponse(res, {
    code: StatusCodes.OK,
    data: result,
    message: 'All Contracts',
  });
});

const getAllContractWithPagination = catchAsync(async (req, res) => {
  const filters = pick(req.query, [ '_id']); // 'projectName',
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);

  const result = await contractService.getAllWithPagination(filters, options);

  sendResponse(res, {
    code: StatusCodes.OK,
    data: result,
    message: 'All Contracts with Pagination',
  });
});

const updateById = catchAsync(async (req, res) => {
  const result = await contractService.updateById(
    req.params.contractId,
    req.body
  );
  sendResponse(res, {
    code: StatusCodes.OK,
    data: result,
    message: 'Contract updated successfully',
  });
});

const deleteById = catchAsync(async (req, res) => {
  await contractService.deleteById(req.params.contractId);
  sendResponse(res, {
    code: StatusCodes.OK,
    message: 'Contract deleted successfully',
  });
});

export const ContractController = {
  createContract,
  getAllContract,
  getAllContractWithPagination,
  getAContract,
  updateById,
  deleteById,
};
