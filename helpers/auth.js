import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};
