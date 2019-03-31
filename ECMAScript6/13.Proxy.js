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
