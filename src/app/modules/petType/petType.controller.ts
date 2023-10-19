import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { PetTypeService } from './petType.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await PetTypeService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Pet Type created successfully',
    data: result,
  });
});

const getAllPetTypes = catchAsync(async (req: Request, res: Response) => {
  const result = await PetTypeService.getAllPetTypes();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Pet Type fetched successfully',
    data: result,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PetTypeService.getByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Pet Type fetched successfully',
    data: result,
  });
});

const deletePetTypes = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PetTypeService.deletePetType(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Pet Type deleted successfully',
    data: result,
  });
});

const updatePetTypes = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await PetTypeService.updatePetType(id, updatedData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Pet Type updated successfully',
    data: result,
  });
});

export const PetTypeController = {
  insertIntoDB,
  getAllPetTypes,
  getByIdFromDB,
  deletePetTypes,
  updatePetTypes,
};
