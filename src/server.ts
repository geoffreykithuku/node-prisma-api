import express from "express";
import router from "./router";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";

export const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(bodyParser.json());

app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

app.use("/api", router);
