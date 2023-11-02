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
exports.PetTypeService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.petType.create({
        data,
    });
    return result;
});
const getAllPetTypes = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.petType.findMany();
    return result;
});
const getByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.petType.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updatePetType = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.petType.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deletePetType = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.petType.delete({ where: { id } });
    return result;
});
exports.PetTypeService = {
    insertIntoDB,
    getAllPetTypes,
    updatePetType,
    getByIdFromDB,
    deletePetType,
};
