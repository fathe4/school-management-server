import express from 'express';
import { ReviewController } from './review.controller';

const router = express.Router();

router.post(
  '/create',
  //   auth(Roles.ADMIN, Roles.SUPER_ADMIN),
  ReviewController.create
);
// router.get('/', CategoryController.getAllCategories);
// router.patch(
//   '/:id',
//   auth(Roles.ADMIN, Roles.SUPER_ADMIN),
//   CategoryController.updateCategory
// );
// router.delete(
//   '/:id',
//   auth(Roles.ADMIN, Roles.SUPER_ADMIN),
//   CategoryController.deleteCategory
// );
// router.get('/:id', CategoryController.getByIdFromDB);

export const ReviewRoutes = router;
