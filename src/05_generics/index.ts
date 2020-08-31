// Функция принимает любой тип, и возвращает это-же тип
// есть понимание, что возвращает функция
// T - позволяет при применение указать конкретный тип
function identity<T>(arg: T): T {
  return arg;
};
// с указанием конкретного типа identity<Number>
// если не указывать тип, ts автоматически использует тип принимаемого аргумента
// этот механизм называется  - автоматическим выводов типа
let numberOutput = identity<Number>(1);
// let wrongOutput = identity<Number>("sdf"); // Argument of type '"sdf"' is not assignable to parameter of type 'Number'.
let stringOutput = identity<String>("Строка");
console.log(numberOutput); // 1
console.log(stringOutput); // Строка

// указание массива с любым типом элеменов массива
function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length);
  return arg;
};
loggingIdentity([1,2,3]); // 3
loggingIdentity(['1','2','3']); // 3
loggingIdentity([true,true,3]); // 3


// обобщенные типы функций

// Определение обобщенного типа функции очень похоже на определение типа для обычной функции. Отличием является лишь то, что нужно сначала указать тип передаваемых параметров и возвращаемого значения, как и при создании обобщенной функции:

let myIdentity: <T>(arg: T) => T = identity;
// запись при помощи объектного литерала
// let myIdentity: { <T>(arg: T): T } = identity;

// По сути, это и есть обобщенный интерфейс. 
// из объектного литерала можно создать обобщенный интерфейс

// interface IGenericIdentityFn {
//   <T>(arg: T): T;
// };
// let myGenericIdentity: IGenericIdentityFn = identity;

// Более того, мы можем указать обобщенный тип для всего интерфейса, что сделает этот параметр доступным для всех его методов.
// использование с указанием конкретного типа
interface IGenericIdentityFn<T> {
  (arg: T): T;
};
let myGenericIdentity: IGenericIdentityFn<Number> = identity;
myGenericIdentity(123);
// myGenericIdentity('Alex'); // Argument of type '"Alex"' is not assignable to parameter of type 'Number'.


// Обобщенные классы
// обобщение классов относится только к части экземпляра класса
class SomeGenericClass<T> {
  initialValue: T;
  add: (x: T, y: T) => T;
};
let instance = new SomeGenericClass<number>();
instance.initialValue = 0;
instance.add = function (x, y) { return x + y; };
instance.add(10, 20); // 30

let instance2 = new SomeGenericClass<string>();
instance2.initialValue = 'Hello';
instance2.add = function (x, y) { return `${x}! ${instance2.initialValue} - ${y}`; };
instance2.add('Alex', 'world');



// Ограничения обобщений
// в этом примере
// function loggingIdentity<T>(arg: T[]): T[] { console.log(arg.length); return arg; };
interface Length {
  length: number;
};
// принимаемый тип должен иметь свойство length
// иначе применяется ограничение
// к примеру у типа number нет свойства length
function lIdentity<T extends Length>(arg: T): T {
  console.log(arg.length);  
  return arg;
};
// lIdentity(1); // Argument of type '1' is not assignable to parameter of type 'Length'.
lIdentity([1,2,3]);
lIdentity('sfsdfds');


// Использование параметров типа в ограничениях
// ограничение на второй параметр типа
// тип K может быть только ключем типа T
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
};
let x = { a: 1, b: 2, c: 3, d: 4 };
console.log(getProperty(x, "a"));
// console.log(getProperty(x, "m")); // Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'.


// Использование типов классов в обобщениях
// Реализуя паттерн "фабрика" с использованием обобщений, необходимо указывать на тип класса с помощью его функции-конструктора. К примеру,
// function create<T>(c: {new(): T; }): T {
//   return new c();
// }

class BeeKeeper {
  hasMask: boolean = false;
};
class ZooKeeper {
  nametag: string = "tag";
};
class Animal {
  numLegs: number;
};
class Bee extends Animal {
  keeper: BeeKeeper = new BeeKeeper();
};
class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper();
};
// для того, чтобы новый объект в коде обобщений был доступен
// необходимо указать, что обобщенный тип T имеет конструктор (через new)
function createInstance<TAnimal extends Animal>(c: new () => TAnimal): TAnimal {
  return new c();
};
console.log(createInstance(Lion).keeper.nametag); // tag
console.log(createInstance(Bee).keeper.hasMask); // false