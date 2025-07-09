interface IA {
  id: number;
  name: string;
}

interface IB {
  id: number;
  pay: boolean;
}

type diffKeys<T, K> = 
   Omit<T, keyof K>;
;

type key = string | number;

function difference<T extends Record<key, any>, K extends Record<key, any>>(
  a: T,
  b: K
): diffKeys<T, K> {
  const result = {} as diffKeys<T, K>;
  for (const key in a) {
    if (!(key in b)) {
      (result as any[key]) = a[key];
    }
  }
  return result;
}

let a: IA = { id: 5, name: 'Nick' };
let b: IB = { id: 10, pay: true };

const test = difference(a, b);
