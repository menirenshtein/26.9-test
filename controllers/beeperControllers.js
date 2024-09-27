var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getAllBeepers, findBeeperById, findBeepersByStatus, deleteBeeper } from '../services/beeperService.js';
import BeeperStatus from '../statuses/beeperStatuses.js';
// the function calls the getAllBeepers function from the service, => =>
// if its good the function sends them 
export const getAllBeepersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beepers = yield getAllBeepers();
        res.status(200).json(beepers);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching beepers', error });
    }
});
// get all the beepers by status endpoint
export const getBeepersByStatusController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const beeperStatus = req.body.status;
    try {
        // vailidate if the status is correct
        if (!(beeperStatus in BeeperStatus)) {
            res.status(400).json({ message: 'Invalid status' });
            return;
        }
        const beepers = yield findBeepersByStatus(status);
        res.status(200).json(beepers);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching beepers by status', error });
    }
});
// get a specific beeper by id
export const getBeeperByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const beeperId = req.params.id;
    try {
        const beeper = yield findBeeperById(beeperId);
        if (!beeper) {
            res.status(404).json({ message: 'Beeper not found' });
            return;
        }
        res.status(200).json(beeper);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching beeper', error });
    }
});
// gets a boolean from the service, true/false if deleted/faild
export const deleteBeeperController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const success = yield deleteBeeper(req.params.id);
        if (!success) {
            res.status(404).json({ message: 'Beeper not found' });
            return;
        }
        res.status(200).json({ message: 'Beeper deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting beeper', error });
    }
});
