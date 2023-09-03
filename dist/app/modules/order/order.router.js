"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(client_1.Roles.customer), order_controller_1.OrderController.createOrder);
router.get('/', (0, auth_1.default)(client_1.Roles.admin, client_1.Roles.customer), order_controller_1.OrderController.getOrders);
router.get('/:orderId', (0, auth_1.default)(client_1.Roles.admin, client_1.Roles.customer), order_controller_1.OrderController.getOrder);
exports.OrderRoutes = router;
