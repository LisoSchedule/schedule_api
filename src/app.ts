import cors from "cors";
import express from "express";
import routes from "./routes";
import env from "./env";
import { setupSwagger } from "./config/providers/swagger-config.provider";

const app = express();

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.set("trust proxy", true);

app.use(express.json());

app.use("/api", routes);

setupSwagger(app);

export default app;
