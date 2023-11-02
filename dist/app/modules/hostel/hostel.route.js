"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HostelRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const hostel_controller_1 = require("./hostel.controller");
const router = express_1.default.Router();
router.post('/create-hostel', (0, auth_1.default)(client_1.Roles.SUPER_ADMIN, client_1.Roles.ADMIN, client_1.Roles.CUSTOMER), hostel_controller_1.HostelController.createHostel);
router.get('/', hostel_controller_1.HostelController.getAllFromDB);
router.get('/:id', hostel_controller_1.HostelController.getHostelById);
router.patch('/:id', (0, auth_1.default)(client_1.Roles.ADMIN), hostel_controller_1.HostelController.updateBook);
router.delete('/:id', (0, auth_1.default)(client_1.Roles.ADMIN, client_1.Roles.SUPER_ADMIN), hostel_controller_1.HostelController.deleteBook);
router.get('/pet-type/:petTypeId/', hostel_controller_1.HostelController.getHostelByPetTypeId);
exports.HostelRoutes = router;
