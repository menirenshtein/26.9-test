import {application, Request, Response } from "express";
import {Beeper} from '../models/BeeperModel.js';
import {readFromJsonFile, writeBeeperToJsonFile} from '../DAL/beeperJson.js'
import {hashId, findBeeperById, findBeeperByStatus} from '../services/beeperService.js'
import { v4 } from "uuid";




export  const addBeeper = async (req:Request, res:Response)=> {
    try {
    let beeper:Beeper = req.body
    beeper = await hashId(beeper)
    writeBeeperToJsonFile(beeper)
    res.status(201).json({beeperId:beeper.id})
    } catch (e) {
        res.status(500).send(e)
    }
}


