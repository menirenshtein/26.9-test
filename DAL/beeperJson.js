var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jsonfile from "jsonfile";
const DB_FILE = './data/db.json';
// gets all beepers from DB
export const readAllBeepers = () => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield jsonfile.readFile(DB_FILE);
    return beepers;
});
// wtite all beepers to the DB
export const writeToJsonFile = (beepers) => __awaiter(void 0, void 0, void 0, function* () {
    yield jsonfile.writeFile(DB_FILE, beepers, { spaces: 2 });
});
