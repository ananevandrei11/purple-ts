type Entries<T> = [keyof T, T[keyof T]][];

function swapKeysAndValues<T extends object>(
  obj: T,
): { [K in keyof T as T[K]]: K } {
  const entries = Object.entries(obj) as Entries<T>;

  const swapObj = {} as any;
  entries.forEach((i) => {
    const keyFromValue =
      typeof i[1] === 'string'
        ? i[1]
        : JSON.stringify(i[1]);
    swapObj[keyFromValue] = i[0];
  });
  return swapObj;
}

const swapedObject = swapKeysAndValues({
  name: 'Ivan',
  surname: 'Urlan',
} as const);
const swapedObject2 = swapKeysAndValues({
  a: 1,
  b: 2,
} as const);
console.log(swapedObject);
console.log(swapedObject2);
