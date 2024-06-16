import express from "express";
import usersRouter from "./users.mjs";
import toursRouter from "./tours.mjs";


const router = express.Router();

//PAKEISTI
router.use("/users", usersRouter);

router.use("/tours", toursRouter);

export default router;
