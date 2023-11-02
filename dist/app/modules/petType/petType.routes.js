"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetTypeRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const petType_controller_1 = require("./petType.controller");
const router = express_1.default.Router();
router.post('/create-pet-type', (0, auth_1.default)(client_1.Roles.ADMIN, client_1.Roles.SUPER_ADMIN), petType_controller_1.PetTypeController.insertIntoDB);
router.get('/', petType_controller_1.PetTypeController.getAllPetTypes);
router.patch('/:id', (0, auth_1.default)(client_1.Roles.ADMIN, client_1.Roles.SUPER_ADMIN), petType_controller_1.PetTypeController.updatePetTypes);
router.delete('/:id', (0, auth_1.default)(client_1.Roles.ADMIN, client_1.Roles.SUPER_ADMIN), petType_controller_1.PetTypeController.deletePetTypes);
router.get('/:id', petType_controller_1.PetTypeController.getByIdFromDB);
exports.PetTypeRoutes = router;
