import express from "express";
import router from "./router";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
export const app = express();
import { protect } from "./utils/auth";
app.use(morgan("dev"));
app.use(
  cors({
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compression());
app.use(bodyParser.json());

app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

app.use("/api", protect, router);
