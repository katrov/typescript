interface Shape {
  width: number
  height: number
  border?: number
  radius?: number // необязательное свойство
  readonly name: string // только для чтения
}

// readonly или const
// Когда использовать readonly, а когда const?
// Для переменных используется const; для свойств — readonly

function createCircle(obj: Shape): Shape {
  let circle = { radius: 50 }
  return {...obj, ...circle}
};
createCircle({width: 100, height: 100, name: 'circle'});

function createSquare(obj?: Shape): Shape {
  let square = { width: 100, height: 100, name: 'default square' };
  if(
    obj &&
    obj.width === obj.height
  ) {
  return {...square, ...obj}
  }
  return square
};
const s = createSquare({ width:150, height:150, name: 'square' });
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
const s3 = createSquare(<Shape>{ width:150, height:150, name: 'square', opacity: 0.5 });
const s4 = createSquare({ width:150, height:150, name: 'square', opacity: 0.5 } as Shape);
console.log(s4) // { width: 150, height: 150, name: 'square', opacity: 0.5 }

// или, использовать описание возможного свойства [propName: string]: Type;
// extends - наследование от interface
interface ExtendShape extends Shape {
  [propName: string]: any; 
}
const s5 = createSquare({ width:150, height:150, name: 'square', opacity: 0.5, fill: 'red' } as ExtendShape);
console.log(s5) // { width: 150, height: 150, name: 'square', opacity: 0.5, fill: 'red' }

// =================================================================


// Function Types
// описание типов функций

interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = (src, sub) => {
  let result = src.search(sub);
  return result > -1;
};
console.log(mySearch('Hello World', 'World')) // true

// =================================================================


// Indexable Types
// индексируемые типы

// индексируемые типы имеют сигнатуру, которая описывает, что доступ к значениям объекта может быть получен с использованием индекса определенного типа. Также определяется и возвращаемый тип значения, полученного по индексу.

interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];
myArray[2] = 'Alex';
console.log(myArray) // [ 'Bob', 'Fred', 'Alex' ]
let myStr: string = myArray[0];
console.log(myStr) // Bob


interface ReadonlyStringArray {
  readonly [index: number]: string;
}
let myReadOnlyArray: ReadonlyStringArray = ["Alice", "Bob"];
console.log(myReadOnlyArray[1])
// myReadOnlyArray[2] = "Mallory"; // Index signature in type 'ReadonlyStringArray' only permits reading.

// =================================================================


// Class Types
// типизацированные классы
// Реализация интерфейса - implements interface

// interface ClockInterface {
//   currentTime: Date;
//   setTime(d: Date): void; // описание публичного метода класса
// }

// class Clock implements ClockInterface {
//   currentTime: Date;
//   setTime(d: Date) {
//     this.currentTime = d;
//   }
//   constructor(h: number, m: number) { }
// }

// 
interface ClockInterface {
  tick(): void;
}
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}
function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
  return new ctor(hour, minute);
}
class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) { }
  tick() {
      console.log("beep beep");
  }
}
class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) { }
  tick() {
      console.log("tick tock");
  }
}
let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

// =================================================================


// Hybrid Types
// гибридные типы

interface Counter {
  (start: number): string;
  getInterval(): void;
  interval: number;
  reset(): void;
}

// это объект, который может одновременно быть и функцией и объектом с набором свойств:

function getCounter(): Counter {
  let counter = <Counter>function (start: number) {console.log(start)};
  counter.interval = 123;
  counter.getInterval = function () {console.log(counter.interval)}
  counter.reset = function () {counter.interval = 0};
  return counter;
}

let c = getCounter();
c(10); // 10 // с является функцией
c.getInterval() // 123
c.reset(); // reset - свойство объекта с
c.getInterval() // 0
c.interval = 5.0; // interval - свойство объекта с
c.getInterval() // 5

// =================================================================


// Interfaces Extending Classes
// наследование классов интерфейсами

class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
  select() {}
}

class TextBox extends Control {
  select() {}
}

// Class 'ImageControl' incorrectly implements interface 'SelectableControl'.
// Types have separate declarations of a private property 'state'.
// ImageControl не является наследуемым от класса Control

// class ImageControl implements SelectableControl {
//   private state: any;
//   select() {}
// }