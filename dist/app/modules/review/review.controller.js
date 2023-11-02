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
exports.ReviewController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const review_service_1 = require("./review.service");
const create = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_service_1.ReviewService.create(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Review added successfully',
        data: result,
    });
}));
// const getAllCategories = catchAsync(async (req: Request, res: Response) => {
//   const result = await CategoryService.getAllCategories();
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Category fetched successfully',
//     data: result,
//   });
// });
// const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await CategoryService.getByIdFromDB(id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Category fetched successfully',
//     data: result,
//   });
// });
// const deleteCategory = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await CategoryService.deleteCategory(id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Category deleted successfully',
//     data: result,
//   });
// });
// const updateCategory = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const updatedData = req.body;
//   const result = await CategoryService.updateCategory(id, updatedData);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'category updated successfully',
//     data: result,
//   });
// });
exports.ReviewController = {
    create,
    //   getAllCategories,
    //   getByIdFromDB,
    //   deleteCategory,
    //   updateCategory,
};
