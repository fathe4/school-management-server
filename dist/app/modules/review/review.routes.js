"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("./review.controller");
const router = express_1.default.Router();
router.post('/create', 
//   auth(Roles.ADMIN, Roles.SUPER_ADMIN),
review_controller_1.ReviewController.create);
// router.get('/', CategoryController.getAllCategories);
// router.patch(
//   '/:id',
//   auth(Roles.ADMIN, Roles.SUPER_ADMIN),
//   CategoryController.updateCategory
// );
// router.delete(
//   '/:id',
//   auth(Roles.ADMIN, Roles.SUPER_ADMIN),
//   CategoryController.deleteCategory
// );
// router.get('/:id', CategoryController.getByIdFromDB);
exports.ReviewRoutes = router;
