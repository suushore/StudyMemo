// #正则的扩展
const { log } = console;

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
// 'a1a2a3*a6'.match(/a\d/gy)//[ 'a1', 'a2', 'a3' ]
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


// ## 5.新增属性
// log(
// /hello\d/u.unicode,// true
// /hello\d/y.sticky,// true
// /hello\d/ygiu.flags,// 'giuy'
// /hello\d/y.source,// 'hello\d'
// /foo.bar/.test('foo\nbar'),//false,代表任意的单个字符的.不匹配\n
// /foo.bar/s.test('foo\nbar'),//true，dotAll模式，即点（dot）代表一切字符。
// /foo.bar/s.dotAll,//true
// )

// log(
// /\d+(?=%)/g.exec('112%222'),//'112',”先行断言“,前瞻，右为前。。比如只匹配百分号之前的数字
// /\d+(?!%)/g.exec('112%222'),//'11',先行否定断言
// /(?<=\$)\d+/.exec('Benjamin Franklin is on the $100 bill,not on the €90 bill'),//'100',后行断言,后顾，左侧为后。。比如匹配美元符号之后的数字
// /(?<!\$)\d+/.exec('Benjamin Franklin is on the $ bill,not on the €90 bill'),//'90',后行否定断言,ES2018新增。
//“后行断言”的实现，需要先匹配/(?<=y)x/的x，然后再回到左边，匹配y的部分。
//这种“先右后左”的执行顺序，与所有其他正则操作相反，导致了一些不符合预期的行为。
// )


// ## 6.Unicode 属性类 -- 匹配符合 Unicode 某种属性的所有字符()
// log(
// /\p{Script=Greek}/u.exec('π-s-11'),//'π',匹配一个希腊文字母
// /\p{Script=Greek}/g.exec('π-s-11'),//null,\p{{UnicodePropertyName=UnicodePropertyValue}只对 Unicode 有效，所以使用的时候一定要加上u修饰符。
// /\P{Script=Greek}/u.exec('π-s-11'),//'-',\P{…}是\p{…}的反向匹配
// /^\p{Decimal_Number}+$/u.test('𝟏𝟐𝟑𝟜𝟝𝟞𝟩𝟪𝟫𝟬𝟭𝟮𝟯𝟺𝟻𝟼'), // true,匹配所有十进制字符
// /^\p{Number}+$/u.test('²³¹¼½¾'), // true,匹配
// /^\p{Number}+$/u.test('㉛㉜㉝'), // true,匹配
// /^\p{Number}+$/u.test('ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫ'), // true,匹配匹配罗马数字
// /\p{White_Space}+/u.test('𝟏𝟐𝟑𝟜𝟝𝟞 𝟩𝟪𝟫𝟬𝟭𝟮𝟯𝟺𝟻𝟼'), // true,匹配所有空格
// '123abcπ'.match(/[\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Connector_Punctuation}\p{Join_Control}]/ug),
//[ '1', '2', '3', 'a', 'b', 'c', 'π' ],匹配各种文字的所有字母，等同于 Unicode 版的 \w
// /\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu,// 匹配 Emoji
// /^\p{Block=Arrows}+$/u.test('←↑→↓↔↕↖↗↘↙⇏⇐⇑⇒⇓⇔⇕⇖⇗⇘⇙⇧⇩').//SyntaxError: Invalid regular expression: /^\p{Block=Arrows}+$/: Invalid property name
//nodeJS还没有实现该功能？
// )


// ## 7.具名组匹配
//“具名组匹配”在圆括号内部，模式的头部添加“问号 + 尖括号 + 组名”（?<year>），然后就可以在exec方法返回结果的groups属性上引用该组名
// let RE_DATE1 = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
// let RE_DATE2 = /(\d{4})-(\d{2})-(\d{2})/;
// const matchObj1 = RE_DATE1.exec('1999-12-31');
// const matchObj2 = RE_DATE2.exec('1999-12-31');
// log(matchObj1);
// // [ '1999-12-31',
// //   '1999',
// //   '12',
// //   '31',
// //   index: 0,
// //   input: '1999-12-31',
// //   groups: [Object: null prototype] { year: '1999', month: '12', day: '31' } ]
// //   如果无具名组 或者 具名组没有匹配,那么对应的groups对象属性会是 undefined。
// log(matchObj2);
// // [ '1999-12-31',       
// //   '1999',
// //   '12',
// //   '31',
// //   index: 0,
// //   input: '1999-12-31',
// //   groups: undefined ]


// ## 7.具名组作用：解构赋值和替换
//使用解构赋值直接从匹配结果上为变量赋值，结构一致即可
// let { groups: { one, two } } = /^(?<one>.*):(?<two>.*)$/u.exec('foo:bar');
//字符串替换时，使用$<组名>引用具名组。ES5只能用$1/$2/$3
// let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;
// log(
  // one,//foo
  // two,//bar
  // '2015-01-02'.replace(re, '$<day>/$<month>/$<year>'),//02/01/2015
// )

// ## 8. 正则表达式内部引用某个“具名组匹配”   \k<组名>
// const RE_TWICE = /^(?<word>[a-z]+)!\k<word>$/;
// log(
//   RE_TWICE.test('abc!abc'), // true
//   RE_TWICE.test('abc!ab') // false
// )


// ## 9. String.prototype.matchAll
// 正则表达式在字符串里面有多个匹配,可以一次性取出所有。不过，它返回的是一个遍历器（Iterator）。
// 相对于返回数组，返回遍历器的好处在于，如果匹配结果是一个很大的数组，那么遍历器比较节省资源。
// 使用...运算符和Array.from方法，遍历器转为数组
// [...string.matchAll(regex)]
// or
// Array.from(string.matchAll(regex));
