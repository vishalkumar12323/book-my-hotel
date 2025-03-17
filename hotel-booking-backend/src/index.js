import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/adminRoutes.js";
import vendorRoutes from "./routes/vendroRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import authRoutes from "./routes/userAuthRoutes.js";

dotenv.config();
const port = process.env.PORT || 3002;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS || "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// app.get("/", (req, res) => {});
// Api Routes
app.use("/api", customerRoutes);
app.use("/api", vendorRoutes);
app.use("/api", adminRoutes);
app.use("/api/_auth", authRoutes);

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
