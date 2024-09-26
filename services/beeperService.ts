import { json } from "body-parser";
import jsonfile from 'jsonfile'
import { error } from "console";
import {v4 as uuidv4} from 'uuid'
import { Beeper } from "../models/BeeperModel.js";
import { writeToJsonFile, readAllBeepers} from '../DAL/beeperJson.js'
import BeeperStatus from "../statuses/beeperStatuses.js";
// import 


// read all beepers from db


// Get all beepers
export async function getAllBeepers(): Promise<Beeper[]> {
    return await readAllBeepers();
}


// Get beeper by ID
export async function findBeeperById(beeperId: string): Promise<Beeper | null> {
    const beepers: Beeper[] = await readAllBeepers();
    const beeperFind = beepers.find((b) => b.id === beeperId);
    return beeperFind ? beeperFind : null;
}


// find all the beepers by the status
export async function findBeepersByStatus(status: string): Promise<Beeper[]> {
    const beepers: Beeper[] = await readAllBeepers();
    return beepers.filter((b) => b.status === status);
}



// Delete beeper
export async function deleteBeeper(id: string): Promise<boolean> {
    const beepers: Beeper[] = await readAllBeepers();
    const oldArrayLen = beepers.length;
    const updatedBeepers = beepers.filter((b) => b.id !== id);
    await writeToJsonFile(updatedBeepers);
    return updatedBeepers.length !== oldArrayLen;
}