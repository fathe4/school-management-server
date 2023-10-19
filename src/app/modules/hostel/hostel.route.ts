import { Roles } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import { HostelController } from './hostel.controller';

const router = express.Router();

router.post(
  '/create-hostel',
  auth(Roles.SUPER_ADMIN, Roles.ADMIN, Roles.CUSTOMER),
  HostelController.createHostel
);
router.get('/', HostelController.getAllFromDB);
router.get('/:id', HostelController.getHostelById);
router.patch('/:id', auth(Roles.ADMIN), HostelController.updateBook);
router.delete(
  '/:id',
  auth(Roles.ADMIN, Roles.SUPER_ADMIN),
  HostelController.deleteBook
);
router.get('/pet-type/:petTypeId/', HostelController.getHostelByPetTypeId);

export const HostelRoutes = router;
