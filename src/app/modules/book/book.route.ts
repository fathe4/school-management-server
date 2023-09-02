import { Roles } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import { BookController } from './book.controller';

const router = express.Router();

router.post('/', auth(Roles.admin), BookController.insertIntoDB);
router.get('/', BookController.getAllFromDB);

export const BookRoutes = router;
