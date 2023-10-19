import { Roles } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import { BookingController } from './booking.controller';

const router = express.Router();

router.post(
  '/create',
  auth(Roles.ADMIN, Roles.CUSTOMER, Roles.SUPER_ADMIN),
  BookingController.createBooking
);
router.get(
  '/',
  auth(Roles.ADMIN, Roles.SUPER_ADMIN, Roles.CUSTOMER),
  BookingController.getBookings
);
router.get(
  '/:bookingId',
  auth(Roles.ADMIN, Roles.CUSTOMER, Roles.SUPER_ADMIN),
  BookingController.getBooking
);
router.patch(
  '/:bookingId',
  auth(Roles.ADMIN, Roles.CUSTOMER, Roles.SUPER_ADMIN),
  BookingController.updateBooking
);
router.delete(
  '/:bookingId',
  auth(Roles.ADMIN, Roles.CUSTOMER, Roles.SUPER_ADMIN),
  BookingController.deleteBooking
);

export const BookingRoutes = router;
