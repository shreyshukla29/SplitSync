import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import { config } from "./config/dotenv.config";
import userRoutes from "./routes/user.routes";
import { errorHandler } from './middlewares/error.middleware';
const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

app.use(errorHandler);
app.listen(config.port, () => {
  console.log(`Server is running at http://localhost:${config.port}`);
});
