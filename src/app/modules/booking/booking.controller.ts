import { Booking } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookingService } from './booking.service';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  if (req.user == null || req.user.id == null) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Id not found');
  }
  const result = await BookingService.createBooking({
    ...req.body,
    userId: req.user.id,
  });

  sendResponse<Booking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking Created successfully !',
    data: result,
  });
});

const getBookings = catchAsync(async (req: Request, res: Response) => {
  if (req.user == null || req.user.id == null) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Id not found');
  }
  const result = await BookingService.getBookings(req?.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully !',
    data: result,
  });
});

const getBooking = catchAsync(async (req: Request, res: Response) => {
  const { bookingId } = req.params;
  const result = await BookingService.getBooking(
    req?.user as JwtPayload,
    bookingId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieved successfully !',
    data: result,
  });
});

const updateBooking = catchAsync(async (req: Request, res: Response) => {
  if (req.user == null || req.user.id == null) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Id not found');
  }
  const { bookingId } = req.params;
  const result = await BookingService.updateBooking(
    req?.user?.id as JwtPayload,
    bookingId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking updated successfully !',
    data: result,
  });
});
const deleteBooking = catchAsync(async (req: Request, res: Response) => {
  const { bookingId } = req.params;
  const result = await BookingService.deleteBooking(bookingId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking updated successfully !',
    data: result,
  });
});

export const BookingController = {
  createBooking,
  getBooking,
  getBookings,
  updateBooking,
  deleteBooking,
};
