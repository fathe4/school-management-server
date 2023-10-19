import express from 'express';
import { Auth } from '../modules/auth/auth.route';
import { BookingRoutes } from '../modules/booking/booking.router';
import { CategoryRoutes } from '../modules/category/category.routes';
import { HostelRoutes } from '../modules/hostel/hostel.route';
import { PetTypeRoutes } from '../modules/petType/petType.routes';
import { ReviewRoutes } from '../modules/review/review.routes';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: Auth,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/pet-types',
    route: PetTypeRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
  {
    path: '/hostels',
    route: HostelRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
