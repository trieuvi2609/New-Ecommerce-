import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/auth";
import adminRoutes from "./routes/admin";
import mongoose from "mongoose";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import { isAuth } from "./middleware/auth";
import { AuthRequest } from "./types/type";
import { clearImage } from "./utils/common";
import errorHandler from "./middleware/errorHandler";
const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("path", path.resolve("images"));
    cb(null, path.join(__dirname, "images"));
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json());
app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
  }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));

app.options(
  "*",
  cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 })
);

app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));

app.use(isAuth);

app.get("/", (req, res, next) => {
  res.send("Hello");
});
app.use(bodyParser.json());
app.use(authRoutes);
app.use(isAuth, adminRoutes);

app.use(errorHandler);

mongoose
  .connect(
    "mongodb+srv://trieuvi-nodejs:Abc%400337489880@cluster0.2rkw1qz.mongodb.net/ecommerce"
  )
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));
