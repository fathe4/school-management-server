"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const insertIntoDB = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield prisma_1.default.order.create({
        data: { userId },
    });
    const orderedBooks = data.orderedBooks.map(ord => (Object.assign({ orderId: order.id }, ord)));
    console.log(orderedBooks);
    yield prisma_1.default.orderedBook.createMany({
        data: orderedBooks,
    });
    const newOrder = yield prisma_1.default.order.findUnique({
        where: { id: order.id },
        include: {
            orderedBooks: true,
        },
    });
    return newOrder;
});
const getOrders = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userOrders = yield prisma_1.default.order.findMany({
        where: {
            userId: user === null || user === void 0 ? void 0 : user.id,
        },
        include: {
            orderedBooks: true,
        },
    });
    const allOrders = yield prisma_1.default.order.findMany({
        include: {
            orderedBooks: true,
        },
    });
    return (user === null || user === void 0 ? void 0 : user.role) === client_1.Roles.customer ? userOrders : allOrders;
});
const getOrder = (user, orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const orderResult = yield prisma_1.default.order.findUnique({
        where: {
            id: orderId,
        },
        include: {
            orderedBooks: true,
        },
    });
    const isUserOrder = (orderResult === null || orderResult === void 0 ? void 0 : orderResult.userId) == (user === null || user === void 0 ? void 0 : user.id);
    if (isUserOrder) {
        return orderResult;
    }
    else if (user.role === client_1.Roles.admin) {
        return orderResult;
    }
    return null;
});
exports.OrderService = {
    insertIntoDB,
    getOrders,
    getOrder,
};
