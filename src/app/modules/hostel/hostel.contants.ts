export const hostelFilterableFields: string[] = [
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

export const hostelSearchableFields: string[] = ['title', 'locationValue'];

export const hostelRelationalFields: string[] = ['petTypeId', 'ownerId'];
export const hostelRelationalFieldsMapper: {
  [key: string]: string;
} = {
  typeName: 'petType',
  ownerId: 'owner',
};
