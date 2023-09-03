"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.get('/profile', (0, auth_1.default)(client_1.Roles.customer, client_1.Roles.admin), user_controller_1.UserController.getMyProfile);
router.patch('/profile', (0, auth_1.default)(client_1.Roles.customer, client_1.Roles.admin), user_controller_1.UserController.updateMyProfile);
router.get('/:id', (0, auth_1.default)(client_1.Roles.admin), user_controller_1.UserController.getUser);
router.delete('/:id', (0, auth_1.default)(client_1.Roles.admin), user_controller_1.UserController.deleteUser);
router.patch('/:id', (0, auth_1.default)(client_1.Roles.admin), user_controller_1.UserController.updateUser);
router.get('/', (0, auth_1.default)(client_1.Roles.admin), user_controller_1.UserController.getAllUsers);
exports.UserRoutes = router;
