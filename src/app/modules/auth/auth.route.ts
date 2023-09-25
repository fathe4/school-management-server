import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();
router.post('/signin', AuthController.loginUser);
router.post('/signup', AuthController.createUser);
router.post('/refresh-token', AuthController.refreshToken);

export const Auth = router;
