"use strict";
const User = {
    name: 'Vasiliy',
    age: 8,
    skills: ['typescript', 'javascript'],
};
function pickObjectKeys(obj, keys) {
    return keys.reduce((acc, item) => {
        acc[item] = obj[item];
        return acc;
    }, {});
}
const res = pickObjectKeys(User, ['age', 'skills']);
