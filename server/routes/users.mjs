import dotenv from "dotenv";
import express from "express";
import userController from "../controller/usersController.mjs";
import passport from "../strategies/auth.mjs";
import { isUser, isAdmin } from "../middleware/roleCheck.mjs";
import jwt from "jsonwebtoken";

dotenv.config();

const router = express.Router();

router.post('/register', userController.createUser);

router.post(
    '/login',
    passport.authenticate("local", { session: false }),
    isUser,
    (req, res) => {
      const token = jwt.sign(
        { id: req.user.id, name: req.user.username, role: req.user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({ message: "Logged", token });
    },
    userController.login
  );

export default router;