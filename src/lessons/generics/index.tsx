const numArr: Array<number> = [1, 2, 3];
async function test() {
  const a = await new Promise<string>((res) => {
    res('string');
  });
  return a;
}

const check: Record<string, boolean> = {
  drive: true,
  kpp: false,
};

function logMiddleware<T>(data: T): T {
  console.log(data);
  return data;
}

const res1 = logMiddleware<number>(0);
const res2 = logMiddleware<string>('string');

function getSplitedHalf<T>(data: Array<T>): T[] {
  let arr = [...data];
  const indexHalf = Number((arr.length / 2).toFixed(0));
  return arr.splice(0, indexHalf);
}

const split: <T>(data: Array<T>) => T[] = getSplitedHalf;

function toSting<T>(data: T): string | undefined {
  if (Array.isArray(data)) {
    return data.toString();
  }

  switch (typeof data) {
    case 'string':
      return data;

    case 'number':
    case 'bigint':
    case 'boolean':
    case 'symbol':
    case 'function':
      return data.toString();
    case 'object':
      return JSON.stringify(data);
    default:
      return undefined;
  }
}

interface ILogLine<T> {
  timeStamp: Date;
  data: T;
}

const logLine: ILogLine<{
  a: number;
}> = {
  timeStamp: new Date(),
  data: { a: 1 },
};

class Vehicle {
  run: number;
  constructor() {
    this.run = 0;
  }
}

function kmToMl<T extends Vehicle>(vehicle: T): T {
  vehicle.run = vehicle.run / 0.62;
  return vehicle;
}

class LCV extends Vehicle {
  capacity: number;
  constructor() {
    super();
    this.capacity = 0;
  }
}

const vehicle = kmToMl(new Vehicle());
const vlc = kmToMl(new LCV());

const dataUser = [
  { id: 1, name: 'a' },
  { id: 2, name: 'b' },
  { id: 3, name: 'c' },
];

interface ID {
  id: number;
}

function sort<T extends ID>(
  data: T[],
  type: 'asc' | 'dsc' = 'asc',
): T[] {
  return data.sort((a, b) => {
    switch (type) {
      case 'asc':
        return a.id - b.id;
      case 'dsc':
        return b.id - a.id;
    }
  });
}

class Resp<D, E> {
  data?: D;
  error?: E;

  constructor(data?: D, error?: E) {
    if (data) {
      this.data = data;
    }

    if (error) {
      this.error = error;
    }
  }
}

new Resp<string, number>('data', 0);

class HTTPResp<C> extends Resp<string, number> {
  code: C | undefined;

  setCode(code: C) {
    this.code = code;
  }
}

const resp2 = new HTTPResp();
