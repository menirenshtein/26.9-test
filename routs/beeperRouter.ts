import express, { Router } from "express";
import { getAllBeepersController, getBeepersByStatusController, createBeeperController ,updateBeeperStatusController, getBeeperByIdController, updateLocationController} from "../controllers/beeperControllers.js";
const router: Router = express.Router()


router.route('/beepers').get(getAllBeepersController)
router.route('/beepers/status/:status').get(getBeepersByStatusController)
router.route('/beepers/:id').get(getBeeperByIdController)
router.route('/beepers/:id').put(updateBeeperStatusController)
router.route('/beepers/location/:id').put(updateLocationController)
router.route('/beepers').post(createBeeperController)

export default router;