// # 函数的扩展


// ## 1.参数的默认值

// #### (1)、ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面。
// function Point(x = 0, y = 0) {
//   this.x = x;
//   this.y = y;
// }
// const p = new Point();
// console.log(p)//{ x: 0, y: 0 }

// #### (2)、与解构赋值默认值结合使用
// function fetch1(url, { body = '', method = 'GET', headers = {} }) {
//   console.log(method);
// }
// function fetch2(url, { body = '', method = 'GET', headers = {} } = {}) {
//   console.log(method);
// }
// // 写法一
// function m1({x = 0, y = 0} = {}) { //参数为{x = 0, y = 0}，默认值为{}
//   return [x, y];
// }                                                              
// // 写法二
// function m2({x, y} = { x: 0, y: 0 }) { ////参数为{x，y}，默认值为{ x: 0, y: 0 }
//   return [x, y];
// }
// console.log(
//   // fetch1('http://example.com'),//TypeError: Cannot destructure property `body` of 'undefined' or 'null'.
//   // fetch2('http://example.com'),//GET
//   m1({x: 3}), m2({x: 3}),//[ 3, 0 ] [ 3, undefined ]    //比较写法一、写法二，前者更好，默认值宜早不宜迟。
// )

// #### (3)、参数默认值的位置
// 通常情况下，定义了默认值的参数，应该是函数的尾参数。

// #### (4)、函数的 length 属性
// 含义是，该函数预期传入的参数个数。某个参数指定默认值以后，预期传入的参数个数就不包括这个参数了。
// (function (a = 0, b, c) {}).length // 0
// (function (a, b = 1, c) {}).length // 1

// #### (5)、作用域
// 设置参数的默认值，还要注意块作用域的问题。
// 如果参数的默认值是一个函数，该函数的作用域也遵守这个规则。
// var x = 1;//作用域1
// function foo(x/*作用域2*/, y = function() { x = 2; }) {
//   var x = 3;/*作用域3*/
//   y();
//   console.log(x);
// }

// #### (6)、参数默认值的应用
// 指定某一个参数不得省略，如果省略就抛出一个错误。
// function throwIfMissing() {
//   throw new Error('Missing parameter');
// }
// function foo(mustBeProvided = throwIfMissing()) {////如果参数已经赋值，默认值中的函数就不会运行。
//   return mustBeProvided;
// }
// console.log(
//   foo()
// )// Error: Missing parameter


// ## 2.rest 参数
// 形式为 ...变量名 ,用于获取函数的多余参数。
// // arguments变量的写法
// function sortNumbers() {
//   return Array.prototype.slice.call(arguments).sort();
// }
// // rest参数的写法
// const sortNumbers = (...numbers) => numbers.sort();