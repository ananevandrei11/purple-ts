type ObjectMap = {
  [key: string]: { [key: string]: string };
};

class MapTable {
  private _objectMap: ObjectMap = {};
  private _regexPlus: RegExp = /^\+/;
  private _regexMinus: RegExp = /^-/;
  private _hashMinus: string = '0';
  private _hashPlus: string = '1';

  constructor() {}

  private _hashBucket(value: string): string {
    const valueNegative = this._regexMinus.test(value);
    const valuePositive = this._regexPlus.test(value);

    if (!valueNegative && !valuePositive) {
      throw new Error('Не подходящие значение VALUE.');
    }

    return valueNegative ? this._hashMinus : this._hashPlus;
  }

  get(): ObjectMap {
    return this._objectMap;
  }

  set({
    key,
    value,
  }: {
    key: string;
    value: string;
  }): void {
    const hashBucket = this._hashBucket(value);
    if (this._objectMap.hasOwnProperty(hashBucket)) {
      //@ts-ignore
      this._objectMap[hashBucket][key] = value;
    } else {
      this._objectMap[hashBucket] = {
        [key]: value,
      };
    }
  }
}

const newMap = new MapTable();
newMap.set({ key: 'London', value: '-10' });
newMap.set({ key: 'Kair', value: '+30' });
newMap.set({ key: 'Berlin', value: '-5' });
console.log(newMap.get());
