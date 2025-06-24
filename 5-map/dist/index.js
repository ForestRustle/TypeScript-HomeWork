"use strict";
class emulateMap {
    constructor() {
        this.buckets = [];
    }
    generateHash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash << 5) - hash + key.charCodeAt(i);
            hash |= 0;
        }
        return hash;
    }
    set(key, value) {
        const hash = this.generateHash(key);
        const findItem = this.buckets.find((el) => el.hash == hash && el.value[0] == key);
        if (findItem) {
            findItem.value[1] = value;
        }
        else {
            this.buckets.push({ hash, value: [key, value] });
        }
    }
    delete(key) {
        const hash = this.generateHash(key);
        const index = this.buckets.findIndex((el) => el.hash == hash && el.value[0] == key);
        if (index != -1) {
            this.buckets.splice(index, 1);
            return true;
        }
        return false;
    }
    get(key) {
        const hash = this.generateHash(key);
        const findItem = this.buckets.find((el) => el.hash == hash && el.value[0] == key);
        return findItem === null || findItem === void 0 ? void 0 : findItem.value[1];
    }
    clear() {
        this.buckets = [];
    }
    getBucket() {
        return this.buckets;
    }
}
const arrOfCityes = [
    'Paris',
    'Berlin',
    'Madrid',
    'Rome',
    'Amsterdam',
    'Prague',
    'Vienna',
    'Lisbon',
    'Copenhagen',
    'Budapest',
];
function generateRandomId() {
    return Math.floor(1000 + Math.random() * 100);
}
const myMap = new emulateMap();
arrOfCityes.map((item) => myMap.set(item, generateRandomId()));
console.log(myMap.buckets);
myMap.delete('Berlin');
console.log(myMap.buckets);
myMap.set('Moscow', generateRandomId());
console.log(myMap.buckets);
