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
// 形式为 ...变量名 ,用于获取函数的多余参数。之后不能再有其他参数。

// // arguments变量的写法
// function sortNumbers() {
//   return Array.prototype.slice.call(arguments).sort();
// }

// // rest参数的写法
// const sortNumbers = (...numbers) => numbers.sort();

// 函数的length属性，不包括 rest 参数。
// (function(a, ...b) {}).length  // 1


// ## 3.严格模式
// 函数参数“ 如果使用默认值、解构赋值、或者扩展运算符 ” ，“ 函数内部 ” 就不能显式设定为严格模式。
// 两种方法可以规避这种限制。
// 第一种是设定全局性的严格模式
// 'use strict';
// function doSomething(a, b = a) {
//   // code
// }
// 第二种是把函数包在一个无参数的立即执行函数里面。
// const doSomething = (function () {
// 'use strict';
// return function(value = 42) {
// return value;
// };
// }());


// ## 4.name 属性
// function foo() {};
// var f = function () {};
// const bar = function baz() {};
// console.log(
//   foo.name,//foo
//   f.name,//f
//   bar.name,//baz
//   (new Function).name,//anonymous(adj,匿名的)
//   foo.bind({}).name,//bound foo
// )



// ## 5.箭头函数
// var sum = (num1, num2) => { return num1 + num2; }
// // 等同于
// var sum = function (num1, num2) {
//   return num1 + num2;
// };

// ### 5.1 参数只有一个，可以不用圆括号
// var sum = num1 => { return num1 + 1 }

// ### 5.2 代码块部分只有一句，省略大括号和return
// var sum = (num1, num2) => num1 + num2;

// ### 5.3 直接返回一个对象，必须在对象外面加上括号
// let getTempItem = id => ({ id: id, name: "Temp" });

// ### 5.4 与变量解构结合
// const full = ({ first, last }) => first + ' ' + last;

// ### 5.5 与rest 参数结合
// const headAndTail = (head, ...tail) => [head, tail];
// console.log(
//   headAndTail(1, 2, 3, 4, 5)
// )//[ 1, [ 2, 3, 4, 5 ] ]

// ### 5.6 使用注意点
// （1）this对象是 定义时 所在的对象
// function foo() {
//   setTimeout(() => {
//     console.log('id:', this.id);
//   }, 100);
// }
// var id = 21;
// console.log(
//   foo.call({ id: 42 })//id: 42
// )
// （1.1）this指向的固定化，
// 并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，
// 导致内部的this就是外层代码块的this。正是因为它没有this，所以也就不能用作构造函数。
// // ES6
// function foo() {
//   setTimeout(() => {
//     console.log('id:', this.id);
//   }, 100);
// }
// // ES5
// function foo() {
//   var _this = this;
//   setTimeout(function () {
//     console.log('id:', _this.id);//箭头函数根本没有自己的this
//   }, 100);
// }
// （2）不可以当作构造函数
// （3）不可以使用arguments对象,用 rest 参数代替
// （4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
// （5）箭头函数没有this、arguments、super、new.target，
//      当然也就不能用call()、apply()、bind()这些方法去改变this的指向。
// （6）不适用场合
// （6.1）定义对象的方法，且该方法内部包括this。
// const cat = {
//   lives: 9,
//   jumps: () => {
//     this.lives--;//this指向全局对象
//   }
// }
// （6.2）cat.jumps()//this对象是 定义时 所在的对象，this指向全局对象
// 需要动态this的时候
// var button = document.getElementById('press');
// button.addEventListener('click', () => {
//   this.classList.toggle('on');//this指向全局对象
// });

// ### 5.7 嵌套的箭头函数
// const pipeline = (...funcs) => {
//   return val => { 
//     return funcs.reduce((a, b) => b(a), val)
//   }
// }
// const plus1 = a => a + 1;
// const mult2 = a => a * 2;
// const addThenMult = pipeline(plus1, mult2);

// addThenMult(5) // 12



// ## 6.双冒号运算符(提案)
// 箭头函数可以绑定this对象,但箭头函数并不适用于所有场合
// 提出了“函数绑定”（function bind）运算符，用来取代call、apply、bind调用。
// 函数绑定运算符是并排的两个冒号（::），双冒号左边是一个对象，右边是一个函数。
// 该运算符会自动将左边的对象，作为上下文环境（即this对象），绑定到右边的函数上面。

// foo::bar;
// // 等同于
// bar.bind(foo);

// foo::bar(...arguments);
// // 等同于
// bar.apply(foo, arguments);

// var method = obj::obj.foo;
// // 等同于
// var method = ::obj.foo;

// 如果双冒号运算符的运算结果，还是一个对象，就可以采用链式写法。



// ## 7.尾调用优化
// 尾调用指某个函数的最后一步是调用另一个函数。
// “尾调用优化”（Tail call optimization），即只保留内层函数的调用帧。
// 尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，
// 因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了。
// 注意，只有不再用到外层函数的内部变量，内层函数的调用帧才会取代外层函数的调用帧，否则就无法进行“尾调用优化”。

// ### 7.1 尾递归
// 递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）。
// 但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。
// 比较著名的例子，就是计算 Fibonacci 数列，也能充分说明尾递归优化的重要性。
// function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
//   if( n <= 1 ) {return ac2};
//   return Fibonacci2 (n - 1, ac2, ac1 + ac2);
// }
// Fibonacci2(100) // 573147844013817200000
// Fibonacci2(1000) // 7.0330367711422765e+208
// Fibonacci2(10000) // Infinity
// ES6 中只要使用尾递归，就不会发生栈溢出，相对节省内存。

// ### 7.2 递归函数的改写
// 尾递归的实现，需要把 所有用到的内部变量改写成函数的参数 。
// 阶乘函数 factorial 需要用到一个中间变量total，那就把这个中间变量改写成函数的参数。
// function factorial(n, total) {
//   if (n === 1) return total;
//   return factorial(n - 1, n * total);
// }
// factorial(5, 1) // 120,只存在一个调用帧，所以永远不会发生“栈溢出”错误。
// 这样做的缺点就是不太直观，第一眼很难看出来，为什么计算5的阶乘，需要传入两个参数5和1？
// 采用 ES6 的函数默认值改写
// function factorial(n, total = 1) {
//   if (n === 1) return total;
//   return factorial(n - 1, n * total);
// }
// factorial(5) // 120
// 纯粹的函数式编程语言没有循环操作命令，所有的循环都用递归实现，这就是为什么尾递归对这些语言极其重要；
// 其他语言（比如 Lua，ES6），只需要知道循环可以用递归代替，而一旦使用递归，就最好使用尾递归。

// ### 7.3 ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。

// ### 7.4 不支持该功能的环境中，自己实现尾递归优化
// 方法：采用“循环”换掉“递归”，减少调用栈，就不会溢出。
// 普通递归函数：
// function sum(x, y) {
//   if (y > 0) {
//     return sum(x + 1, y - 1);
//   } else {
//     return x;
//   }
// }
// sum(1, 100000)//RangeError: Maximum call stack size exceeded
// 改写为每一步返回另一个函数：
// function trampoline(f) {
//   while (f && f instanceof Function) {
//     f = f();
//   }
//   return f;
// }
// function sum(x, y) {
//   if (y > 0) {
//     return sum.bind(null, x + 1, y - 1);
//   } else {
//     return x;
//   }
// }
// console.log(
//   trampoline(sum(1, 100000))//100001,不会发生调用栈溢出。
// )


// ## 8.函数参数的尾逗号
// ES2017 允许函数的最后一个参数有尾逗号（trailing comma）
function clownsEverywhere(
  param1,
  param2,
) {
  console.log(
    param1,
    param2,
  )
}
clownsEverywhere(
  'foo',
  'bar',
);//foo bar
// 至此，函数参数、数组、对象的尾逗号规则，保持一致了。