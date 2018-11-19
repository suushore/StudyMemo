// #数值的扩展
'use strict';


// ## 1.二进制和八进制 新方法 add
// 前缀0b（或0B）和0o（或0O）。。。binary,octonary/octor,decimal,hexadecimal/hex
// console.log(
//   Number('0b111'),
//   Number('0o10')
// )//7 8


// ## 2.// Number.isFinite(), Number.isNaN(),这两个新方法  只对数值有效  。
//Number.isFinite()对于非数值一律返回false, Number.isNaN()只有对于NaN才返回true，非NaN一律返回false。
// 传统的  ES5  全局方法isFinite()和isNaN()先调用Number()将  非数值的值转为数值   ，再进行判断
// console.log(
//   Number.isFinite(15),
//   Number.isFinite(NaN),
//   Number.isFinite('15'),
//   Number.isFinite(true),
//   Number.isFinite(Infinity),
//   Number.isFinite(-Infinity)
// )//true false false false false false
// console.log(
//   Number.isNaN(15),//false
//   Number.isNaN("15"),//false
//   Number.isNaN(true),//false
//   Number.isNaN(Infinity),//false
//   Number.isNaN(-Infinity),//false
//   Number.isNaN(-NaN),//true
//   Number.isNaN(NaN),//true
//   Number.isNaN('aaa' / 0), 
//   //true
//   Number.isNaN(1 / 0),//false
//   'aaa' / 0,
//   //NaN
//   1 / 0,//Infinity
// )


// ## 3.全局方法parseInt()和parseFloat()，移植到Number对象上面,,,Number.parseInt(), Number.parseFloat()


// ## 4.Number.isInteger() ,判断一个数值是否为整数
// console.log(
//   Number.isInteger(25),//true
//   Number.isInteger(25.0),//true
//   Number.isInteger('25'),//false
//   Number.isInteger(25.1),//false
//   Number.isInteger(0),//true
//   Number.isInteger(NaN),//false
//   Number.isInteger(null),//false
//   Number.isInteger(3.0000000000000002)//true,如果对数据精度的要求较高，不建议使用
// )

// ## 5.Number.EPSILON,它表示 1 与大于 1 的最小浮点数之间的差。对于 64 位浮点数来说，就等于 2 的 -52 次方
//可以用来设置“能够接受的误差范围”。
// function withinErrorMargin(left, right) {
//   return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
//   //Number.EPSILON * Math.pow(2, 2) === Math.pow(-52, 2)*Math.pow(2, 2) === Math.pow(-50, 2)
// }
// console.log(
//   0.1 + 0.2 === 0.3, // false
//   withinErrorMargin(0.1 + 0.2, 0.3), // true
//   1.1 + 1.3 === 2.4,// false
//   withinErrorMargin(1.1 + 1.3, 2.4) // true
// )

// ## 6. 安全整数和 Number.isSafeInteger()
// ES6 引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER,表示-2^53到2^53(-9007199254740991 到 9007199254740991)
// console.log(
//   Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1,//true
//   Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER,//true
// )
// Number.isSafeInteger()则是用来判断一个整数是否落在-2^53到2^53之内。
// 需要注意,不要只验证运算结果，而要同时验证参与运算的每个值。
// function trusty(left, right, result) {
//   if (
//     Number.isSafeInteger(left) &&
//     Number.isSafeInteger(right) &&
//     Number.isSafeInteger(result)
//   ) {
//     return result;
//   }
//   throw new RangeError('Operation cannot be trusted!');
// }
// console.log(
//   // trusty(9007199254740993, 990, 9007199254740993 - 990),// RangeError: Operation cannot be trusted!
//   // trusty(1, 2, 3)// 3
// )


// ## 7. Math 对象的扩展

// ### 1. Math.trunc方法,用于去除一个数的小数部分，返回整数部分。
// Math.trunc = Math.trunc || function(x) {
//   return x < 0 ? Math.ceil(x) : Math.floor(x);
// };

// ### 2. Math.sign方法,用来判断一个数到底是正数、负数、还是零。非数值，会先转换为数值。
// Math.sign = Math.sign || function(x) {
//   x = +x; // convert to a number
//   if (x === 0 || isNaN(x)) {
//     return x;
//   }
//   return x > 0 ? 1 : -1;
// };

// ### 3. Math.cbrt()方法,计算一个数的立方根。
// Math.cbrt = Math.cbrt || function(x) {
//   var y = Math.pow(Math.abs(x), 1/3);
//   return x < 0 ? -y : y;
// };

// ### 4. Math.clz32方法,
// ”count leading zero bits in 32-bit binary representation of a number“
// （计算一个数的 32 位二进制形式的前导 0 的个数）
// Math.clz32(0b01000000000000000000000000000000) // 1
// Math.clz32(0b00100000000000000000000000000000) // 2
// Math.clz32(1) // 31
// Math.clz32(1 << 1) // 30,左移运算符（<<）与Math.clz32方法直接相关
// Math.clz32(1 << 2) // 29
// Math.clz32(3.2) // 30,对于小数，Math.clz32方法只考虑整数部分。
// 对于空值或其他类型的值，Math.clz32方法会将它们先转为数值，然后再计算。

// ### 5. Math.imul()方法,
// 返回两个数以 32 位带符号整数形式相乘的结果
// 之所以需要部署这个方法，是因为 JavaScript 有精度限制，超过 2 的 53 次方的值无法精确表示。
// 这就是说，对于那些很大的数的乘法，低位数值往往都是不精确的，Math.imul方法可以返回正确的低位数值。

// ### 6. ath.fround方法 返回一个数的32位单精度浮点数形式。
