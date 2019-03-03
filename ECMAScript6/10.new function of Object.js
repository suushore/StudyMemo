// ## 对象的新增方法

// ## 1.Object.is()
// 用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致,不同之处只有两个：一是+0不等于-0，二是NaN等于自身。
// console.log(
// Object.is('foo', 'foo'),
// Object.is({}, {}),
// Object.is({1:2}, {1:2}),
// Object.is(+0, -0),
// Object.is(NaN, NaN),
// )//true false false false true

// ## 2.Object.assign()
// 用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
// const target = { a: 1 };
// const source1 = { b: 2 };
// const source2 = { c: 3 };
// Object.assign(target, source1, source2);
// console.log(target) // {a:1, b:2, c:3}
// 有同名属性，则后面的属性会覆盖前面的属性。
// const target = { a: 1, b: 1 };
// const source1 = { b: 2, c: 2 };
// const source2 = { c: 3 };
// Object.assign(target, source1, source2);
// console.log(target) // {a:1, b:2, c:3}
// 如果只有一个参数，Object.assign会直接返回该参数。
// const obj = {a: 1};
// console.log(Object.assign(obj)) // { a: 1 }
// 数不是对象，则会先转成对象
// const obj = 2;
// console.log(Object.assign(obj).toString()) // 2
// console.log(typeof Object.assign(obj)) // { object }
// undefined和null无法转成对象，所以如果它们作为参数，就会报错
// 非对象参数出现在源对象的位置,都会转成对象，如果无法转成对象，就会跳过
// let obj = { a: 1 };
// console.log(
//   Object.assign(obj, undefined) === obj, // true
//   Object.assign(obj, null) === obj // true
// )
// const v1 = 'abc';
// const v2 = true;
// const v3 = 10;
// const obj = Object.assign({}, v1, v2, v3);
// console.log(obj);//{ '0': 'a', '1': 'b', '2': 'c' }
// Object.assign拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（enumerable: false）。
// 注意点
// （1）浅拷贝，也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。
// （2）同名属性的替换
// （3）把数组视为对象
// （4）如果要复制的值是一个取值函数，那么将求值后再复制。
// 用途
// （1）为对象添加属性
// class Point {
//   constructor(x, y) {
//     Object.assign(this, {x, y});
//   }
// }
// （2）为对象添加方法
// Object.assign(SomeClass.prototype, {
//   someMethod(arg1, arg2) {
//     ···
//   },
//   anotherMethod() {
//     ···
//   }
// });
// // 等同于下面的写法
// SomeClass.prototype.someMethod = function (arg1, arg2) {
//   ···
// };
// SomeClass.prototype.anotherMethod = function () {
//   ···
// };
// （3）克隆对象
// function clone(origin) {
//   return Object.assign({}, origin);
// }
// （4）合并多个对象
// const merge = (...sources) => Object.assign({}, ...sources);
// （5）为属性指定默认值
// const DEFAULTS = {
//   logLevel: 0,
//   outputFormat: 'html'
// };
// function processContent(options) {
//   options = Object.assign({}, DEFAULTS, options);
//   console.log(options);
// }

// ## 3.Object.getOwnPropertyDescriptors() 
// 返回指定对象所有自身属性（非继承属性）的描述对象
// const obj = {
//   foo: 123,
//   get bar() { return 'abc' }
// };

// Object.getOwnPropertyDescriptors(obj)
// { foo:
//    { value: 123,
//      writable: true,
//      enumerable: true,
//      configurable: true },
//   bar:
//    { get: [Function: get bar],
//      set: undefined,
//      enumerable: true,
//      configurable: true } }

// ## 4.__proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()
// __proto__用来读取或设置当前对象的prototype对象，最好使用下面的
// Object.setPrototypeOf()（写操作）、Object.getPrototypeOf()（读操作）、Object.create()（生成操作）代替
// Object.setPrototypeOf方法用来设置一个对象的prototype对象（原型对象），返回参数对象本身。
// let proto = {};
// let obj = { x: 10 };
// Object.setPrototypeOf(obj, proto);
// proto.y = 20;
// proto.z = 40;
// obj.x // 10
// obj.y // 20
// obj.z // 40
// Object.setPrototypeOf方法用于读取一个对象的原型对象。

// ## 5.Object.keys()，Object.values()，Object.entries()
// Object.keys()，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。
// Object.values()，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。
// Object.entries()，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。
// var obj = { foo: 'bar', baz: 42 };
// Object.keys(obj)// ["foo", "baz"]
// let {keys, values, entries} = Object;
// let obj = { a: 1, b: 2, c: 3 };
// for (let key of keys(obj)) {
//   console.log(key); // 'a', 'b', 'c'
// }
// for (let value of values(obj)) {
//   console.log(value); // 1, 2, 3
// }
// for (let [key, value] of entries(obj)) {
//   console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
// }

// ## 6.Object.fromEntries()方法
// 是Object.entries()的逆操作，用于将一个键值对数组转为对象。
