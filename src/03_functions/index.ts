// именованная
function addTwoValue(x:number, y:number): number {
  return x + y;
}
// анонимная
const addThreeValue = function(x:number, y:number, z:number): number {
  return x + y + z;
}

// с поддержкой 2х типов параметров (строка или число)
const createString = (x: string, y: number | string) => `${x}-${y}`;

// с дефолтными аргументами
const helloWorld = (x: string = "Hello", y: string) => `${x} ${y}!`;

// с необязательным и дефолтным аргументом radius
// необязательные параметры всегда следуют после обязательных
const getCircle = (width: number, height: number, radius = 50): { width: number, height: number, radius: number } => {
  return {width, height, radius}
};
console.log(getCircle(100, 100)); // { width: 100, height: 100, radius: 50 }

// rest оператор
const createSkills = (name: string, ...skills: string[]) => `${name}, my skills are ${skills.join()}`;
createSkills('Alex', 'html', 'css', 'js', 'ts');

// ничего не возвращает
const logName = (name: string): void => console.log(name);

// возвращает функцию сложения
// let myAdd: (x: number, y: number) => number = function (
//   x: number,
//   y: number
// ): number {
//   return x + y;
// };
// console.log(myAdd(10, 20)) // 30

// аргументы переименованны для лучшей читаемости
// baseValue и increment - типы аргументов
// после => тип возвращаемого значения

// Стоит отметить, что только параметры, передаваемые в функцию и возвращаемое значение определяют ее тип. Захваченные переменные не входят в описание типа. Поэтому они являются частью некого “скрытого состояния” функции и не входят в API.

let myAdd1: (baseValue: number, increment: number) => number =
  function(x: number, y: number): number { return x + y; };
console.log(myAdd1(10, 20)) // 30

// TypeScript может автоматически вычислять тип, если вы описали типы в одной части выражения, а в другой — нет. Это называется “контекстной типизацией” . Это помогает упростить код и в тоже время поддерживать код типизированным.

let myAdd2: (baseValue: number, increment: number) => number =
  function(x, y) { return x + y; };
console.log(myAdd2(10, 20)) // 30


// this
// в примере createCardPicker возвращает функцию типа function () {}
// this - будет равен undefined
// при функциии типа () => {}
// this - бедет равен объекту deck

'use strict';
// let deck = {
//   suits: ["hearts", "spades", "clubs", "diamonds"],
//   cards: Array(52),
//   createCardPicker: function () {
//     return () => {
//       let pickedCard = Math.floor(Math.random() * 52);
//       let pickedSuit = Math.floor(pickedCard / 13);
//       return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
//     };
//   },
// };
// let cardPicker = deck.createCardPicker();
// let pickedCard = cardPicker();
// console.log("card: " + pickedCard.card + " of " + pickedCard.suit); // card: 7 of clubs

// с выключенной опцией noImplicitThis: false
// компилятор ts в строчке this.suits[pickedSuit]
// подразумевает, что this является any
// для того, чтобы исправить ситуацию
// нужно явно передать this, описать интерфейсы

interface Card {
  suit: string;
  card: number;
};
interface Deck {
  suits: string[];
  cards: number[];
  createCardPicker(this: Deck): () => Card;
};
let deck: Deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  createCardPicker: function (this: Deck) {
      return () => {
          let pickedCard = Math.floor(Math.random() * 52);
          let pickedSuit = Math.floor(pickedCard / 13);
          return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
      }
  }
};
let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();
console.log("card: " + pickedCard.card + " of " + pickedCard.suit);

// теперь ts понимает, что при вызове createCardPicker в качестве this ожидается объект типа Deck.


// this parameters in callbacks
// решается проблема потери this
// в случаях, когда функция передается в качестве callbacks

// ?


// перегрузка функций
// это когда функция может возвращать различные типы объектов в зависимости от входных параметров

let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: any): any {
  if (typeof x == "object") {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  }
  else if (typeof x == "number") {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}

let myDeck = [
  { suit: "diamonds", card: 2 },
  { suit: "spades", card: 10 },
  { suit: "hearts", card: 4 },
];

let pickedCard1 = myDeck[pickCard(myDeck)];
console.log(pickedCard1) // { suit: 'hearts', card: 4 }
console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
console.log("card: " + pickedCard2.card + " of " + pickedCard2.suit);


// перегрузка функций — это набор одноименных функций с разным набором параметров.
// перепишем функцию pickCard

// pickCard может быть определена в нескольких видах
// с разным набором входных параметров и типов

// Для перегрузки, вначале опеределяем все версии функции, которые не будут иметь никакой логики. А потом определяем версию функции с общей сигнатурой, которая подходит под все ранее определенные варианты. И в этой общей версии уже определяем конкретную логику функции.

// function pickCard(x: { suit: string; card: number; }[]): number;
// function pickCard(x: number): { suit: string; card: number; };
// function pickCard(x: any): any {
//   if (typeof x == "object") {
//     let pickedCard = Math.floor(Math.random() * x.length);
//     return pickedCard;
//   }
//   else if (typeof x == "number") {
//     let pickedSuit = Math.floor(x / 13);
//     return { suit: suits[pickedSuit], card: x % 13 };
//   }
// }