import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import {
  adminApiRoutes,
  authApiRoutes,
  listingApiRoutes,
  sharedApiRoutes,
  vendorApiRoutes,
} from "./api/index.js";

dotenv.config();
const port = process.env.PORT || 3002;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS || "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/_auth", authApiRoutes);
app.use("/api/admin", adminApiRoutes);
app.use("/api/shared", sharedApiRoutes);
app.use("/api/vendor", vendorApiRoutes);
app.use("/api/listings", listingApiRoutes);

// health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    message: "api server is running",
  });
});

const server = app.listen(port, () =>
  console.log(`api running on port ${port}`)
);

process.on("SIGTERM", () => {
  server.close((err) => {
    if (err) {
      console.log("api server closing error: ", err);
    }
    console.log("api server closed successfully");
  });
});

process.on("SIGINT", () => {
  server.close((err) => {
    if (err) {
      console.log("api server closing error: ", err);
    }
    console.log("api server closed successfully");
  });
});
