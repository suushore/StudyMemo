// Reflect
// # 1.概述
// （1） 将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。
// （2） 修改某些Object方法的返回结果，让其变得更合理。
// （3） 让Object操作都变成函数行为。
// （4）Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法
// var loggedObj = new Proxy(obj, {
//   get(target, name) {
//     console.log('get', target, name);
//     return Reflect.get(target, name);
//   },
//   deleteProperty(target, name) {
//     console.log('delete' + name);
//     return Reflect.deleteProperty(target, name);
//   },
//   has(target, name) {
//     console.log('has' + name);
//     return Reflect.has(target, name);
//   }
// });
// # 2.静态方法
// Reflect.apply(target, thisArg, args)
// Reflect.construct(target, args)
// Reflect.get(target, name, receiver)
// Reflect.set(target, name, value, receiver)
// Reflect.defineProperty(target, name, desc)
// Reflect.deleteProperty(target, name)
// Reflect.has(target, name)
// Reflect.ownKeys(target)
// Reflect.isExtensible(target)
// Reflect.preventExtensions(target)
// Reflect.getOwnPropertyDescriptor(target, name)
// Reflect.getPrototypeOf(target)
// Reflect.setPrototypeOf(target, prototype)
// 大部分与Object对象的同名方法的作用都是相同的，而且它与Proxy对象的方法是一一对应的。

// # 2.1 Reflect.get(target, name, receiver)方法查找并返回target对象的name属性，如果没有该属性，则返回undefined。
// var myObject = {
//   foo: 1,
//   bar: 2,
//   get baz() {
//     return this.foo + this.bar;
//   },
// };
// var myReceiverObject = {
//   foo: 4,
//   bar: 4,
// };
// Reflect.get(myObject, 'baz', myReceiverObject) // 8

// # 2.2 Reflect.set(target, name, value, receiver)设置target对象的name属性等于value
// 如果 Proxy对象和 Reflect对象联合使用，前者拦截赋值操作，后者完成赋值的默认行为，
// // 而且传入了receiver，那么Reflect.set会触发Proxy.defineProperty拦截。
// let p = {
//   a: 'a'
// };
// let handler = {
//   set(target, key, value, receiver) {
//     console.log('set');
//     Reflect.set(target, key, value, receiver)
//   },
//   defineProperty(target, key, attribute) {
//     console.log('defineProperty');
//     Reflect.defineProperty(target, key, attribute);
//   }
// };
// let obj = new Proxy(p, handler);
// obj.a = 'A';
// // set
// // defineProperty

// # 2.3 Reflect.has(obj, name)对应name in obj里面的in运算符
// 'foo' in myObject === Reflect.has(myObject, 'foo')

// # 2.4 Reflect.deleteProperty(obj, name)等同于delete obj[name]，用于删除对象的属性

// # 2.5 Reflect.construct(target, args)等同于new target(...args)，这提供了一种不使用new，来调用构造函数的方法。
// // new 的写法
// const instance = new Greeting('张三');
// // Reflect.construct 的写法
// const instance = Reflect.construct(Greeting, ['张三']);

// # 2.6 Reflect.getPrototypeOf(obj)用于读取对象的__proto__属性，对应Object.getPrototypeOf(obj)
// Reflect.getPrototypeOf(new FancyThing()) === FancyThing.prototype;

// # 2.6 Reflect.setPrototypeOf(obj, newProto)用于设置目标对象的原型（prototype），对应Object.setPrototypeOf(obj, newProto)方法
// Reflect.setPrototypeOf(myObj, Array.prototype);

// # 2.7 Reflect.apply(func, thisArg, args)
// 等同于Function.prototype.apply.call(func, thisArg, args)，用于绑定this对象后执行给定函数
// 如果要绑定一个函数的this对象，可以这样写fn.apply(obj, args)
// 但是如果函数定义了自己的apply方法，就只能写成
// Function.prototype.apply.call(func, thisObj, args)
// Reflect.apply(Object.prototype.toString, Reflect.apply(Math.min, Math, [11, 33, 12, 54, 18, 96]), []);

// # 2.8 Reflect.defineProperty(target, propertyKey, attributes)基本等同于Object.defineProperty
// const p = new Proxy({}, {
//   defineProperty(target, prop, descriptor) {
//     console.log(descriptor);
//     return Reflect.defineProperty(target, prop, descriptor);
//   }
// });

// # 2.9 Reflect.getOwnPropertyDescriptor(target, propertyKey)
// 基本等同于Object.getOwnPropertyDescriptor
// 用于得到指定属性的描述对象

// # 2.10 Reflect.isExtensible (target)表示当前对象是否可扩展
// const myObject = {};
// // 旧写法
// Object.isExtensible(myObject) // true
// // 新写法
// Reflect.isExtensible(myObject) // true

// # 2.11 Reflect.preventExtensions(target)对应Object.preventExtensions方法，用于让一个对象变为不可扩展

// # 2.12 Reflect.ownKeys (target)
// 基本等同于Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和
// var myObject = {
//   foo: 1,
//   bar: 2,
//   [Symbol.for('baz')]: 3,
//   [Symbol.for('bing')]: 4,
// };
// // 旧写法
// Object.getOwnPropertyNames(myObject)
// // ['foo', 'bar']
// Object.getOwnPropertySymbols(myObject)
// //[Symbol(baz), Symbol(bing)]
// // 新写法
// Reflect.ownKeys(myObject)
// // ['foo', 'bar', Symbol(baz), Symbol(bing)]

// # 2.使用 Proxy 实现观察者模式
// const queuedObservers = new Set();
// const observe = fn => queuedObservers.add(fn);
// const observable = obj => new Proxy(obj, {set});
// function set(target, key, value, receiver) {
//   const result = Reflect.set(target, key, value, receiver);//完成默认操作
//   queuedObservers.forEach(observer => observer());//观察者动作
//   return result;
// }

// const person = observable({
//   name: '张三',
//   age: 20
// });
// function print() {
//   console.log(`${person.name}, ${person.age}`)
// }
// observe(print);
// person.name = '李四';
