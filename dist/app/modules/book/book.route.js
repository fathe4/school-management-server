"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
router.post('/create-book', (0, auth_1.default)(client_1.Roles.admin), book_controller_1.BookController.insertIntoDB);
router.get('/', book_controller_1.BookController.getAllFromDB);
router.get('/:id', book_controller_1.BookController.getBookById);
router.patch('/:id', (0, auth_1.default)(client_1.Roles.admin), book_controller_1.BookController.updateBook);
router.delete('/:id', (0, auth_1.default)(client_1.Roles.admin), book_controller_1.BookController.deleteBook);
router.get('/:categoryId/category', book_controller_1.BookController.getBookByCategoryId);
exports.BookRoutes = router;
