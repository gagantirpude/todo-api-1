//* Import
import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routers/userRoute.js";
import taskRouter from "./routers/taskRoute.js";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

//* server
const app = express();

config({
  path: "./data/config.env",
});

//* Middleware
app.use(express.json());
app.use(cookieParser());

// Configure CORS options with custom headers
const corsOptions = {
  // origin: 'http://example.com',
  origin: [process.env.FRONTEND_URL], // Specify the allowed origin(s)
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Specify the allowed HTTP methods
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: "Content-Type,Authorization", // Specify the allowed custom headers
  credentials: true,
};

// Enable CORS with custom options
app.use(cors(corsOptions));

//* Router
app.use("/api/v1/users", userRouter); //Router Precept
app.use("/api/v1/tasks", taskRouter); //Router Precept

//* Using Error Handler Middleware
app.use(errorMiddleware);

//* Route
app.get("/", (req, res) => {
  res.send("Root Directory");
});

//* Export
export default app;

// app.use(
//   cors({
//     origin: [process.env.FRONTEND_URL],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );
