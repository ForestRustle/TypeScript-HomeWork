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

class User {
  @allowFunc((a: number) => a > 0)
  age: number = 30;
}

function allowFunc(predicate: (value: any)=>boolean) {
  return (target: any, propertyKey: string | symbol) => {
    let oldValue: number;
    const setter = function (newValue: number) {
      if (!predicate(newValue)) {
        throw new Error("Значение должно быть больше ноля");
        
      } else {
        oldValue = newValue;
      }
    };
    const getter = function () {
      return oldValue;
;
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