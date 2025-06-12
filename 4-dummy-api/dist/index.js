"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
})(Gender || (Gender = {}));
var Color;
(function (Color) {
    Color["Green"] = "Green";
    Color["Brown"] = "Brown";
    Color["Gray"] = "Gray";
    Color["Amber"] = "Amber";
    Color["Blue"] = "Blue";
    Color["Black"] = "Black";
    Color["Blond"] = "Blond";
    Color["Chestnut"] = "Chestnut";
    Color["Auburn"] = "Auburn";
})(Color || (Color = {}));
var HairType;
(function (HairType) {
    HairType["Strands"] = "Strands";
    HairType["Curly"] = "Curly";
    HairType["Very_curly"] = "Very curly";
    HairType["Straight"] = "Straight";
    HairType["Wavy"] = "Wavy";
})(HairType || (HairType = {}));
const url = 'https://dummyjson.com/users';
function errorHandler(error) {
    if (error instanceof Error) {
        return error.message;
    }
    return 'this error not instanceof Error\nerror: ' + error;
}
function isSuccessResponse(res) {
    if (res.status === 200) {
        return true;
    }
    return false;
}
function getUsersFromData(res) {
    if (isSuccessResponse(res)) {
        assertUsers(res.data);
        return res.data.users;
    }
    else {
        throw new Error(res.data.statusText);
    }
}
function assertUsers(data) {
    if (typeof data === 'object' && !!data && 'users' in data) {
        return;
    }
    throw new Error('users not found');
}
function getAddressFromUser(user) {
    if (user.address) {
        return user.address;
    }
    throw new Error('address from user not found');
}
function requestToDummy() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, axios_1.default)(url);
            const users = getUsersFromData(response);
            return users;
        }
        catch (error) {
            throw new Error(errorHandler(error));
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield requestToDummy();
            console.log(users);
        }
        catch (error) {
            console.log(errorHandler(error));
        }
    });
}
main();
