import {application, Request, Response } from "express";
import {Beeper} from '../models/BeeperModel.js';
import {getAllBeepers, findBeeperById, findBeepersByStatus, deleteBeeper, createBeeper, updateBeeperLocation, updateStatus} from '../services/beeperService.js'
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
    const beeperStatus  = req.params.status;
    try {
        // vailidate if the status is correct
        if (!(beeperStatus in BeeperStatus)) {
            res.status(400).json({ message: 'Invalid status' });
            return;
        }
        const beepers = await findBeepersByStatus(beeperStatus);
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


// gets the name from the body check if its valid and send to the service gets the object and return it
export const createBeeperController = async (req: Request, res: Response): Promise<void> => {
    const {name}  = req.body;
    
    if (!name) {
        res.status(400).json({ message: 'Name is required to create a beeper' });
        return;
    }

    try {
        const newBeeper = await createBeeper(name);
        res.status(201).json(newBeeper);
    } catch (error) {
        res.status(500).json({ message: 'Error creating beeper', error });
    }
};


export async function updateLocationController(req: Request, res: Response): Promise<void> {
    const { lon, lat } = req.body; 
    const beeperId = req.params.id;

    const lonNumber = parseFloat(lon);
    const latNumber = parseFloat(lat);

    try {
        const updatedBeeper = await updateBeeperLocation(beeperId, lonNumber, latNumber);
                res.status(200).json({
            message: 'Beeper location updated successfully.',
            beeper: updatedBeeper
        });
    } catch (error) {
        res.status(400).json({
            message: "invalid request"
        });
    }
}


export async function updateBeeperStatusController(req: Request, res: Response): Promise<void> {
    const beeperId = req.params.id; 
    try {
        
        const updatedBeeper = await updateStatus(beeperId) as Beeper;
        
        res.status(200).json({
            message: 'Beeper status updated successfully.',
            status: updatedBeeper.status
        });
    } catch (error) {
        res.status(400).json({
            message:  "cant change the status"
        });
    }
}