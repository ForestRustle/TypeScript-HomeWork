"use strict";
/**
 * Написать декоратор, который при присвоении проверяет присваиваемое значение функцией. Если она возвращает true – присваивание происходит, если false – то нет.
 * Пример:
 * class User {
  @allowFunc((a: number) => a > 0)
  age: number = 30;
}
const person = new User();
console.log(person.age); // 30

person.age = 0;
console.log(person.age); // 30

person.age = 20;
console.log(person.age); // 20
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
class User {
    constructor() {
        this.age = 30;
    }
}
__decorate([
    allowFunc((a) => a > 0),
    __metadata("design:type", Number)
], User.prototype, "age", void 0);
function allowFunc(predicate) {
    return (target, propertyKey) => {
        let oldValue;
        const setter = function (newValue) {
            if (!predicate(newValue)) {
                throw new Error('Значение должно быть больше ноля');
            }
            else {
                oldValue = newValue;
            }
        };
        const getter = function () {
            return oldValue;
        };
        Object.defineProperty(target, propertyKey, {
            set: setter,
            get: getter,
        });
    };
}
const person = new User();
console.log(person.age);
person.age = 0;
console.log(person.age);
person.age = 20;
console.log(person.age);
