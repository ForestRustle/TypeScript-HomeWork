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
const URL = 'https://dummyjson.com/users';
var Roles;
(function (Roles) {
    Roles["Admin"] = "admin";
    Roles["Moderator"] = "moderator";
    Roles["User"] = "user";
})(Roles || (Roles = {}));
var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
})(Gender || (Gender = {}));
var HairType;
(function (HairType) {
    HairType["curly"] = "Curly";
    HairType["straight"] = "Straight";
    HairType["wavy"] = "Wavy";
    HairType["kinky"] = "Kinky";
})(HairType || (HairType = {}));
var Color;
(function (Color) {
    Color["brown"] = "Brown";
    Color["green"] = "Green";
    Color["white"] = "White";
    Color["blonde"] = "Blonde";
    Color["gray"] = "Gray";
    Color["red"] = "Red";
    Color["purple"] = "Purple";
    Color["blue"] = "Blue";
    Color["black"] = "Black";
})(Color || (Color = {}));
function isSuccessResponse(responce) {
    if (responce.status === 200) {
        return true;
    }
    else {
        return false;
    }
}
function handleApiResponse(responce) {
    if (isSuccessResponse(responce)) {
        return responce.data.users;
    }
    console.error(responce.status);
    throw new Error(responce.data.statusText);
}
function getUserFirstName(user) {
    if (user.firstName) {
        return user.firstName;
    }
    throw new Error('User company isn`t founded');
}
function requestToAPI() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const responce = yield axios_1.default.get(URL);
            const allUsers = handleApiResponse(responce);
            return allUsers;
        }
        catch (error) {
            console.error(error);
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield requestToAPI();
        if (!users) {
            throw new Error('Users in request not founded');
        }
        for (const user of users) {
            try {
                const firstName = getUserFirstName(user);
                console.log(firstName);
            }
            catch (error) {
                console.error(error);
            }
        }
    });
}
main();
