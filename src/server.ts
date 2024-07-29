import express from "express";
import dotenv from "dotenv";
import router from "./routes/seller.route";
import connectDB from "./config/seller.db";
// import mongoose from "mongoose";

dotenv.config();
connectDB();

const port = process.env.PORT;

const app = express();

app.use(express.json());

app.use("/api/v1/seller", router);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
