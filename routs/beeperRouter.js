import express from "express";
import { getAllBeepersController, getBeepersByStatusController } from "../controllers/beeperControllers.js";
const router = express.Router();
router.route('/beepers').get(getAllBeepersController);
router.route('/beepers').get(getBeepersByStatusController);
export default router;
