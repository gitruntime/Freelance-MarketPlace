import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const allowedOrigins = [
  'https://freelance-market-place-shp4.vercel.app',
  'http://localhost:5173',
  'https://freelance-market-place-shp4-git-main-thousi731s-projects.vercel.app',
  'https://freelance-market-place-shp4-r0ec6lx8x-thousi731s-projects.vercel.app',
  'https://freelance-market.vercel.app',
];
app.use(
  cors({
    origin: function (origin, callback) {
      console.log("Origin:", origin); // Log the incoming origin
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);

dotenv.config();
mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
  }
};


app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).send(errorMessage);
});

const PORT = 8800;

//write the code for show the messsage on screen when server is running

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  connect();
  console.log(`Server is running on port ${PORT}`);
});
