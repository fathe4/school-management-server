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
exports.ReviewService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.reviewAndRating.create({
        data,
    });
    return result;
});
// const getAllCategories = async (): Promise<Category[]> => {
//   const result = await prisma.category.findMany();
//   return result;
// };
// const getByIdFromDB = async (id: string): Promise<Category | null> => {
//   const result = await prisma.category.findUnique({
//     where: {
//       id,
//     },
//     include: {
//       hostels: true,
//     },
//   });
//   return result;
// };
// const updateCategory = async (
//   id: string,
//   payload: Partial<Category>
// ): Promise<Category | null> => {
//   const result = await prisma.category.update({
//     where: {
//       id,
//     },
//     data: payload,
//   });
//   return result;
// };
// const deleteCategory = async (id: string): Promise<Category | null> => {
//   const result = await prisma.category.delete({ where: { id } });
//   return result;
// };
exports.ReviewService = {
    create,
    //   getAllCategories,
    //   updateCategory,
    //   getByIdFromDB,
    //   deleteCategory,
};
