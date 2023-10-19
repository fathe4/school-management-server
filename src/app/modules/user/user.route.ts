import { Roles } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import { UserController } from './user.controller';
const router = express.Router();

router.get(
  '/profile',
  auth(Roles.CUSTOMER, Roles.ADMIN, Roles.SUPER_ADMIN),
  UserController.getMyProfile
);
router.patch(
  '/profile',
  auth(Roles.CUSTOMER, Roles.ADMIN, Roles.SUPER_ADMIN),
  UserController.updateMyProfile
);
router.get('/:id', auth(Roles.SUPER_ADMIN), UserController.getUser);
router.delete('/:id', auth(Roles.SUPER_ADMIN), UserController.deleteUser);
router.patch('/:id', auth(Roles.SUPER_ADMIN), UserController.updateUser);
router.get('/', auth(Roles.SUPER_ADMIN), UserController.getAllUsers);

export const UserRoutes = router;
