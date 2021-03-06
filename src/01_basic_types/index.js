"use strict";
// Boolean
let isBoolean;
// good
isBoolean = true;
isBoolean = false;
// bad
// isBoolean = null;
// =================================================================
// Number
let isNumber;
// good
isNumber = 12345; // decimal/десятиричные
isNumber = 0o744; // octal/восьмиричные
isNumber = 0xf00d; // hex/шестнадцатеричные
isNumber = 0b1010; // binary/двоичная
//isNumber = 100n; // bigint (https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
// bad
//isNumber = 'Hello world!';
// =================================================================
// String
let isString;
// good
isString = 'Hello world!';
isString = `It is string - 
  ${isNumber}`;
isString =
    isString +
        'This number' +
        isNumber +
        'is a string';
// bad
// isString = 23423;
// =================================================================
// Array
// let isArray: Array<number>; // тип массива указывается перед type[]
// let isArray: number[] = [1, 2, 3]; // тип массива указывается через generic Array<Type>
// good
let isArray;
isArray = [1, 2, 3, 4, 5];
// bad
// isArray = ['1',2,3,4,5];
// =================================================================
// Tuple
// Кортеж
let isTuple;
// good
isTuple = ['status', 500];
// bad
// isTuple = [500, 'status']
// =================================================================
// Enum
// Перечисления
var Sides1;
(function (Sides1) {
    Sides1[Sides1["Left"] = 0] = "Left";
    Sides1[Sides1["Right"] = 1] = "Right";
})(Sides1 || (Sides1 = {}));
let right1 = Sides1.Right;
let left1 = Sides1.Left;
console.log(left1); // 0
console.log(right1); // 1
console.log(Sides1[0]); // Left
console.log(Sides1[1]); // Right
// compiling to
// var Sides;
// (function (Sides) {
//     Sides[Sides["Left"] = 0] = "Left";
//     Sides[Sides["Right"] = 1] = "Right";
// })(Sides || (Sides = {}));
var Sides2;
(function (Sides2) {
    Sides2[Sides2["Left"] = 10] = "Left";
    Sides2[Sides2["Right"] = 11] = "Right";
})(Sides2 || (Sides2 = {}));
let right2 = Sides2.Right;
let left2 = Sides2.Left;
console.log(right2); // 10
console.log(left2); // 11
console.log(Sides2[0]); // undefined
console.log(Sides2[1]); // undefined
// =================================================================
// Unknown
// Тип, который по каким-то причинам не может быть определен
let isUnknown;
isUnknown = 'Hello!';
isUnknown = false;
// =================================================================
// Any
// отказ от проверки типов, значение может быть любым
let isAny;
isAny = 12345;
isAny = 'Hello world!';
isAny = undefined;
isAny = true;
isAny = () => true;
isAny = {};
// =================================================================
// Void
// обычно применяется к функциям, которые не возвращает ничего
const log = (val) => {
    console.log(val);
};
log((() => true)()); // true
// =================================================================
// Null
let isNull;
// good
isNull = null;
// bad
// isNull = true;
// =================================================================
// Undefined
let isUndefined;
// good
isUndefined = undefined;
// bad
// isUndefined = true;
// =================================================================
// Never
// тип, который никогда не встеречается
// функции, которые никогда не возвращаются
const error = (message) => {
    throw new Error(message);
};
// log(error('It is Error!'));
// вечный цикл
const infiniteLoop = () => {
    while (true) { }
};
// =================================================================
// Object
// тип, который предоставляет не примитивный тип, такие как (number, string, boolean, undefined)
let isObject;
// typeof {} === "object"
// typeof null === "object"
// good
isObject = { key: 1 };
isObject = null;
// bad
// isObject = 122;
// isObject = 'Hello world!';
// isObject = false;
// isObject = undefined;
// Type Assertion
// Приведение к типу
// через использование ключевого слова - as
// Type as string
// через угловые скобки - <>
// <string>Type
// let someValue: any = "this is a string";
// let strLength: number = (someValue as string).length;
// let someValue: any = "this is a string";
// let strLength: number = (<string>someValue).length;
// console.log(strLength) // 16
// let someValue: any = 213213;
// let strLength: number = (<string>someValue).length;
// console.log(strLength) // undefined
// const element: HTMLElement | null = document.getElementById('element');
// element && element.value
// Property 'value' does not exist on type 'HTMLElement'.
// const input = <HTMLInputElement>element
// input.value
