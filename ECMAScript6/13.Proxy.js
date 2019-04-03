// Proxy

// # 1.概述
// 在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截
// let proxy = new Proxy(target, handler);
// var object = { proxy: new Proxy(target, handler) };

// # 2.Proxy 支持的拦截操作
// ## 2.1 get方法用于拦截某个属性的读取操作
// const proxy = new Proxy({}, {
//   get: function(target, property, receiver) {
//     return receiver;
//   }
// });
// const d = Object.create(proxy);
// d.a === d // true
// ## 2.2 set方法用来拦截某个属性的赋值操作
// const handler = {
//   get (target, key) {
//     invariant(key, 'get');
//     return target[key];
//   },
//   set (target, key, value) {
//     invariant(key, 'set');
//     target[key] = value;
//     return true;
//   }
// };
// function invariant (key, action) {
//   if (key[0] === '_') {
//     throw new Error(`Invalid attempt to ${action} private "${key}" property`);
//   }
// }
// const target = {};
// const proxy = new Proxy(target, handler);
// proxy._prop
// // Error: Invalid attempt to get private "_prop" property
// proxy._prop = 'c'
// // Error: Invalid attempt to set private "_prop" property
// ## 2.3 apply方法拦截函数的调用、call和apply操作
// apply (targetFun, ctx, args) {}
// var twice = {
//   apply (target, ctx, args) {
//     return Reflect.apply(...arguments) * 2;
//   }
// };
// function sum (left, right) {
//   return left + right;
// };
// var proxy = new Proxy(sum, twice);
// proxy(1, 2) // 6
// proxy.call(null, 5, 6) // 22
// proxy.apply(null, [7, 8]) // 30
// ## 2.4 has方法用来拦截HasProperty操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是in运算符。
// var handler = {
//   has (target, key) {
//     if (key[0] === '_') {
//       return false;
//     }
//     return key in target;
//   }
// };
// var target = { _prop: 'foo', prop: 'foo' };
// var proxy = new Proxy(target, handler);
// '_prop' in proxy // false
// has拦截只对in运算符生效，对for...in循环不生效
// ## 2.5 construct方法用于拦截new命令
// var handler = {
//   construct (target, args, newTarget) {
//     return new target(...args);
//   }
// };
// ## 2.6 deleteProperty方法用于拦截delete操作
// var handler = {
//   deleteProperty (target, key) {
//     if (key[0] === '_') {
//       throw new Error(`Invalid attempt to ${action} private "${key}" property`);
//     }
//     delete target[key];
//     return true;
//   }
// };
// ## 2.7 defineProperty方法拦截了Object.defineProperty操作
// var handler = {
//   defineProperty (target, key, descriptor) {
//     return false;
//   }
// };
// var target = {};
// var proxy = new Proxy(target, handler);
// proxy.foo = 'bar' // 不会生效
// ## 2.8 getOwnPropertyDescriptor方法拦截Object.getOwnPropertyDescriptor()
// ## 2.9 getPrototypeOf方法主要用来拦截获取对象原型。拦截下面这些操作:
// Object.prototype.__proto__
// Object.prototype.isPrototypeOf()
// Object.getPrototypeOf()
// Reflect.getPrototypeOf()
// instanceof
// var proto = {};
// var p = new Proxy({}, {
//   getPrototypeOf(target) {
//     return proto;
//   }
// });
// Object.getPrototypeOf(p) === proto // true
// ## 2.10 isExtensible方法拦截Object.isExtensible操作
// ## 2.11 ownKeys方法用来拦截对象自身属性的读取操作。具体来说，拦截以下操作
// Object.getOwnPropertyNames()
// Object.getOwnPropertySymbols()
// Object.keys()
// for...in循环
// ## 2.12 preventExtensions方法拦截Object.preventExtensions()
// ## 2.13 setPrototypeOf方法主要用来拦截Object.setPrototypeOf方法

// # 3.Proxy.revocable()
//     返回一个可取消的 Proxy 实例
// let target = {};
// let handler = {};
// let {proxy, revoke} = Proxy.revocable(target, handler);
// proxy.foo = 123;
// proxy.foo // 123
// revoke();
// proxy.foo // TypeError: Revoked
// 使用场景是，目标对象不允许直接访问，
// 必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。

// # 4.this 问题
// Proxy 代理的情况下，目标对象内部的this关键字会指向 Proxy 代理
// const target = new Date();
// const handler = {};
// const proxy = new Proxy(target, handler);
// proxy.getDate();
// // TypeError: this is not a Date object.
// // 这时，this绑定原始对象，就可以解决这个问题
// const handler = {
//   get(target, prop) {
//     if (prop === 'getDate') {
//       return target.getDate.bind(target);
//     }
//     return Reflect.get(target, prop);
//   }
// };
