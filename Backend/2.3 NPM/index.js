//var generateName = require("sillyname");

import generateName from "sillyname";
var sillyName = generateName();
console.log(`El Nombre es ${sillyName}.`);  //note:  backtick as opposed to a single quote hon yocker

import superheroes, { randomSuperhero } from 'superheroes'
var ultraCool = randomSuperhero();
console.log(`I am ${ultraCool}.`);