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
exports.HostelController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const hostel_contants_1 = require("./hostel.contants");
const hostel_service_1 = require("./hostel.service");
const createHostel = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body, 'createHostel ');
    if (req.user == null || req.user.id == null) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Id not found');
    }
    const result = yield hostel_service_1.HostelService.createHostel(req.body, req.user.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Category created successfully',
        data: result,
    });
}));
const getHostelByPetTypeId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { petTypeId } = req.params;
    const result = yield hostel_service_1.HostelService.getHostelByPetTypeId(petTypeId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Hostel fetched successfully',
        data: result,
    });
}));
const getHostelById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield hostel_service_1.HostelService.getHostelById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Hostel fetched successfully',
        data: result,
    });
}));
const updateBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield hostel_service_1.HostelService.updateBook(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Hostel updated successfully !',
        data: result,
    });
}));
const getAllFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query, 'req.query');
    const filters = (0, pick_1.default)(req.query, hostel_contants_1.hostelFilterableFields);
    const options = (0, pick_1.default)(req.query, [
        'limit',
        'page',
        'sortBy',
        'sortOrder',
        'size',
    ]);
    const result = yield hostel_service_1.HostelService.getAllFromDB(filters, options);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Hostel fetched successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const deleteBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield hostel_service_1.HostelService.deleteBook(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Hostel deleted successfully !',
        data: result,
    });
}));
exports.HostelController = {
    createHostel,
    getAllFromDB,
    getHostelByPetTypeId,
    getHostelById,
    updateBook,
    deleteBook,
};
