import express from "express";
import { body } from "express-validator";
import User from "../models/user";
import { addProducts, getProductsAdmin } from "../controllers/admin";

const router = express.Router();

router.get(
  "/admin/products",
  getProductsAdmin
);
router.post("/admin/create-product", addProducts)

export default router;
