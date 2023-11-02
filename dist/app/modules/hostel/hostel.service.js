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
exports.HostelService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const hostel_contants_1 = require("./hostel.contants");
const createHostel = (data, ownerId) => __awaiter(void 0, void 0, void 0, function* () {
    data.ownerId = ownerId;
    const result = yield prisma_1.default.hostel.create({
        data,
        include: {
            petType: true,
            owner: true,
        },
    });
    return result;
});
const getHostelByPetTypeId = (petTypeId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.hostel.findMany({
        where: {
            petType: {
                id: petTypeId,
            },
        },
        include: {
            petType: true,
            owner: true,
        },
    });
    return {
        meta: {
            total: result.length,
            page: 1,
            size: result.length,
            totalPage: 1,
        },
        data: result,
    };
});
const getHostelById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.hostel.findUnique({
        where: {
            id,
        },
        include: {
            owner: true,
            petType: true,
        },
    });
    return result;
});
const getAllFromDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, skip, size } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { search, minPrice, maxPrice, rating, ownerId, category, locationValue, } = filters;
    const andConditions = [];
    if (search) {
        andConditions.push({
            OR: hostel_contants_1.hostelSearchableFields.map(field => ({
                [field]: {
                    contains: search,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (minPrice && maxPrice) {
        andConditions.push({
            AND: {
                price: {
                    gte: parseInt(minPrice),
                    lte: parseInt(maxPrice),
                },
            },
        });
    }
    if (rating) {
        andConditions.push({
            AND: {
                reviews: {
                    some: {
                        rating: {
                            gte: parseInt(rating),
                        },
                    },
                },
            },
        });
    }
    if (locationValue) {
        andConditions.push({
            AND: {
                locationValue,
            },
        });
    }
    if (category) {
        andConditions.push({
            AND: {
                petTypeId: category,
            },
        });
    }
    if (ownerId) {
        andConditions.push({
            AND: {
                ownerId: ownerId,
            },
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.hostel.findMany({
        include: {
            petType: true,
            owner: true,
            reviews: true,
        },
        where: whereConditions,
        skip,
        take: size,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {},
    });
    const total = yield prisma_1.default.hostel.count();
    const totalPage = Math.ceil(total / size);
    return {
        meta: {
            total,
            page,
            size,
            totalPage,
        },
        data: result,
    };
});
const updateBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.hostel.update({ where: { id }, data: payload });
    return result;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.booking.deleteMany({ where: { hostelId: id } });
    const result = yield prisma_1.default.hostel.delete({ where: { id } });
    return result;
});
exports.HostelService = {
    createHostel,
    getAllFromDB,
    getHostelByPetTypeId,
    getHostelById,
    updateBook,
    deleteBook,
};
