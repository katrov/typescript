"use strict";
// readonly или const
// Когда использовать readonly, а когда const?
// Для переменных используется const; для свойств — readonly
function createCircle(obj) {
    let circle = { radius: 50 };
    return Object.assign(Object.assign({}, obj), circle);
}
;
createCircle({ width: 100, height: 100, name: 'circle' });
function createSquare(obj) {
    let square = { width: 100, height: 100, name: 'default square' };
    if (obj &&
        obj.width === obj.height) {
        return Object.assign(Object.assign({}, square), obj);
    }
    return square;
}
;
const s = createSquare({ width: 150, height: 150, name: 'square' });
// s.name = 'circle'; // Cannot assign to 'name' because it is a read-only 
// console.log(s.name);
// =================================================================
// Excess Property Checks
// Проверка лишних свойств
// компилятор запретит расширить объект s2 свойством opacity
// так-как функция createSquare создана на основе интерфейса Shape и возвращает объект типа Shape
// в котором отсутствует свойство opacity
// const s2 = createSquare({ width:150, height:150, name: 'square', opacity: 0.5 });
// самый простой способ обойти избыточные проверки
// это произвести приведение к типу 
const s3 = createSquare({ width: 150, height: 150, name: 'square', opacity: 0.5 });
const s4 = createSquare({ width: 150, height: 150, name: 'square', opacity: 0.5 });
console.log(s4); // { width: 150, height: 150, name: 'square', opacity: 0.5 }
const s5 = createSquare({ width: 150, height: 150, name: 'square', opacity: 0.5, fill: 'red' });
console.log(s5); // { width: 150, height: 150, name: 'square', opacity: 0.5, fill: 'red' }
let mySearch;
mySearch = (src, sub) => {
    let result = src.search(sub);
    return result > -1;
};
console.log(mySearch('Hello World', 'World')); // true
let myArray;
myArray = ["Bob", "Fred"];
myArray[2] = 'Alex';
console.log(myArray); // [ 'Bob', 'Fred', 'Alex' ]
let myStr = myArray[0];
console.log(myStr); // Bob
let myReadOnlyArray = ["Alice", "Bob"];
console.log(myReadOnlyArray[1]);
function createClock(ctor, hour, minute) {
    return new ctor(hour, minute);
}
class DigitalClock {
    constructor(h, m) { }
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock {
    constructor(h, m) { }
    tick() {
        console.log("tick tock");
    }
}
let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
// это объект, который может одновременно быть и функцией и объектом с набором свойств:
function getCounter() {
    let counter = function (start) { console.log(start); };
    counter.interval = 123;
    counter.getInterval = function () { console.log(counter.interval); };
    counter.reset = function () { counter.interval = 0; };
    return counter;
}
let c = getCounter();
c(10); // 10 // с является функцией
c.getInterval(); // 123
c.reset(); // reset - свойство объекта с
c.getInterval(); // 0
c.interval = 5.0; // interval - свойство объекта с
c.getInterval(); // 5
// =================================================================
// Interfaces Extending Classes
// наследование классов интерфейсами
class Control {
}
class Button extends Control {
    select() { }
}
class TextBox extends Control {
    select() { }
}
// Class 'ImageControl' incorrectly implements interface 'SelectableControl'.
// Types have separate declarations of a private property 'state'.
// ImageControl не является наследуемым от класса Control
// class ImageControl implements SelectableControl {
//   private state: any;
//   select() {}
// }
