import { json } from "body-parser";
import jsonfile from 'jsonfile'
import { error } from "console";
import {v4 as uuidv4} from 'uuid'
import { Beeper } from "../models/BeeperModel.js";
import {readFromJsonFile} from '../DAL/beeperJson.js'
import BeeperStatus from "../statuses/beeperStatuses.js";
// import 


// read all beepers from db

export async function beepersArray(): Promise<Beeper[]>{
    const beepers : Beeper[] =  await readFromJsonFile()
    return beepers
}


// check if beeper is unique
// export async function isUniqUser(beeper:Beeper): Promise<Beeper> {
//     const users : Beeper[] = await beepersArray()
//     const existedUser = await findBeeper(beeper.userName)
//     if (existedUser?.password === beeper.password) {
//         throw new Error("user already  exist")
//     }
//     return beeper
// }


export async function hashId(beeper:Beeper) {
    const beepers : Beeper[] = await beepersArray()
    const beeperFind:Beeper |undefined =  beepers.find((b)=>{
        return b.id === beeper.id 
    })
    if (beeperFind) {
        beeperFind.id = uuidv4()
        return beeperFind
    }
    throw new Error('user not find')
}


export async function findBeeperById(beeperId:string): Promise<Beeper | null> {
    const beepers : Beeper[] = await beepersArray()
    const beeperFind = beepers.find((b)=>b.id === beeperId)
    return beeperFind? beeperFind: null
}

export async function findBeeperByStatus(beeperStatus: BeeperStatus): Promise<Beeper | null> {
    const beepers : Beeper[] = await beepersArray()
    const beeperFind = beepers.find((b)=>b.status === beeperStatus)
    return beeperFind? beeperFind: null
}