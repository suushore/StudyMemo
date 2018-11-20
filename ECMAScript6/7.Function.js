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
// function m1({x = 0, y = 0} = {}) {
//   return [x, y];
// }
// // 写法二
// function m2({x, y} = { x: 0, y: 0 }) {
//   return [x, y];
// }
// console.log(
//   // fetch1('http://example.com'),//TypeError: Cannot destructure property `body` of 'undefined' or 'null'.
//   // fetch2('http://example.com'),//GET
//   m1({x: 3}), m2({x: 3}),//[ 3, 0 ] [ 3, undefined ]
// )
// #### (3)、参数默认值的位置
// 通常情况下，定义了默认值的参数，应该是函数的尾参数。
// #### (4)、函数的 length 属性
// 含义是，该函数预期传入的参数个数。某个参数指定默认值以后，预期传入的参数个数就不包括这个参数了。
// (function (a = 0, b, c) {}).length // 0
// (function (a, b = 1, c) {}).length // 1
// #### (5)、作用域