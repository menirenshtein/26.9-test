import express from "express";
import { getAllBeepersController, getBeepersByStatusController, createBeeperController, getBeeperByIdController } from "../controllers/beeperControllers.js";
const router = express.Router();
router.route('/beepers').get(getAllBeepersController);
router.route('/beepers/status/:status').get(getBeepersByStatusController);
router.route('/beepers/:id').get(getBeeperByIdController);
router.route('/beepers').post(createBeeperController);
export default router;
