import express, { Router } from "express";
import { addBeeper } from "../controllers/beeperCrud";
const router: Router = express.Router()


router.route('/beepers').post(addBeeper)
router.route('/beepers').get(addBeeper)
export default router;