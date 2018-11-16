// # 字符串的扩展
let {
  log
} = console;
// ## 1.字符的 Unicode 表示法

// ###.codePointAt()方法
// let s = '𠮷a';
// for (let ch of s) {
//   console.log(ch.codePointAt(0).toString(16));
// }//20bb7 61
// codePointAt方法是测试一个字符由两个字节还是由四个字节组成的最简单方法。
// function is32Bit(c) {
//   return c.codePointAt(0) > 0xFFFF;
// }
// log(is32Bit("𠮷")) // true
// log(is32Bit("a")) // false

// ###String.fromCodePoint()方法
// let ss = String.fromCodePoint(0x20BB7)
// let aa = String.fromCodePoint(0x61)
// log(aa)// "𠮷" a

// ###.normalize()方法
// log(//Ǒ（\u01D1） and O（\u004F）和ˇ（\u030C）
//   '\u01D1'==='\u004F\u030C',//false
//   '\u01D1'.normalize() === '\u004F\u030C'.normalize(),//true
//   '\u004F\u030C'.normalize('NFC').length,//1
//   '\u004F\u030C'.normalize('NFD').length //2
// )


// ## 2.遍历器接口Iterator

// for (let codePoint of 'foo') {
//   console.log(codePoint)
// }//f o o

// 优点是可以识别大于0xFFFF的码点，传统的for循环无法识别这样的码点。
// let text = String.fromCodePoint(0x20BB7);
// for (let i = 0; i < text.length; i++) {
//   console.log(text[i]);
// }// " "," "
// for (let i of text) {
// console.log(i);
// }//  "𠮷"


// ## 3.新方法includes(str,[index]), startsWith(str,[index]), endsWith(str,[index])
let s = 'Hello world!';
// log(
//   s.includes('llo'),
//   s.startsWith('Hell'),
//   s.endsWith('d!')
// ) //true true true
// log(
//   s.includes('llo',1),//以index开始，包含
//   s.includes('llo',2),
//   s.includes('llo',3),
//   s.startsWith('ell',1),//以index开始，包含
//   s.startsWith('ell',2),
//   s.endsWith('rl',9),//以index结束，不包含
//   s.endsWith('rl',10),
//   s.endsWith('rl',11)
// ) //true true false true false false true false

// ## 4.新方法.repeat()
// log('xyz'.repeat(3))//xyzxyzxyz

// ## 5.新方法.padStart()，padEnd()
// log(
//   'x'.padStart(5, 'ab'),
//   'x'.padStart(5),
//   'x'.padEnd(5, 'ab'),
//   'xxxxxxxxx'.padEnd(5, 'ab') ,
//   '123456'.padStart(10, '0'),
//   '09-12'.padStart(10, 'YYYY-MM-DD')
// )//ababx     x xabab xxxxxxxxx 0000123456 YYYY-09-12

// ## 6.新方法.matchAll() == && !== .match()加上 /g
// log(
// '123abc'.matchAll(/\w/),//"123abc".matchAll is not a function??? node v10.13.0 还未实现？
// )






// ## 7.模板字符串 !important
// 是增强版的字符串，用反引号（`）标识。
// 当作普通字符串使用、定义多行字符串(空格保留)、在字符串中嵌入变量(变量名写在${}之中)。
// let name = "Bob", time = "today";
// let f = (str)=>{
//   return str.padStart(12, '0')
// }
// log(
// `In JavaScript \n is a line-feed.`, //In JavaScript 换行 is a line-feed.
// `In JavaScript this is
// not legal.`,//In JavaScript this is  换行  not legal.
// `Hello ${name}, how are you ${time}?`//Hello Bob, how are you today?
// `Hello ${f(`xxx`)}, how are you ${time}?`//Hello 000000000xxx, how are you today?
// `Hello ${{aaa:111}}`//Hello [object Object]
// )


// ## 8.标签模板
//“标签”指的就是函数，紧跟在后面的模板字符串就是它的参数。
// 如果模板字符里面有变量，将模板字符串先处理成多个参数，再调用函数。

// let a = 5;
// let b = 10;
// log`Hello ${ a + b } world ${ a * b } aaa ${ a - b } ccc` // [ 'Hello ', ' world ', ' aaa ', ' ccc' ] 15 50 -5

// let sender = '<script>alert("abc")</script>';
// // log`<p>${sender} has sent you a message.</p>`   //[ '<p>', ' has sent you a message.</p>' ] '<script>alert("abc")</script>'

// function aaa(literals, ...values) {
//   // log(literals, ...values) //[ '<p>', ' has sent you a message.</p>' ]  '<script>alert("abc")</script>'
//   // log(literals, ...values) //[ '<p>', ' has sent you a message.</p>' ]  ['<script>alert("abc")</script>']
//   let output = "";
//   let index;
//   for (index = 0; index < values.length; index++) {
//     output += literals[index] + values[index];
//   }
//   output += literals[index]
//   return output;
// }
// log(aaa `<p>${sender} has sent you a message.</p>`)//<p><script>alert("abc")</script> has sent you a message.</p>

// ### “标签模板”的一个重要应用，就是过滤 HTML 字符串，防止用户输入恶意内容
// let sender = '<script>alert("abc")</script>';
// let message =
//   SaferHTML`<p>${sender} has sent you a message.</p>`;

// function SaferHTML(templateData) {
//   // log(templateData)//[ '<p>', ' has sent you a message.</p>' ]
//   let s = templateData[0];//'<p>'
//   log(arguments)//[Arguments] {'0': [ '<p>', ' has sent you a message.</p>' ],'1': '<script>alert("abc")</script>' }
//   for (let i = 1; i < arguments.length; i++) {
//     let arg = String(arguments[i]);//'<script>alert("abc")</script>'

//     // Escape special characters in the substitution.
//     s += arg.replace(/&/g, "&amp;")
//             .replace(/</g, "&lt;")
//             .replace(/>/g, "&gt;");
//     //'<p>'&lt;script&gt;alert("abc")&lt;/script&gt;
//     // Don't escape special characters in the template.
//     s += templateData[i];//<p>&lt;script&gt;alert("abc")&lt;/script&gt; has sent you a message.</p>
//   }
//   return s;
// }
// log(message)//<p>&lt;script&gt;alert("abc")&lt;/script&gt; has sent you a message.</p>

// ### 转义之前的原始模板
// log`123`//[ '123' ]
// let aa = 5;
// logs`12\n${aa}3`
// function logs(literals, ...values){
//   log(literals)//[ '12\n', '3' ]
//   log(literals.raw)//[ '12\\n', '3' ],
// }

// ### String.raw()
let sender = 1;
log(
  String.raw`<p>${sender} has sent you \\n a message.</p>`//<p>1 has sent you \\n a message.</p>
)
// String.raw的代码实现基本如下。
// String.raw = function (strings, ...values) {// line 118 已经实现，即为标签模板的一个封装函数
//   let output = '';
//   let index;
//   for (index = 0; index < values.length; index++) {
//     output += strings.raw[index] + values[index];
//   }

//   output += strings.raw[index]
//   return output;
// }

// ###模板字符串的限制
// 模板字符串默认会将字符串转义，导致无法嵌入其他语言。
// 为了解决这个问题，ES2018 放松了对标签模板里面的字符串转义的限制。如果遇到不合法的字符串转义，就返回undefined，而不是报错，并且从raw属性上面可以得到原始字符串。

