/* eslint-disable no-unused-vars */

export type IUser = {
  id: string;
  name: string;
  role: string;
  contactNo: string;
  address: string;
  profileImg: string;
};

export type ILoginUser = {
  email: number;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
