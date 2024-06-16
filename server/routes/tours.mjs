import toursController from "../controller/toursController.mjs";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const router = express.Router();

router.post('/create', toursController.createTour);
router.patch('/update/:id', toursController.updateTour);
router.delete('/:id', toursController.deleteTour);

export default router;