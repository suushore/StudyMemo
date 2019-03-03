// ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。
// 就是说，对象的属性名现在可以有两种类型,一种是字符串类型，另一种就是 Symbol 类型。
// 凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。
// Symbol 值不是对象，Symbol函数前不能使用new命令，它是一种类似于字符串的数据类型。
// Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述,为了可读.
// let s1 = Symbol('foo');
// let s2 = Symbol('bar');
// s1 // Symbol(foo)
// s2 // Symbol(bar)
// s1.toString() // "Symbol(foo)"
// s2.toString() // "Symbol(bar)"
// 相同参数的Symbol函数的返回值是不相等的。
// Symbol 值不能与其他类型的值进行运算，会报错。
// Symbol 值可以显式转为字符串,布尔值，但是不能转为数值。

// # 2.作为属性名的 Symbol
// 能防止某一个键被不小心改写或覆盖。
// 注意，Symbol 值作为对象属性名时，不能用点运算符。
// 因为点运算符后面总是字符串，导致a的属性名实际上是一个字符串，而不是一个 Symbol 值。
// const mySymbol = Symbol();
// a[mySymbol]
// 在对象的内部，Symbol 值必须放在方括号之中。
// let s = Symbol();
// let obj = {
//   [s]: function (arg) { ... }
// };
// obj[s](123);

// # 3.实例：消除魔术字符串
// 魔术字符串指的是，在代码之中多次出现、
// 与代码形成强耦合的某一个具体的字符串或者数值。风格良好的代码，应该尽量消除魔术字符串，改由含义清晰的变量代替。
// const shapeType = {
//   triangle: Symbol()
// };
// function getArea(shape, options) {
//   let area = 0;
//   switch (shape) {
//     case shapeType.triangle:
//       area = .5 * options.width * options.height;
//       break;
//   }
//   return area;
// }
// getArea(shapeType.triangle, { width: 100, height: 100 });

// # 4.属性名的遍历
// Symbol 作为属性名，不会出现在for...in、for...of循环,
// 也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回
// 用Object.getOwnPropertySymbols方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。
// 由于以 Symbol 值作为名称的属性，不会被常规方法遍历得到。我们
// 可以利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法。

// # 5.Symbol.for()，Symbol.keyFor()
// let s1 = Symbol.for('foo');
// let s2 = Symbol.for('foo');
// s1 === s2 // true
// Symbol.for()与Symbol()这两种写法，都会生成新的 Symbol。
// 它们的区别是，前者会被登记在 全局环境 中供搜索，后者不会。
// Symbol.keyFor方法返回一个已登记的 Symbol 类型值的key。

// # 6.实例：模块的 Singleton 模式
// Singleton 模式指的是调用一个类，任何时候返回的都是同一个实例。
// mod.js
// const FOO_KEY = Symbol.for('foo');
// function A() {
//   this.foo = 'hello';
// }
// if (!global[FOO_KEY]) {
//   global[FOO_KEY] = new A();
// }
// module.exports = global[FOO_KEY];
// 上面代码中，可以保证global[FOO_KEY]不会被无意间覆盖，但还是可以被改写。

// # 7.内置的 Symbol 值
// (1)Symbol.hasInstance属性,指向一个内部方法。当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法。
// foo instanceof Foo在语言内部，实际调用的是Foo[Symbol.hasInstance](foo)
// const Even = {
//   [Symbol.hasInstance](obj) {
//     return Number(obj) % 2 === 0;
//   }
// };
// 1 instanceof Even // false
// 2 instanceof Even // true
// 12345 instanceof Even // false
// (2)Symbol.isConcatSpreadable属性,表示该对象用于Array.prototype.concat()时，是否可以展开。
// 数组的默认行为是可以展开，数组的对象正好相反，默认不展开,为true，才可以展开。
// (3)Symbol.species属性，指向一个构造函数。创建衍生对象时，会使用该属性。
// class T1 extends Promise {
// }
// class T2 extends Promise {
//   static get [Symbol.species]() {
//     return Promise;
//   }
// }
// new T1(r => r()).then(v => v) instanceof T1 // true
// new T2(r => r()).then(v => v) instanceof T2 // false
// (4)Symbol.match属性，指向一个函数。当执行str.match(myObject)时，如果该属性存在，会调用它，返回该方法的返回值。
// class MyMatcher {
//   [Symbol.match](string) {
//     return 'hello world'.indexOf(string);
//   }
// }
// 'e'.match(new MyMatcher()) // 1
// new T2(r => r()).then(v => v) instanceof T2 // false
// (5) Symbol.replace属性，指向一个方法，当该对象被String.prototype.replace方法调用时，会返回该方法的返回值。
// (6) Symbol.search属性
// (7) Symbol.split属性
// (8) Symbol.iterator属性，指向该对象的默认遍历器方法。
// 对象进行for...of循环时，会调用Symbol.iterator方法，返回该对象的默认遍历器
// (9) Symbol.toPrimitive属性，指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。
// let obj = {
//   [Symbol.toPrimitive](hint) {
//     switch (hint) {
//       case 'number':
//         return 123;
//       case 'string':
//         return 'str';
//       case 'default':
//         return 'default';
//       default:
//         throw new Error();
//      }
//    }
// };
// 2 * obj // 246
// 3 + obj // '3default'
// obj == 'default' // true
// String(obj) // 'str'
// (10) Symbol.toStringTag属性，指向一个方法。
// 调用Object.prototype.toString方法时，如果这个属性存在，它的返回值
// 会出现在toString方法返回的字符串之中，表示对象的类型
// 可以用来定制[object Object]或[object Array]中object后面的那个字符串。
// (11) Symbol.unscopables属性，指向一个对象。该对象指定了使用with关键字时，哪些属性会被with环境排除。
