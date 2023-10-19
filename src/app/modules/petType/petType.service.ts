import { PetType } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: PetType): Promise<PetType> => {
  const result = await prisma.petType.create({
    data,
  });

  return result;
};

const getAllPetTypes = async (): Promise<PetType[]> => {
  const result = await prisma.petType.findMany();
  return result;
};

const getByIdFromDB = async (id: string): Promise<PetType | null> => {
  const result = await prisma.petType.findUnique({
    where: {
      id,
    },
    include: {
      hostels: true,
    },
  });
  return result;
};

const updatePetType = async (
  id: string,
  payload: Partial<PetType>
): Promise<PetType | null> => {
  const result = await prisma.petType.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deletePetType = async (id: string): Promise<PetType | null> => {
  const result = await prisma.petType.delete({ where: { id } });
  return result;
};

export const PetTypeService = {
  insertIntoDB,
  getAllPetTypes,
  updatePetType,
  getByIdFromDB,
  deletePetType,
};
