import UrlShortener from "../models/urlShortener.model.js";

export const createShortUrlDao = async (shortUrlCode, longUrl, userId) => {
  try {
    const shortUrl = new UrlShortener({
      originalUrl: longUrl,
      shortCode: shortUrlCode,
    });

    if (userId) {
      shortUrl.user_id = userId;
    }

    await shortUrl.save();

    return shortUrl;
  } catch (error) {
    console.error("Failed to save URL.");
  }
};

export const getShortCode = async (shortCode) => {
  return await UrlShortener.findOne({ shortCode: shortCode });
};
