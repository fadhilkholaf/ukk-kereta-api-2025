import { compareSync, hashSync } from "bcryptjs";

export const hash = (password: string) => {
  return hashSync(password);
};

export const compareHash = (password: string, hashedPassword: string) => {
  return compareSync(password, hashedPassword);
};
