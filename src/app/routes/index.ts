import express from 'express';
import { Auth } from '../modules/auth/auth.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: Auth,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
