import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();
router.post('/login', AuthController.loginUser);
router.post(
  '/signup',
  //   validateRequest(UserValidation.createUserZodSchema),
  AuthController.createUser
);
router.post('/refresh-token', AuthController.refreshToken);

export const Auth = router;
