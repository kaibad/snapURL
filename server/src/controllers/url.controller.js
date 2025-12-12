import { getShortCode } from "../daos/url.dao.js";
import { createShortUrlServicewithoutUser } from "../services/url.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const createShortUrl = wrapAsync(async (req, res) => {
  const { url } = req.body;
  const shortUrl = await createShortUrlServicewithoutUser(url);
  res.send(process.env.APP_URL + shortUrl);
});

export const redirectFromShortUl = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const url = await getShortCode(id);
  if (!url) throw new Error("Invalid URL");

  url
    ? res.redirect(url.originalUrl)
    : res.status(404).json({ message: "Not Found" });
});
