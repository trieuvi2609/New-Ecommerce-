import express from "express";
import { body } from "express-validator";
import User from "../models/user";
import { signup, login } from "../controllers/auth";

const router = express.Router();

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value: string, { req }: any) => {
        return User.findOne({ email: value }).then((userDoc: any) => {
          if (userDoc) {
            return Promise.reject("E-Mail address already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("userName").trim().not().isEmpty(),
  ],
  signup
);

router.post("/login", login);

export default router;
