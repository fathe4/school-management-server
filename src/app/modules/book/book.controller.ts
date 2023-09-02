import { Book } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { bookFilterableFields } from './book.contants';
import { BookService } from './book.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category created successfully',
    data: result,
  });
});

const getBookByCategoryId = catchAsync(async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const result = await BookService.getBookByCategoryId(categoryId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books with associated category data fetched successfully',
    data: result,
  });
});

const getBookById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.getBookById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book fetched successfully',
    data: result,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await BookService.updateBook(id, updatedData);

  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully !',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);
  const options = pick(req.query, [
    'limit',
    'page',
    'sortBy',
    'sortOrder',
    'size',
  ]);

  const result = await BookService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookService.deleteBook(id);

  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully !',
    data: result,
  });
});

export const BookController = {
  insertIntoDB,
  getAllFromDB,
  getBookByCategoryId,
  getBookById,
  updateBook,
  deleteBook,
};
