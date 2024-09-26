import  jsonfile  from "jsonfile";
import {Beeper} from '../models/BeeperModel.js'
import axios from "axios";
import { findBeeperById,findBeeperByStatus ,beepersArray} from "../services/beeperService.js";
import { v4 } from "uuid";
const DB_FILE = './data/db.json'



export const readFromJsonFile = async ():Promise<Beeper[]>=>{
    const users : Beeper[] = await jsonfile.readFile(DB_FILE)
    return users 
}


export const writeBeeperToJsonFile = (beeper:Beeper)=>{
    try {
        jsonfile.readFile('./data/db.json').then(beepers =>{
            beepers.push(beeper)
            jsonfile.writeFile('./data/db.json', beepers, function(err){
                if (err) console.error(err)
            })
        })
    } catch (error) {
        throw error
    }
}

