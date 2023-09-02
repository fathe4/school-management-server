import { Book, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  bookRelationalFields,
  bookRelationalFieldsMapper,
  bookSearchableFields,
} from './book.contants';
import { IBookFilterRequest } from './book.interface';

const insertIntoDB = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });

  return result;
};

const getBookByCategoryId = async (categoryId: string): Promise<Book[]> => {
  const result = await prisma.book.findMany({
    where: {
      categoryId,
    },
    include: {
      category: true,
      author: true,
    },
  });

  return result;
};

const getBookById = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
      author: true,
    },
  });

  return result;
};

const getAllFromDB = async (
  filters: IBookFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { page, skip, size } = paginationHelpers.calculatePagination(options);
  const { search, ...filterData } = filters;

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: bookSearchableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (bookRelationalFields.includes(key)) {
          return {
            [bookRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    include: {
      category: true,
      author: true,
    },
    where: whereConditions,
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            publicationDate: 'desc',
          },
  });
  const total = await prisma.book.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit: size,
    },
    data: result,
  };
};

const updateBook = async (
  id: string,
  payload: Partial<Book>
): Promise<Book | null> => {
  const result = await prisma.book.update({ where: { id }, data: payload });

  return result;
};

const deleteBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.delete({ where: { id } });
  return result;
};

export const BookService = {
  insertIntoDB,
  getAllFromDB,
  getBookByCategoryId,
  getBookById,
  updateBook,
  deleteBook,
};
