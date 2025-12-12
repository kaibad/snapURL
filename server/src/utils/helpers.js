import { nanoid } from "nanoid";

export const generateShortCode = (length) => {
  return nanoid(length);
};
