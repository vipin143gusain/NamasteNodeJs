/** @format */

require('./xyz'); //ONE MODULE INTO ANOTHER
// require('./sum'); //Modules protected there functions and variables from leaking

// import { sumOfTwo, name } from './sum.js';

const { sumOfTwo, name } = require('./group');
const data = require('./data.json');

sumOfTwo(3, 4);
console.log(name);
console.log(data);

console.log('abc statement');
