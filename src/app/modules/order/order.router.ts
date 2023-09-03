import { Roles } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import { OrderController } from './order.controller';

const router = express.Router();

router.post('/', auth(Roles.admin), OrderController.createOrder);
router.get('/', auth(Roles.admin), OrderController.getOrders);

export const OrderRoutes = router;
