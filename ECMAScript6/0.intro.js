// ECMAScript 6 入门 
// 作者：阮一峰
// 授权：署名-非商用许可证


//1.概要
//ECMAScript 6.0是 JavaScript 语言的下一代标准，2015 年 6 月正式发布。目标是星辰大海。


//2.ECMAScript 和 JavaScript
//1996 年 11 月，Netscape 公司将 JavaScript 提交给标准化组织 ECMA，1997 年ECMA 发布ECMAScript1.0，
//因此，ECMAScript 和 JavaScript 的关系是，前者是后者的规格，后者是前者的一种实现。


//3.ES6 与 ECMAScript 2015
// 2011 年，ECMAScript 5.1 版发布。
//ES6 是5.1 版以后的 JavaScript 的下一代标准，涵盖了 ES2015、ES2016、ES2017 等等。


//4.语法提案
//五个阶段:
// Stage 0 - Strawman（展示阶段）
// Stage 1 - Proposal（征求意见阶段）
// Stage 2 - Draft（草案阶段）
// Stage 3 - Candidate（候选人阶段）
// Stage 4 - Finished（定案阶段）
// 只要进 Stage 2，就差不多肯定会包括在以后的正式标准里面。


// 5.历史
// 2000 - 2015。
// 2015 年 6 月，ECMAScript 6 正式通过，成为国际标准。


// 6.ES6 代码转为 ES5 代码
// Babel 转码器

// npm install --save-dev babel-preset-latest
// npm install --save-dev babel-preset-react
// npm install --save-dev babel-preset-stage-2

// 配置文件.babelrc  项目的根目录下
//   {
//     "presets": [
//       "latest",
//       "react",
//       "stage-2"
//     ],
//     "plugins": []
//   }

// 命令行转码babel-cli

// npm install --save-dev babel-cli

// npx babel .\intro.js  
// or npx babel .\intro.js -d lib

// input.map(item => item + 1);
// 转化为
// input.map(function (item) {
// return item + 1;
// });


// babel-polyfill

// Babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的 API
// 若要让新的 API运行，必须使用babel-polyfill
// npm install -D babel-polyfill
// require('babel-polyfill');
// 或者
// import 'babel-polyfill';

// es6代码
// --(babel)--> 
// es5代码 + 新的 API(比如Iterator、Generator、Set、Map、Proxy、Reflect、Symbol、Promise,Object.assign等)
// --(babel-polyfill)-->
// 低版本浏览器可运行

// ## 与其他工具的配合
//|#### ESLint
// npm install --save-dev eslint babel-eslint
// npx eslint --init
// add "parser": "babel-eslint", in .eslintrc.js

//## Mocha
// package.json之中,
// "scripts": {
  // "test": "mocha --ui qunit --compilers js:babel-core/register"
// }
