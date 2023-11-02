"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const booking_router_1 = require("../modules/booking/booking.router");
const category_routes_1 = require("../modules/category/category.routes");
const hostel_route_1 = require("../modules/hostel/hostel.route");
const petType_routes_1 = require("../modules/petType/petType.routes");
const review_routes_1 = require("../modules/review/review.routes");
const user_route_1 = require("../modules/user/user.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.Auth,
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/categories',
        route: category_routes_1.CategoryRoutes,
    },
    {
        path: '/pet-types',
        route: petType_routes_1.PetTypeRoutes,
    },
    {
        path: '/reviews',
        route: review_routes_1.ReviewRoutes,
    },
    {
        path: '/hostels',
        route: hostel_route_1.HostelRoutes,
    },
    {
        path: '/bookings',
        route: booking_router_1.BookingRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
