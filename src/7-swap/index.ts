const obj: Record<string, number> = {
  a: 1,
  b: 2,
};

type SwapObj<T> = Record<string, keyof T>;

function swapKeysAndValues<T extends object>(
  obj: T,
): SwapObj<T> {
  const entries = Object.entries(obj);

  let swapObj: SwapObj<T> = {};
  entries.forEach((i) => {
    const key = JSON.stringify(i[1]);
    swapObj[key] = i[0] as keyof T;
  });
  return swapObj;
}

swapKeysAndValues<typeof obj>(obj);
