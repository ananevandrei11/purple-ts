class MapTable {
  private _objectMap: {
    [key: string]: { [key: string]: string };
  };
  private _regexPlus: RegExp = /^\+/;
  private _regexMinus: RegExp = /^-/;
  private _hashMinus = '0';
  private _hashPlus = '1';

  constructor() {
    this._objectMap = {};
  }

  private _hashBucket(value: string) {
    const valueNegative = this._regexMinus.test(value);
    const valuePositive = this._regexPlus.test(value);

    if (!valueNegative && !valuePositive) {
      throw new Error('Не подходящие значение VALUE.');
    }

    return valueNegative ? this._hashMinus : this._hashPlus;
  }

  get() {
    return this._objectMap;
  }

  set({ key, value }: { key: string; value: string }) {
    const hashBucket = this._hashBucket(value);
    if (this._objectMap.hasOwnProperty(hashBucket)) {
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
