import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import { config } from "./config/dotenv.config";

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(config.port, () => {
  console.log(`Server is running at http://localhost:${config.port}`);
});
