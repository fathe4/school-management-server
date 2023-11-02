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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createBooking = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { checkIn, checkOut } = data, rest = __rest(data, ["checkIn", "checkOut"]);
    const hostel = yield prisma_1.default.hostel.findUnique({
        where: {
            id: data.hostelId,
        },
    });
    if (!hostel) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'hostel not found');
    }
    const totalBook = hostel.totalBooked + data.petCount;
    if (totalBook > (hostel === null || hostel === void 0 ? void 0 : hostel.capacity)) {
        throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'Can not booked Capacity Exceeded');
    }
    const result = yield prisma_1.default.booking.create({
        data: Object.assign(Object.assign({}, rest), { checkIn: new Date(checkIn).toISOString(), checkOut: new Date(checkOut).toISOString() }),
    });
    yield prisma_1.default.hostel.update({
        where: {
            id: data.hostelId,
        },
        data: { totalBooked: { increment: data.petCount } },
    });
    return result;
});
const getBookings = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userBookings = yield prisma_1.default.booking.findMany({
        where: {
            userId: user === null || user === void 0 ? void 0 : user.id,
        },
        include: {
            hostel: true,
            user: true,
        },
    });
    const allBookings = yield prisma_1.default.booking.findMany({
        include: {
            hostel: true,
            user: true,
        },
    });
    return (user === null || user === void 0 ? void 0 : user.role) === client_1.Roles.CUSTOMER ? userBookings : allBookings;
});
const getBooking = (user, orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingResult = yield prisma_1.default.booking.findUnique({
        where: {
            id: orderId,
        },
        include: {
            hostel: true,
        },
    });
    const isUserBooking = (bookingResult === null || bookingResult === void 0 ? void 0 : bookingResult.userId) == (user === null || user === void 0 ? void 0 : user.id);
    if (isUserBooking) {
        return bookingResult;
    }
    else if (user.role === client_1.Roles.ADMIN) {
        return bookingResult;
    }
    return null;
});
const updateBooking = (user, bookingId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { petCount } = payload, rest = __rest(payload, ["petCount"]);
    const bookingResult = yield prisma_1.default.booking.update({
        where: {
            id: bookingId,
        },
        data: Object.assign({ petCount: Number(petCount) }, rest),
        include: {
            hostel: true,
            user: true,
        },
    });
    return bookingResult;
});
const deleteBooking = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingResult = yield prisma_1.default.booking.delete({
        where: {
            id: bookingId,
        },
    });
    return bookingResult;
});
exports.BookingService = {
    createBooking,
    getBookings,
    getBooking,
    updateBooking,
    deleteBooking,
};
