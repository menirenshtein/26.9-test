var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { v4 as uuidv4 } from 'uuid';
import { writeToJsonFile, readAllBeepers } from '../DAL/beeperJson.js';
import BeeperStatus from "../statuses/beeperStatuses.js";
// import 
// read all beepers from db
// Get all beepers
export function getAllBeepers() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield readAllBeepers();
    });
}
// Get beeper by ID
export function findBeeperById(beeperId) {
    return __awaiter(this, void 0, void 0, function* () {
        const beepers = yield readAllBeepers();
        const beeperFind = beepers.find((b) => b.id === beeperId);
        return beeperFind ? beeperFind : null;
    });
}
// find all the beepers by the status
export function findBeepersByStatus(status) {
    return __awaiter(this, void 0, void 0, function* () {
        const beepers = yield readAllBeepers();
        return beepers.filter((b) => b.status === status);
    });
}
// Delete beeper
export function deleteBeeper(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const beepers = yield readAllBeepers();
        const oldArrayLen = beepers.length;
        const updatedBeepers = beepers.filter((b) => b.id !== id);
        yield writeToJsonFile(updatedBeepers);
        return updatedBeepers.length !== oldArrayLen;
    });
}
export function createBeeper(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const beepers = yield getAllBeepers();
        const newBeeper = {
            id: uuidv4(),
            name: name,
            status: BeeperStatus.Manufactured,
            createTime: new Date(),
        };
        beepers.push(newBeeper);
        yield writeToJsonFile(beepers);
        return newBeeper;
    });
}
