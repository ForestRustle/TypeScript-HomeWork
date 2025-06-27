"use strict";
//Для базового теста
const obj = {
    a: 1,
    b: 2,
};
//Продвинутая версия
const keys = ['A', 'B', 'C', 'D', 'E'];
function generateObject(keys) {
    return keys.reduce((acc, key, index) => {
        acc[key] = index + 1;
        return acc;
    }, {});
}
function swapKeysForValue(obj) {
    return Object.fromEntries(Object.entries(obj).map(([key, value]) => {
        if (typeof value != 'number') {
            throw new Error(`Value ${value} is not a number`);
        }
        return [value, key];
    }));
}
console.log(swapKeysForValue(obj));
console.log(swapKeysForValue(generateObject(keys)));
