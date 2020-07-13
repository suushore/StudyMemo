// #数值的扩展
'use strict';

// ## 1.二进制和八进制 新方法
// 前缀0b（或0B）和0o（或0O）。。。binary,octonary/octor,decimal,hexadecimal/hex
// console.log(
//   Number('0b111'),
//   Number('0o10')
// )//7 8

// ## 2.// Number.isFinite(), Number.isNaN(),这两个新方法  只对数值有效。
//Number.isFinite()对于非数值一律返回false, Number.isNaN()只有对于NaN才返回true，非NaN一律返回false。
// 传统的ES5全局方法isFinite()和isNaN()先调用Number()将非数值的值转为数值，再进行判断
// console.log(
//   Number.isFinite(15),
//   Number.isFinite(NaN),
//   Number.isFinite('15'),
//   Number.isFinite(true),
//   Number.isFinite(Infinity),
//   Number.isFinite(-Infinity)
// )
// true false false false false false
// console.log(
//   Number.isNaN(15),//false
//   Number.isNaN("15"),//false
//   Number.isNaN(true),//false
//   Number.isNaN(Infinity),//false
//   Number.isNaN(-Infinity),//false
//   Number.isNaN(-NaN),//true
//   Number.isNaN(NaN),//true
//   'aaa' / 0, //NaN
//   Number.isNaN('aaa' / 0),//true
//   1 / 0, //Infinity
//   Number.isNaN(1 / 0),//false
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

// ### 6. Math.fround方法 返回一个数的32位单精度浮点数形式。
// 主要作用，是将64位双精度浮点数转为32位单精度浮点数。如果小数的精度超过24个二进制位，返回值就会不同于原值
// Math.fround = Math.fround || function (x) {
//   return new Float32Array([x])[0];
// };

// ### 7. Math.hypot方法返回所有参数的平方和的平方根
// console.log(
// Math.hypot(3, 4)       // 5
// )



// ## 8. 对数方法

// （1） Math.expm1()
// 返回 ex - 1，即Math.exp(x) - 1
// Math.expm1 = Math.expm1 || function(x) {
//   return Math.exp(x) - 1;
// };

// （2）Math.log1p()
// 返回1 + x的自然对数，即Math.log(1 + x)
// Math.log1p = Math.log1p || function(x) {
//   return Math.log(1 + x);
// };

// （3）Math.log10()
// 返回以 10 为底的x的对数
// Math.log10 = Math.log10 || function(x) {
//   return Math.log(x) / Math.LN10;
// };

// （4）Math.log2()
// Math.log2()返回以 2 为底的x的对数
// Math.log2 = Math.log2 || function(x) {
//   return Math.log(x) / Math.LN2;
// };

// ## 9. 双曲函数方法 ES6add
// Math.sinh(x) 返回x的双曲正弦（hyperbolic sine）
// Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）
// Math.tanh(x) 返回x的双曲正切（hyperbolic tangent）
// Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine）
// Math.acosh(x) 返回x的反双曲余弦（inverse hyperbolic cosine）
// Math.atanh(x) 返回x的反双曲正切（inverse hyperbolic tangent）

// ## 10. 指数运算符 ES6add
let a = 2,b=5;
a **= 2;
b **= 3;
console.log(
  2**3,//8
  2**5,//32
  2 ** 3 ** 2,//512,多个连用时,从右开始
  2 ** (3 ** 2),//512,**= 理同 += 、 -=
  a,b//4 125
)
// 注意，V8 引擎的指数运算符与Math.pow的实现不相同，对于特别大的运算结果，两者会有细微的差异。