"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sort_by_1 = __importDefault(require("sort-by"));
let users = [];
users = [
    {
        id: 7,
        name: 'Foo',
        age: '34',
        email: { primary: 'foo@email.com' },
    },
    {
        id: 3,
        name: 'Baz',
        age: '67',
        email: { primary: 'baz@email.com' },
    },
    {
        id: 4,
        name: 'Bar',
        age: '67',
        email: { primary: 'bar@email.com' },
    },
];
const res = users.sort((0, sort_by_1.default)('id', 'age'));
console.log(res);
