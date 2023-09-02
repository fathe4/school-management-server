export const bookFilterableFields: string[] = [
  'search',
  'id',
  'genre',
  'price',
  'minPrice',
  'maxPrice',
  'categoryId',
];

export const bookSearchableFields: string[] = ['title', 'genre'];

export const bookRelationalFields: string[] = ['categoryId', 'authorId'];
export const bookRelationalFieldsMapper: {
  [key: string]: string;
} = {
  categoryId: 'category',
  authorId: 'author',
};
