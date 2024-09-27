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
import { Latitude, Longitude } from '../data/location.js';
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
        return beepers.filter((b) => b.status.toLowerCase() === status.toLowerCase());
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
// the function gets the beepers name makes an object and send it back
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
export function updateBeeperLocation(beeperId, lon, lat) {
    return __awaiter(this, void 0, void 0, function* () {
        const lonIndex = Longitude.indexOf(lon);
        if (lonIndex === -1 || Latitude[lonIndex] !== lat) {
            throw new Error('Invalid location: Longitude and Latitude do not match at the same index.');
        }
        const beepers = yield readAllBeepers();
        const beeper = beepers.find((b) => b.id === beeperId);
        if (!beeper) {
            throw new Error(`Beeper with ID ${beeperId} not found.`);
        }
        beeper.location = {
            lon: lon,
            lat: lat
        };
        yield writeToJsonFile(beepers);
        return beeper;
    });
}
// the function gets an id and finds the beeper' => =>
// the function creates an array from all the statuses => =>
// the funcion find the "index" of the beeper.status, => =>
// if the status == deployed the function checks if the biiper has location   
export function updateStatus(beeperId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const beepers = yield readAllBeepers();
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
            if (!((_a = beeper.location) === null || _a === void 0 ? void 0 : _a.lon) || !beeper.location.lat) {
                throw new Error('Cannot deploy beeper without valid location (lon/lat)');
            }
        }
        beeper.status = newStatus;
        yield writeToJsonFile(beepers);
        return beeper;
    });
}
