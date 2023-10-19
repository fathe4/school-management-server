import { Roles } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import { PetTypeController } from './petType.controller';

const router = express.Router();

router.post(
  '/create-pet-type',
  auth(Roles.ADMIN, Roles.SUPER_ADMIN),
  PetTypeController.insertIntoDB
);
router.get('/', PetTypeController.getAllPetTypes);
router.patch(
  '/:id',
  auth(Roles.ADMIN, Roles.SUPER_ADMIN),
  PetTypeController.updatePetTypes
);
router.delete(
  '/:id',
  auth(Roles.ADMIN, Roles.SUPER_ADMIN),
  PetTypeController.deletePetTypes
);
router.get('/:id', PetTypeController.getByIdFromDB);

export const PetTypeRoutes = router;
