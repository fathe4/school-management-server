import { Booking, Roles } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createBooking = async (data: Booking): Promise<Booking | null> => {
  const { checkIn, checkOut, ...rest } = data;

  const hostel = await prisma.hostel.findUnique({
    where: {
      id: data.hostelId,
    },
  });
  if (!hostel) {
    throw new ApiError(httpStatus.NOT_FOUND, 'hostel not found');
  }

  const totalBook = hostel.totalBooked + data.petCount;
  if (totalBook > hostel?.capacity) {
    throw new ApiError(
      httpStatus.NOT_ACCEPTABLE,
      'Can not booked Capacity Exceeded'
    );
  }

  const result = await prisma.booking.create({
    data: {
      ...rest,
      checkIn: new Date(checkIn).toISOString(),
      checkOut: new Date(checkOut).toISOString(),
    },
  });
  await prisma.hostel.update({
    where: {
      id: data.hostelId,
    },
    data: { totalBooked: { increment: data.petCount } },
  });
  return result;
};

const getBookings = async (user: JwtPayload | null) => {
  const userBookings = await prisma.booking.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      hostel: true,
      user: true,
    },
  });

  const allBookings = await prisma.booking.findMany({
    include: {
      hostel: true,
      user: true,
    },
  });
  return user?.role === Roles.CUSTOMER ? userBookings : allBookings;
};

const getBooking = async (
  user: JwtPayload,
  orderId: string
): Promise<Booking | null> => {
  const bookingResult = await prisma.booking.findUnique({
    where: {
      id: orderId,
    },
    include: {
      hostel: true,
    },
  });
  const isUserBooking = bookingResult?.userId == user?.id;
  if (isUserBooking) {
    return bookingResult;
  } else if (user.role === Roles.ADMIN) {
    return bookingResult;
  }
  return null;
};

const updateBooking = async (
  user: JwtPayload,
  bookingId: string,
  payload: Booking
): Promise<Booking | null> => {
  const { petCount, ...rest } = payload;
  const bookingResult = await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      petCount: Number(petCount),
      ...rest,
    },
    include: {
      hostel: true,
      user: true,
    },
  });
  return bookingResult;
};

const deleteBooking = async (bookingId: string): Promise<Booking | null> => {
  const bookingResult = await prisma.booking.delete({
    where: {
      id: bookingId,
    },
  });
  return bookingResult;
};

export const BookingService = {
  createBooking,
  getBookings,
  getBooking,
  updateBooking,
  deleteBooking,
};
