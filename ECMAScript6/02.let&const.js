// let 命令

// 1.let命令在代码块内有效

// {
// let a = 10;
// var b = 1;
// }
// console.log(a)//ReferenceError: a is not defined
// console.log(b);//1

// var a = [];
// for (var i = 0; i < 10; i++) {
// a[i] = function () {
// console.log(i);
// };
// }
// console.log(a[6].toString()) // function () {console.log(i);}
// console.log(i) //此时全局i=10;
// a[6](); // 10

// var a = [];
// for (let i = 0; i < 10; i++) {
//   a[i] = function () {
//     console.log(i);
//   };
// }
// console.log(a[6].toString()) // function () {console.log(i);}
// console.log(i) //ReferenceError: i is not defined
// //JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量i时，就在上一轮循环的基础上进行计算。
// //自己理解：a[6]=function () {let i = 6;console.log(i);},i被存入函数块内
// a[6](); // 6

//2.循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。
// for (let i = 0; i < 3; i++) {
//   let i = 'abc';
//   console.log(i);
// }
// abc
// abc
// abc

//3.不存在变量提升

// console.log(bar);
// let bar = 2;//ReferenceError: bar is not defined

// 4.暂时性死区
// 只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

// var tmp = 123;
// if (true) {
//   tmp = 'abc'; //OK
// }

// var tmp = 123;
// if (true) {
//   tmp = 'abc';
//   console.log(tmp) //ReferenceError: tmp is not defined
//   let tmp;
// }

// 5.不允许重复声明
// {
//   let a = 10;
//   var a = 1;//SyntaxError: Identifier 'a' has already been declared
// }

// {
//   let a = 10;
//   let a = 1;//SyntaxError: Identifier 'a' has already been declared
// }

// (function func(arg) {
// let arg; //SyntaxError: Identifier 'arg' has already been declared
// }())

// (function func(arg) {
//   {
//     let arg; //OK
//   }
// }())

// 6.块级作用域作用
// 没有块级作用域，
// 1.内层变量可能会覆盖外层变量。
// var tmp = new Date();
// function f() {
//   console.log(tmp);
//   if (false) {
//     var tmp = 'hello world';//tmp提升到console.log(tmp)上方
//   }
// }
// f(); // undefined
// 2.用来计数的循环变量泄露为全局变量。

//let实际上为 JavaScript 新增了块级作用域。

//块级作用域可代替立即执行函数表达式（IIFE）

// 7. 函数能不能在块级作用域之中声明
// 在浏览器的 ES6 环境中，块级作用域内声明的函数，行为类似于var声明的变量。
// 。。。允许在块级作用域内声明函数。
// 。。。函数声明类似于var，即会提升到全局作用域或函数作用域的头部。
// 。。。同时，函数声明还会提升到所在的块级作用域的头部。

// function f() {console.log('I am outside!');}
// if (true) {
//   function f() {
//     console.log('I am inside!');
//   }
// }
// f() //I am inside!

// function f() {console.log('I am outside!');} 
// {
//   if (false) {
//     function f() {
//       console.log('I am inside!');
//     }
//   }
//   f()
// };//I am outside!

// function f() {console.log('I am outside!');} 
// (function (){
//   if (false) {
//     function f() {
//       console.log('I am inside!');
//     }
//   }
//   f()
// }());//TypeError: f is not a function

// 因为实际运行的是下面的代码
// function f() { console.log('I am outside!'); }
// (function () {
//   var f = undefined;
//   if (false) {
//     function f() { console.log('I am inside!'); }
//   }
//   f();
// }());
// // 如果没有使用大括号，就会报错。
// 'use strict';
// if (true)
//   function f() {}//严格模式报错，SyntaxError: In strict mode code, functions can only be declared at top level or inside a block.







// const 命令
//const声明一个只读的常量。一旦声明变量，必须立即初始化,不能改变。其余与let类似。

// const PI = 3.1415;
// console.log(PI) // 3.1415
// PI = 3;//TypeError: Assignment to constant variable.
// const PI;//SyntaxError: Missing initializer in const declaration

// const arr = [1,2,3];
// console.log(arr) // [1,2,3]
// arr[0] = 3;
// console.log(arr) // [ 3, 2, 3 ]
// arr = [2,2,3]; //TypeError: Assignment to constant variable.

// const实际上保证的，是变量指向的那个内存地址所保存的数据不得改动。对于复合类型的数据（主要是对象和数组），保存的只是一个指向实际数据的指针，const只能保证这个指针是固定的，至于它指向的数据结构是不是可变的，就完全不能控制了。

// 如果真的想将对象冻结，应该使用Object.freeze方法。
// 'use strict';
// const foo = Object.freeze({});
// foo.prop = 123;//TypeError: Cannot add property prop, object is not extensible
// 因此，将一个对象声明为常量必须非常小心。



// 顶层对象,全局变量将与顶层对象的属性脱钩
// let a = 1;
// console.log(global.a)//undefined
// console.log(a)//1