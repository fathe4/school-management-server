import { Roles } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import { CategoryController } from './category.controller';

const router = express.Router();

router.post('/', auth(Roles.admin), CategoryController.insertIntoDB);
router.get('/', CategoryController.getAllCategories);
router.get('/:id', CategoryController.getByIdFromDB);

export const CategoryRoutes = router;
