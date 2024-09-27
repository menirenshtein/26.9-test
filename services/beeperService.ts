import { json } from "body-parser";
import jsonfile from 'jsonfile'
import { error } from "console";
import {v4 as uuidv4} from 'uuid'
import { Beeper } from "../models/BeeperModel.js";
import { writeToJsonFile, readAllBeepers} from '../DAL/beeperJson.js'
import BeeperStatus from "../statuses/beeperStatuses.js";
import { Latitude, Longitude} from '../data/location.js' 


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
    return beepers.filter((b) => b.status.toLowerCase() === status.toLowerCase());
}



// Delete beeper
export async function deleteBeeper(id: string): Promise<boolean> {
    const beepers: Beeper[] = await readAllBeepers();
    const oldArrayLen = beepers.length;
    const updatedBeepers = beepers.filter((b) => b.id !== id);
    await writeToJsonFile(updatedBeepers);
    return updatedBeepers.length !== oldArrayLen;
}


// the function gets the beepers name makes an object and send it back
export async function createBeeper(name: string): Promise<Beeper> {
    const beepers: Beeper[] = await getAllBeepers();
    const newBeeper: Beeper = {
        id: uuidv4(),
        name: name,
        status: BeeperStatus.Manufactured,
        createTime: new Date(),
    };
    beepers.push(newBeeper);
    await writeToJsonFile(beepers);
    return newBeeper;
}

export async function updateBeeperLocation(beeperId: string, lon: number, lat: number): Promise<Beeper | null> {

    const lonIndex = Longitude.indexOf(lon);
    
    if (lonIndex === -1 || Latitude[lonIndex] !== lat) {
        throw new Error('Invalid location: Longitude and Latitude do not match at the same index.');
    }

    const beepers: Beeper[] = await readAllBeepers();
    const beeper = beepers.find((b) => b.id === beeperId);
    if (!beeper) {
        throw new Error(`Beeper with ID ${beeperId} not found.`);
    }
    beeper.location = {
        lon: lon,
        lat: lat
    };

    await writeToJsonFile(beepers);
    return beeper;
}


// the function gets an id and finds the beeper' => =>
// the function creates an array from all the statuses => =>
// the funcion find the "index" of the beeper.status, => =>
// if the status == deployed the function checks if the biiper has location   
export async function updateStatus(beeperId: string): Promise<Beeper | null> {
    const beepers: Beeper[] = await readAllBeepers();
    const beeper = beepers.find(b => b.id === beeperId);

    if (!beeper) {
        throw new Error('Beeper not found');
    }
    const allStatusesInArray = Object.values(BeeperStatus);

    const currentStatusIndex = allStatusesInArray.indexOf(beeper.status);

    if (currentStatusIndex === allStatusesInArray.length - 1) {
        throw new Error('Cannot progress status. Already at the final status.');
    }

    const newStatus = allStatusesInArray[currentStatusIndex + 1];

    if (newStatus === BeeperStatus.Deployed) {
        if (!beeper.location?.lon || !beeper.location.lat) {
            throw new Error('Cannot deploy beeper without valid location (lon/lat)');
        }
    }

    beeper.status = newStatus;

    await writeToJsonFile(beepers);
    return beeper; 
}