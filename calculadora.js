'use strict';

var params = process.argv.slice(2);

console.log(params);

var num1 = parseFloat(params[0]);
var num2 = parseFloat(params[1]);

var template = `
Suma: ${num1+num2}
Resta: ${num1-num2}
Div: ${num1/num2}
Mul: ${num1*num2}
`;

console.log(num1+'\n'+num2);
console.log(template);

// console.log("Hola NodeJS");