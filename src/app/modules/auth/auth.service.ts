import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { Utils } from '../../../shared/utils';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const userDetails = await prisma.user.findUnique({ where: { email } });

  if (!userDetails) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    userDetails.password &&
    !(await Utils.isPasswordMatch(password, userDetails.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const { role, id } = userDetails;
  const accessToken = jwtHelpers.createToken(
    { id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { id, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const createUser = async (user: User): Promise<any | null> => {
  const isUserAlreadyExist = await prisma.user.findUnique({
    where: { email: user.email },
  });
  if (isUserAlreadyExist) {
    throw new ApiError(httpStatus.FORBIDDEN, 'user already exist');
  }
  const password = await bcrypt.hash(
    user.password,
    Number(config.bycrypt_salt_rounds)
  );
  const newUser = await prisma.user.create({
    data: { ...user, password },
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
  return newUser;
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { id } = verifiedToken;

  const userDetails = await prisma.user.findUnique(id);
  if (!userDetails) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      id: userDetails.id,
      role: userDetails.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
  createUser,
};
