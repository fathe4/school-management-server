import bcrypt from 'bcrypt';

const isPasswordMatch = async (
  givenPassword: string,
  savedPassword: string
): Promise<boolean | null> => {
  return await bcrypt.compare(givenPassword, savedPassword);
};

export const Utils = { isPasswordMatch };
