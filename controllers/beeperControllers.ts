import {application, Request, Response } from "express";
import {Beeper} from '../models/BeeperModel.js';
import {getAllBeepers, findBeeperById, findBeepersByStatus, deleteBeeper} from '../services/beeperService.js'
import BeeperStatus from '../statuses/beeperStatuses.js'



// the function calls the getAllBeepers function from the service, => =>
// if its good the function sends them 
export const getAllBeepersController = async (req: Request, res: Response): Promise<void> => {
    try {
        const beepers = await getAllBeepers();
        res.status(200).json(beepers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching beepers', error });
    }
};



// get all the beepers by status endpoint
export const getBeepersByStatusController = async (req: Request, res: Response): Promise<void> => {
    const beeperStatus  = req.body.status;
    try {
        // vailidate if the status is correct
        if (!(beeperStatus in BeeperStatus)) {
            res.status(400).json({ message: 'Invalid status' });
            return;
        }
        const beepers = await findBeepersByStatus(status);
        res.status(200).json(beepers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching beepers by status', error });
    }
};


// get a specific beeper by id
export const getBeeperByIdController = async (req: Request, res: Response): Promise<void> => {
    const  beeperId  = req.params.id;
    try {
        const beeper = await findBeeperById(beeperId);
        if (!beeper) {
            res.status(404).json({ message: 'Beeper not found' });
            return;
        }
        res.status(200).json(beeper);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching beeper', error });
    }
};


// gets a boolean from the service, true/false if deleted/faild
export const deleteBeeperController = async (req: Request, res: Response): Promise<void> => {
    try {
        const success = await deleteBeeper(req.params.id);
        if (!success) {
            res.status(404).json({ message: 'Beeper not found' });
            return;
        }
        res.status(200).json({ message: 'Beeper deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting beeper', error });
    }
};