import express from "express";
import { body } from "express-validator";
import User from "../models/user";
import { addProducts, getProductsAdmin } from "../controllers/admin";

const router = express.Router();

router.get(
  "/products",
  getProductsAdmin
);
router.post("/create-product", addProducts)

export default router;
