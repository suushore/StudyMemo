// # 数组的扩展


// ## 1.扩展运算符 spread(...) 
// 将 一个数组 转为 用逗号分隔的参数序列，主要用于函数调用。

// ### 1.1 替代函数的 apply 方法，将数组转为函数的参数
// 例1:求出一个数组最大元素
// ES5 的写法
Math.max.apply(null, [14, 3, 77])
// ES6 的写法
Math.max(...[14, 3, 77])
// 例2:将一个数组添加到另一个数组的尾部
// ES5 的写法
// Array.prototype.push.apply([0, 1, 2], [3, 4, 5]);
// ES6 的写法
// [0, 1, 2].push(...[3, 4, 5]);

// ### 1.2 扩展运算符的应用
// （1）复制数组
// 数组是复合的数据类型，直接复制的话，只是复制了指针
// 扩展运算符提供了方法：
// const a1 = [1, 2];
// const a2 = [...a1];
// （2）合并数组
// ES5 的合并数组
// arr1.concat(arr2, arr3);//浅拷贝
// ES6 的合并数组
// [...arr1, ...arr2, ...arr3]//浅拷贝
// （3）与解构赋值结合（扩展运算符只能放在参数的最后一位）
// const [first, ...rest] = [1, 2, 3, 4, 5];
// （4）字符串转数组
// 使用扩展运算符，能够正确识别四个字节的 Unicode 字符。
// [...'x\uD83D\uDE80y'].length // 3
// （5）部署 Iterator 接口的对象，扩展运算符可以将其转为真正的数组
// let nodeList = document.querySelectorAll('div');
// let array = [...nodeList];
// （6）Map 和 Set 结构，Generator 函数，同上。


// ## 2.Array.from()

// （1）用于将 类数组对象（array-like object）和可遍历（iterable）对象（包括Set 和 Map） 转为真正的数组。
// NodeList对象
// let ps = document.querySelectorAll('p');
// Array.from(ps).filter(p => {
//   return p.textContent.length > 100;
// });
// // arguments对象
// function foo() {
//   var args = Array.from(arguments);
//   // ...
// }

// （2）还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
// let spans = document.querySelectorAll('span.name');
// let names = Array.from(spans, s => s.textContent);
// Array.from({ length: 2 }, () => 'jack') // ['jack', 'jack']

// （3）还可以传入Array.from的第三个参数，用来绑定this。

// （4）字符串转数组
// 它能正确处理各种 Unicode 字符，可以避免 JavaScript 将大于\uFFFF的 Unicode 字符，算作两个字符的 bug。
// function countSymbols(string) {
//   return Array.from(string).length;
// }

// 对于还没有部署该方法的浏览器，可以用Array.prototype.slice方法替代。(只实现基础功能)
// const toArray = (() =>
//   Array.from ? Array.from : obj => [].slice.call(obj)
// )();

// 扩展运算符 spread(...) 与Array.from()对比：
// 任何有length属性的对象，可通过Array.from方法转为数组，
// 任何部署遍历器接口（Symbol.iterator）接口，可通过扩展运算符转为数组。


// ## 3.Array.of()
// 数组构造函数Array()参数个数的不同，会导致Array()的行为有差异，
// 用Array.of()来替代Array()或new Array()，用于将一组值，转换为数组，不存在由于参数不同而导致的重载。


// ## 4.数组实例的 copyWithin()
// 当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。
// Array.prototype.copyWithin(target, start = 0, end = this.length)
// console.log(
  // [1, 2, 3, 4, 5].copyWithin(0, 3),//[ 4, 5, 3, 4, 5 ],将3&4号位复制到0&1号位
  // [1, 2, 3, 4, 5].copyWithin(0, 3, 4),//[ 4, 2, 3, 4, 5 ],将3号位复制到0号位
  // [1, 2, 3, 4, 5].copyWithin(0, -2, -1),//[ 4, 2, 3, 4, 5 ],-2相当于3号位，-1相当于4号位
  // [].copyWithin.call({ 3: 1,length: 5}, 0, 3)//{ '0': 1, '3': 1, length: 5 },同[1,undefined,undefined,1,undefined]
// )


// ## 5.数组实例的 find() 和 findIndex()，第二个参数用来绑定回调函数的this对象
// [1, 5, 10, 15].find(function(value, index, arr) {
//   return value > 9;
// }) // 10,没有则返回undefined
// [1, 5, 10, 15].findIndex(function(value, index, arr) {
//   return value > 9;
// }) // 2,没有则返回-1
// indexOf方法无法识别数组的NaN成员，但是findIndex方法可以借助Object.is方法做到
// [NaN].indexOf(NaN)// -1
// [NaN].findIndex(y => Object.is(NaN, y))// 0


// ## 6.数组实例的 fill()
// 使用给定值，填充一个数组。
// ['a', 'b', 'c'].fill(7)// [7, 7, 7]
// 第二个和第三个参数，用于指定填充的起始位置和结束位置。
// ['a', 'b', 'c'].fill(7, 1, 2)// ['a', 7, 'c']
// 如果填充的类型为对象,则为浅拷贝。


// ## 7.数组实例的 entries()，keys() 和 values()
// 用于遍历数组。它们都返回一个遍历器对象
// for (let index of ['a', 'b'].keys()) {
//   console.log(index);
// }
// // 0
// // 1

// for (let elem of ['a', 'b'].values()) {
//   console.log(elem);
// }
// // 'a'
// // 'b'

// for (let [index, elem] of ['a', 'b'].entries()) {
//   console.log(index, elem);
// }
// 0 "a"
// 1 "b"


// ## 7.数组实例的 includes()
