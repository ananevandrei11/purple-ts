"use strict";
class MapTable {
    constructor() {
        this._regexPlus = /^\+/;
        this._regexMinus = /^-/;
        this.table = [];
        this._objectMap = {};
    }
    _hashBucket({ key, value, }) {
        const valueNegative = this._regexMinus.test(value);
        const valuePositive = this._regexPlus.test(value);
        const hashMinus = '0';
        const hashPlus = '1';
        if (!valueNegative && !valuePositive) {
            throw new Error('Не подходящие значение VALUE.');
        }
        return valueNegative ? hashMinus : hashPlus;
    }
    get() {
        return this._objectMap;
    }
    set({ key, value }) {
        const hashBucket = this._hashBucket({ key, value });
        /*if (this._objectMap.hasOwnProperty(hashBucket)) {
                this._objectMap[hashBucket].push({
                    [key]: value,
                });
            } else {
                this._objectMap[hashBucket] = [{
                    [key]: value,
                }];
            }*/
        console.log(this._objectMap);
        if (this._objectMap.hasOwnProperty(hashBucket)) {
            this._objectMap[hashBucket][key] = value;
        }
        else {
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
