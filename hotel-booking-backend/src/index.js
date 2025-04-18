import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import adminRoutes from "./routes/adminRoutes.js";
import vendorRoutes from "./routes/vendroRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import authRoutes from "./routes/userAuthRoutes.js";

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
  })
);

// Api Routes
app.use("/api/customer", customerRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/_auth", authRoutes);

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
