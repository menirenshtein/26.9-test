import  jsonfile  from "jsonfile";
import {Beeper} from '../models/BeeperModel.js'
const DB_FILE = './data/db.json'





// gets all beepers from DB
export const readAllBeepers = async (): Promise<Beeper[]> => {
    const beepers: Beeper[] = await jsonfile.readFile(DB_FILE);
    return beepers;
};

// wtite all beepers to the DB
export const writeToJsonFile = async (beepers: Beeper[]): Promise<void> => {
    await jsonfile.writeFile(DB_FILE, beepers, { spaces: 2 });
};