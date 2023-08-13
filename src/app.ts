import { A } from './lessons/modules/index.js';
import { toJson } from 'really-relaxed-json';
const rjson = '[ one two three {foo:bar} ]';
const json = toJson(rjson);

console.log(A.a);
