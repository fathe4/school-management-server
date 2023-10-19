import { Hostel } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { hostelFilterableFields } from './hostel.contants';
import { HostelService } from './hostel.service';

const createHostel = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body, 'createHostel ');
  if (req.user == null || req.user.id == null) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Id not found');
  }
  const result = await HostelService.createHostel(req.body, req.user.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category created successfully',
    data: result,
  });
});

const getHostelByPetTypeId = catchAsync(async (req: Request, res: Response) => {
  const { petTypeId } = req.params;
  const result = await HostelService.getHostelByPetTypeId(petTypeId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Hostel fetched successfully',
    data: result,
  });
});

const getHostelById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await HostelService.getHostelById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Hostel fetched successfully',
    data: result,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await HostelService.updateBook(id, updatedData);

  sendResponse<Hostel>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Hostel updated successfully !',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  console.log(req.query, 'req.query');

  const filters = pick(req.query, hostelFilterableFields);
  const options = pick(req.query, [
    'limit',
    'page',
    'sortBy',
    'sortOrder',
    'size',
  ]);

  const result = await HostelService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Hostel fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await HostelService.deleteBook(id);

  sendResponse<Hostel>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Hostel deleted successfully !',
    data: result,
  });
});

export const HostelController = {
  createHostel,
  getAllFromDB,
  getHostelByPetTypeId,
  getHostelById,
  updateBook,
  deleteBook,
};
