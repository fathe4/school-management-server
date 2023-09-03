import { Roles } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import { UserController } from './user.controller';
const router = express.Router();

router.get('/my-profile', auth(Roles.customer), UserController.getMyProfile);
router.patch(
  '/my-profile',
  auth(Roles.customer),
  UserController.updateMyProfile
);
router.get('/:id', auth(Roles.admin), UserController.getUser);
router.delete('/:id', auth(Roles.admin), UserController.deleteUser);
router.patch('/:id', auth(Roles.admin), UserController.updateUser);
router.get('/', auth(Roles.admin), UserController.getAllUsers);

export const UserRoutes = router;
