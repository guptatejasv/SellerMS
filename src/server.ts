import express from "express";
import dotenv from "dotenv";
import router from "./routes/seller.route";
import connectDB from "./config/seller.db";
// import mongoose from "mongoose";

// import amqp from "amqplib/callback_api";

// const receiveFromQueue = () => {
//   amqp.connect("amqp://localhost", (err, conn) => {
//     if (err) throw err;
//     conn.createChannel((err, channel) => {
//       if (err) throw err;
//       const queue = "myQueue";
//       channel.assertQueue(queue, { durable: false });
//       console.log(` [*] Waiting for messages in ${queue}`);
//       channel.consume(
//         queue,
//         (msg) => {
//           if (msg) {
//             console.log(` [x] Received ${msg.content.toString()}`);
//           }
//         },
//         { noAck: true }
//       );
//     });
//   });
// };

// receiveFromQueue();

dotenv.config();
connectDB();

const port = process.env.PORT;

const app = express();

app.use(express.json());

app.use("/api/v1/seller", router);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
