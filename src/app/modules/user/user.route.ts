import { Roles } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import { UserController } from './user.controller';
const router = express.Router();

router.get(
  '/profile',
  auth(Roles.customer, Roles.admin),
  UserController.getMyProfile
);
router.patch(
  '/profile',
  auth(Roles.customer, Roles.admin),
  UserController.updateMyProfile
);
router.get('/:id', auth(Roles.admin), UserController.getUser);
router.delete('/:id', auth(Roles.admin), UserController.deleteUser);
router.patch('/:id', auth(Roles.admin), UserController.updateUser);
router.get('/', auth(Roles.admin), UserController.getAllUsers);

export const UserRoutes = router;
