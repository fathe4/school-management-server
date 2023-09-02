import { Roles } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import { CategoryController } from './category.controller';

const router = express.Router();

router.post('/', auth(Roles.admin), CategoryController.insertIntoDB);

export const CategoryRoutes = router;
