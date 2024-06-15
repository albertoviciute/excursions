import express from "express";
import usersRouter from "./users.mjs";


const router = express.Router();

//PAKEISTI
router.use("/users", usersRouter);

export default router;
