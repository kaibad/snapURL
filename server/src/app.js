import express from "express";
import cors from "cors";
import urlRoutes from "./routes/url.routes.js";
import { redirectFromShortUl } from "./controllers/url.controller.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

// app.use(cors())
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to SnapUrl" });
});

//generate shortcode
app.use("/api/create", urlRoutes);

//redirect to original url
app.get("/:id", redirectFromShortUl);

app.use(errorHandler);

export default app;
