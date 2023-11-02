"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const category_controller_1 = require("./category.controller");
const router = express_1.default.Router();
router.post('/create-category', (0, auth_1.default)(client_1.Roles.ADMIN, client_1.Roles.SUPER_ADMIN), category_controller_1.CategoryController.insertIntoDB);
router.get('/', category_controller_1.CategoryController.getAllCategories);
router.patch('/:id', (0, auth_1.default)(client_1.Roles.ADMIN, client_1.Roles.SUPER_ADMIN), category_controller_1.CategoryController.updateCategory);
router.delete('/:id', (0, auth_1.default)(client_1.Roles.ADMIN, client_1.Roles.SUPER_ADMIN), category_controller_1.CategoryController.deleteCategory);
router.get('/:id', category_controller_1.CategoryController.getByIdFromDB);
exports.CategoryRoutes = router;
