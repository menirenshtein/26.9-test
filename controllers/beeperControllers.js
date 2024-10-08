var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getAllBeepers, findBeeperById, findBeepersByStatus, deleteBeeper, createBeeper, updateBeeperLocation, updateStatus } from '../services/beeperService.js';
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
    const beeperStatus = req.params.status;
    try {
        // vailidate if the status is correct
        if (!(beeperStatus in BeeperStatus)) {
            res.status(400).json({ message: 'Invalid status' });
            return;
        }
        const beepers = yield findBeepersByStatus(beeperStatus);
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
// gets the name from the body check if its valid and send to the service gets the object and return it
export const createBeeperController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ message: 'Name is required to create a beeper' });
        return;
    }
    try {
        const newBeeper = yield createBeeper(name);
        res.status(201).json(newBeeper);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating beeper', error });
    }
});
export function updateLocationController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { lon, lat } = req.body;
        const beeperId = req.params.id;
        const lonNumber = parseFloat(lon);
        const latNumber = parseFloat(lat);
        try {
            const updatedBeeper = yield updateBeeperLocation(beeperId, lonNumber, latNumber);
            res.status(200).json({
                message: 'Beeper location updated successfully.',
                beeper: updatedBeeper
            });
        }
        catch (error) {
            res.status(400).json({
                message: "invalid request"
            });
        }
    });
}
export function updateBeeperStatusController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const beeperId = req.params.id;
        try {
            const updatedBeeper = yield updateStatus(beeperId);
            res.status(200).json({
                message: 'Beeper status updated successfully.',
                status: updatedBeeper.status
            });
        }
        catch (error) {
            res.status(400).json({
                message: "cant change the status"
            });
        }
    });
}
