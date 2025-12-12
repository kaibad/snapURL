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
  //findOne() does NOT accept update operators like $inc as its second argument.
  return await UrlShortener.findOneAndUpdate(
    { shortCode: shortCode },
    { $inc: { clickCount: 1 } }
  );
};
