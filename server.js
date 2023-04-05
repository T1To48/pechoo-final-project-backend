import express from "express";
import { Socket } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import connectDB from "./config/db.js";
 import userRouter from "./routes/userRouter.js";
// import orderRoute from "./routes/orderRoute.js";

dotenv.config({ path: "./config/config.env" });
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("DB CONNECTED");
});


 app.use("/delivery-app/v1", userRouter);
// app.use("/delivey-app", orderRoute);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    ` ⭐⭐server is running in ${process.env.NODE_ENV} Mode, & made on port ${PORT} ⭐⭐`
  )
);
process.on("unhandledRejection", (err, promise) => {
  console.log(`😡😡 Error: ${err.message} 😡😡`);
  server.close(() => process.exit(1));
});
