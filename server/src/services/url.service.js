import { createShortUrlDao } from "../daos/url.dao.js";
import { generateShortCode } from "../utils/helpers.js";

export const createShortUrlServicewithoutUser = async (url) => {
  const shortCode = generateShortCode(7);
  await createShortUrlDao(shortCode, url);

  return shortCode;
};

export const createShortUrlServiceWithUser = async (url, userId) => {
  const shortCode = generateShortCode(7);
  await createShortUrlDao(shortCode, url, userId);

  return shortCode;
};
