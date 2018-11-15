// #正则的扩展
const {log}=console;


// ## 1.声明
// ES6中RegExp构造函数第一个参数是一个正则对象，可以用第二个参数指定修饰符。
// log(
//   new RegExp(/abc/ig, 'i'),///abc/i
// )


// ## 2.正则方法
// 在语言内部全部从String实例转移到RegExp的实例下，使用上不更改，语言内部调用。


// ## 3.处理大于\uFFFF的 Unicode 字符,u修饰符
// log(
//   /^\uD83D/u.test('\uD83D\uDC2A'), // false,加u修饰符，四个字节的 UTF-16 编码就会正确的识别其为一个字符，ES6新增
//   /^\uD83D/.test('\uD83D\uDC2A'), // true,不加u修饰符，四个字节的 UTF-16 编码就会正确的识别其为两个字符，ES5模式
//   // u修饰符，代表支持ES6 unicode 字符。
//   // 判断是否带u修饰符，即为判断是否支持ES6 unicode 字符
//   /^\uD83D/u.unicode, //true
//   /^\uD83D/.unicode //false
// )

// ## 4.y 修饰符,“粘连”（sticky）修饰符
// g修饰符只要剩余位置中存在匹配就可，而y修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义
// lastIndex属性指定每次搜索的开始位置，g修饰符从这个位置开始向后搜索，直到发现匹配为止。
// y修饰符同样遵守lastIndex属性，但是要求必须在lastIndex指定的位置发现匹配。
// y修饰符的设计本意，就是让头部匹配的标志^在全局匹配中都有效。
// var s = 'aaa_aa_a';
// var r1 = /a+/g;
// var r2 = /a+/y;//实际上，y修饰符号隐含了头部匹配的标志^。
// var r3 = /a+_/g;
// var r4 = /a+_/y;
// log(
  // r1.exec(s),//[ 'aaa', index: 0, input: 'aaa_aa_a', groups: undefined ]
  // r1.exec(s),//[ 'aa', index: 4, input: 'aaa_aa_a', groups: undefined ]
  // r2.exec(s),//[ 'aaa', index: 0, input: 'aaa_aa_a', groups: undefined ]
  // r2.exec(s),//null

  // r3.exec(s),//[ 'aaa_', index: 0, input: 'aaa_aa_a', groups: undefined ]
  // r3.exec(s),//[ 'aa_', index: 4, input: 'aaa_aa_a', groups: undefined ]
  // r4.exec(s),//[ 'aaa_', index: 0, input: 'aaa_aa_a', groups: undefined ]
  // r4.exec(s),//[ 'aa_', index: 4, input: 'aaa_aa_a', groups: undefined ]
  // 'a1a2a3'.match(/a\d/gy)//[ 'a1', 'a2', 'a3' ]
// )

// const TOKEN_Y = /\s*(\+|[0-9]+)\s*/y;
// const TOKEN_G  = /\s*(\+|[0-9]+)\s*/g;
// tokenize(TOKEN_Y, '3x + 4')
// // [ '3' ]
// tokenize(TOKEN_G, '3x + 4')
// // [ '3', '+', '4' ]
// function tokenize(TOKEN_REGEX, str) {
//   let result = [];
//   let match;
//   while (match = TOKEN_REGEX.exec(str)) { 
//     result.push(match[1]);
//   }
//   log(result)
//   return result;
// }
// log(
//   /hello\d/y.sticky,//true,sticky属性表示是否设置了y修饰符
//   /hello\d/g.sticky,//false
// )


// 新增属性
// log(
  // /hello\d/u.unicode,//true
  // /hello\d/y.sticky,//true
  // /hello\d/ygiu.flags,//'giuy'
  // /hello\d/y.source,//'hello\\d'
  // /foo.bar/.test('foo\nbar'),//false,代表任意的单个字符的.不匹配\n
  // /foo.bar/s.test('foo\nbar'),//false，dotAll模式，即点（dot）代表一切字符。
  // /foo.bar/s.dotAll,//true
// )

log(
  // /\d+(?=%)/g.exec('112%222'),//'112',”先行断言“,前瞻，右为前。。比如只匹配百分号之前的数字
  // /\d+(?!%)/g.exec('112%222'),//'11',先行否定断言
  // /(?<=\$)\d+/.exec('Benjamin Franklin is on the $100 bill,not on the €90 bill'),//'100',后行断言,后顾，左侧为后。。比如匹配美元符号之后的数字
  // /(?<!\$)\d+/.exec('Benjamin Franklin is on the $ bill,not on the €90 bill'),//'90',//后行断言,ES2018新增。

)