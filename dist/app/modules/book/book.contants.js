"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRelationalFieldsMapper = exports.bookRelationalFields = exports.bookSearchableFields = exports.bookFilterableFields = void 0;
exports.bookFilterableFields = [
    'search',
    'id',
    'genre',
    'price',
    'minPrice',
    'maxPrice',
    'categoryId',
];
exports.bookSearchableFields = ['title', 'genre'];
exports.bookRelationalFields = ['categoryId', 'authorId'];
exports.bookRelationalFieldsMapper = {
    categoryId: 'category',
    authorId: 'author',
};
