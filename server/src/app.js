import express from "express";
import { nanoid } from "nanoid";
import UrlShortener from "./models/urlShortener.model.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to SnapUrl" });
});
app.post("/api/create", (req, res) => {
  const { url } = req.body;
  const shortCode = nanoid(7);
  const shortUrl = new UrlShortener({
    originalUrl: url,
    shortCode: shortCode,
  });
  shortUrl.save();
  res.send(shortCode);
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  const url = await UrlShortener.findOne({ shortCode: id });

  url
    ? res.redirect(url.originalUrl)
    : res.status(404).json({ message: "Not Found" });
});

export default app;
