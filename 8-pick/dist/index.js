"use strict";
// interface IUser {
//   name: string;
//   age: number;
// }
// type KeysoFUser = keyof IUser;
// const key: KeysoFUser = 'age';
// function getValue<T,K extends keyof T>(obj:T, key:K):T[K] {
//   return obj[key]
// }
// const user: IUser = {
//   name: 'Nick',
//   age: 30,
// };
// const userName = getValue(user, 'name');
// let strOrNum: string | number;
// if (Math.random() > 0.5) {
//   strOrNum = 5;
// } else {
//   strOrNum = 'str';
// }
// if (typeof strOrNum == 'string') {
//   console.log(strOrNum);
// } else {
//   console.log(strOrNum);
// }
// let strOrNum2: typeof strOrNum;
// const user = {
//   name: 'nicL',
// };
// type username = keyof typeof user;
// enum Direction {
//   Up,
//   Down,
// }
// type D = keyof typeof Direction;
/*
interface Role {
  name: string;
}

interface User {
  name: string;
  roles: Role[];
  permission: Permission
}

interface Permission {
  endDate: Date;
  
}

const user: User = {
  name: 'Nick',
  roles: [],
  permission: {
    endDate: new Date()
  },
};
const nameUser1 = user['name'];
const roleNames = 'roles';

type rolesType = User['roles'];
type rolesTypes2 = User[typeof roleNames];

type roleType = User['roles'][number]; //для вытаскивания элемента из массива
type dateType = User['permission']['endDate']; //для вытаскивания вложеннгсти

const roles = ['admin', 'user', 'superuser'] as const;

type rolesTypes = typeof roles[number];
*/
const a = Math.random() > 0.5 ? 1 : 0;
const suc = {
    code: 200,
    data: 'done',
};
const fail = {
    code: 400,
    data: new Error(),
};
class User {
}
class UserPersistend extends User {
}
function getUser(dbIdOrId) {
    if (typeof dbIdOrId == 'number') {
        return new User();
    }
    else {
        return new UserPersistend();
    }
}
function getUser2(id) {
    if (typeof id == 'number') {
        return new User();
    }
    else {
        return new UserPersistend();
    }
}
const res = getUser2(1);
