import express from "express";
import dotenv from "dotenv";
import router from "./routes/seller.route";
import connectDB from "./config/seller.db";

dotenv.config();
const port = process.env.PORT;
connectDB();
const app = express();

app.use(express.json());

app.use("/api/v1/seller", router);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
