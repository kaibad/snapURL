import dotenv from "dotenv";
import app from "./src/app.js";

import connectDb from "./src/config/mongo.config.js";

dotenv.config();
const PORT = process.env.PORT;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port http://127.0.0.1:${PORT}`);
  });
});
