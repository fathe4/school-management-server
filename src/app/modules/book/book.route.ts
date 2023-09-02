import { Roles } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import { BookController } from './book.controller';

const router = express.Router();

router.post('/', auth(Roles.admin), BookController.insertIntoDB);
router.get('/', BookController.getAllFromDB);
router.get('/:id', BookController.getBookById);
router.patch('/:id', auth(Roles.admin), BookController.updateBook);
router.delete('/:id', auth(Roles.admin), BookController.deleteBook);
router.get('/:categoryId/category', BookController.getBookByCategoryId);

export const BookRoutes = router;
