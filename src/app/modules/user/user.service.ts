import { User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { IUser } from './user.interface';

const getAllUsers = async (): Promise<IUser[]> => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
      password: false,
    },
  });
  return result;
};

const getUser = async (id: string): Promise<IUser | null> => {
  const result = await prisma.user.findUnique({ where: { id } });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Not Found');
  }
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<User>
): Promise<IUser | null> => {
  const result = await prisma.user.update({ where: { id }, data: payload });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update user');
  }
  return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await prisma.user.delete({ where: { id } });
  return result;
};

export const UserService = {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
