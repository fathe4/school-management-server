"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hostelRelationalFieldsMapper = exports.hostelRelationalFields = exports.hostelSearchableFields = exports.hostelFilterableFields = void 0;
exports.hostelFilterableFields = [
    'search',
    'petTypeId',
    'category',
    'locationValue',
    'typeName',
    'price',
    'minPrice',
    'maxPrice',
    'ownerId',
    'rating',
];
exports.hostelSearchableFields = ['title', 'locationValue'];
exports.hostelRelationalFields = ['petTypeId', 'ownerId'];
exports.hostelRelationalFieldsMapper = {
    typeName: 'petType',
    ownerId: 'owner',
};
