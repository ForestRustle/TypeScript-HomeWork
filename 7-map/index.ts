//Для базового теста
const obj: Record<string, number> = {
  a: 1,
  b: 2,
};

//Продвинутая версия
const keys = ['A', 'B', 'C', 'D', 'E'];
function generateObject(keys: string[]): Record<string, number> {
  return keys.reduce<Record<string, number>>((acc, key, index) => {
    acc[key] = index + 1;
    return acc
  }, {});
}

type parameFunc = <T extends Record<string, number>>(
  param: T
) => Record<number, string>;

function swapKeysForValue<T extends Record<string, number>>(
  obj: T
): Record<number, string> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (typeof value != 'number') {
        throw new Error(`Value ${value} is not a number`);
      }
      return [value, key];
    })
  );
}

console.log(swapKeysForValue(obj));
console.log(swapKeysForValue(generateObject(keys)));
