import express from "express";
import UrlShortener from "./models/urlShortener.model.js";
import urlRoutes from "./routes/url.routes.js";
import { redirectFromShortUl } from "./controllers/url.controller.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to SnapUrl" });
});

//generate shortcode
app.use("/api/create", urlRoutes);

//redirect to original url
app.get("/:id", redirectFromShortUl);

export default app;
