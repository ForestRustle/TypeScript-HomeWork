
interface IUser {
  name: string;
  age: number;
  skills: [string, string];
}

const User = {
  name: 'Vasiliy',
  age: 8,
  skills: ['typescript', 'javascript'],
};

function pickObjectKeys<T, K extends keyof T>(obj: T, keys:K[]): Pick<T, K> {
  return keys.reduce((acc, item) => {
    acc[item] = obj[item];
    return acc;
  },{} as Pick<T, K>)
}
const res = pickObjectKeys(User, ['age', 'skills']);