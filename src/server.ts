import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/seller.route";
import connectDB from "./config/seller.db";
import "../../Seller-MS/src/helper/schedular";

dotenv.config();
const port = process.env.PORT;
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/seller", router);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
