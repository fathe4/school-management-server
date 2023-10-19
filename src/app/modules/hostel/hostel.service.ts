import { Hostel, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { hostelSearchableFields } from './hostel.contants';
import { IHostelFilterRequest } from './hostel.interface';

const createHostel = async (data: Hostel, ownerId: string): Promise<Hostel> => {
  data.ownerId = ownerId;
  const result = await prisma.hostel.create({
    data,
    include: {
      petType: true,
      owner: true,
    },
  });

  return result;
};

const getHostelByPetTypeId = async (
  petTypeId: string
): Promise<IGenericResponse<Hostel[]>> => {
  const result = await prisma.hostel.findMany({
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
};

const getHostelById = async (id: string): Promise<Hostel | null> => {
  const result = await prisma.hostel.findUnique({
    where: {
      id,
    },
    include: {
      owner: true,
      petType: true,
    },
  });

  return result;
};

const getAllFromDB = async (
  filters: IHostelFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Hostel[]>> => {
  const { page, skip, size } = paginationHelpers.calculatePagination(options);
  const { search, minPrice, maxPrice, rating, petTypeId, ownerId } = filters;

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: hostelSearchableFields.map(field => ({
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
  if (petTypeId) {
    andConditions.push({
      AND: {
        petType: {
          id: petTypeId,
        },
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

  const whereConditions: Prisma.HostelWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.hostel.findMany({
    include: {
      petType: true,
      owner: true,
      reviews: true,
    },
    where: whereConditions,
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {},
  });

  const total = await prisma.hostel.count();

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
};

const updateBook = async (
  id: string,
  payload: Partial<Hostel>
): Promise<Hostel | null> => {
  const result = await prisma.hostel.update({ where: { id }, data: payload });

  return result;
};

const deleteBook = async (id: string): Promise<Hostel | null> => {
  await prisma.booking.deleteMany({ where: { hostelId: id } });
  const result = await prisma.hostel.delete({ where: { id } });
  return result;
};

export const HostelService = {
  createHostel,
  getAllFromDB,
  getHostelByPetTypeId,
  getHostelById,
  updateBook,
  deleteBook,
};
