import { Roles } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import { OrderController } from './order.controller';

const router = express.Router();

router.post('/', auth(Roles.customer), OrderController.createOrder);
router.get('/', auth(Roles.admin, Roles.customer), OrderController.getOrders);
router.get(
  '/:orderId',
  auth(Roles.admin, Roles.customer),
  OrderController.getOrder
);

export const OrderRoutes = router;
