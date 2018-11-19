// 变量的解构赋值
// ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。


// 1.数组的解构赋值

// let [a, b, c] = [1, 2, 3];
// console.log(a)//1，“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。
// console.log([a, b, c][0])//1

// let [a, b, c] = [1, 2];//解构不成功
// console.log(c);//undefined

// let [a] = [1, 2,3];//不完全解构
// console.log(a);//1

// let [foo] = {};//TypeError: {} is not iterable

// let [x, y, z] = new Set(['a', 'b', 'c']);//////只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。
// console.log(x);//a

// console.log(new Set(['a', 'b', 'c']));//{ 'a', 'b', 'c' }

// 默认值
let a = function () {
  let [x, y = 'b'] = ['a'];
  console.log(x, y) //a b
}

a = function () {
  let [x, y = 'ddd'] = ['a', undefined];
  console.log(x, y) //a ddd
}

a = function () {
  let [x, y = 'b'] = ['a', null];
  console.log(x, y) ////a null
}

a = function () {
  function f() {
    console.log('aaa');
  }
  let [x = f()] = [1];
  console.log(x) //1,表达式是惰性求值的，即只有在用到的时候，才会求值,f不运行
}

a = function () {
  let [x = y, y = 1] = []; //ReferenceError: y is not defined,默认值可以引用解构赋值的其他变量，但该变量必须已经声明。
  console.log(x, y)
}

a = function () {
  let [x = 1, y = x] = [];
  console.log(x, y) //1 1
}






// 2.对象的解构赋值
a = function () {
  let {
    foo,
    bar
  } = {
    foo: "aaa",
    bar: "bbb"
  };
  console.log(foo, bar) //aaa bbb
}

a = function () { //变量必须与属性同名，才能取到正确的值。
  let {
    bar,
    foo
  } = {
    foo: "aaa",
    bar: "bbb"
  };
  console.log(bar, foo) //bbb aaa
}

a = function () { //变量必须与属性同名，才能取到正确的值。
  let {
    a,
    foo
  } = {
    foo: "aaa",
    bar: "bbb"
  };
  console.log(a, foo) //undefined 'aaa'
}

a = function () {
  let {
    foo: a,
    foo
  } = {
    foo: 'aaa',
    bar: 'bbb'
  };
  console.log(a, foo) //aaa aaa
}

a = function () {
  let {
    foo: a,
    foo: foo
  } = {
    foo: 'aaa',
    bar: 'bbb'
  }; //foo是匹配的模式，a才是变量。真正被赋值的是变量a，而不是模式foo。
  console.log(a, foo) //aaa aaa
}

a = function () {
  var {
    x,
    y = 5
  } = {
    x: 1
  };
  console.log(x, y) //1 5
}

a = function () {
  var {
    x,
    y = 5
  } = {
    x: 1,
    y: undefined
  };
  console.log(x, y) //1 5
}

a = function () {
  var {
    x,
    y = 5
  } = {
    x: 1,
    y: null
  };
  console.log(x, y) //1 null
}

a = function () {
  let {
    log,
    sin,
    cos
  } = Math;
  console.log(log(30)) //3.4011973816621555
}

a = function () {
  let arr = [1, 2, 3, , , 6];
  let {
    0: first,
    [arr.length - 1]: last
  } = arr;
  console.log(last) //6
}





// 3.字符串的解构赋值

a = function () {
  const [a, b, c, d, e] = 'hello';
  console.log(a, b) //h e
}

a = function () {
  let {
    length: len
  } = 'hello';
  console.log(len) //5
}





// 4.数值和布尔值的解构赋值
let {
  log
} = console;
a = function () {
  let {
    toString: s
  } = 123;
  let {
    toString: a
  } = true;
  let {
    prop: y
  } = null;
  let {
    prop: x
  } = undefined;
  log(s, a) //[Function: toString] [Function: toString]
  log(y, x) //TypeError: Cannot destructure property `prop` of 'undefined' or 'null'.
}



// 5.函数参数的解构赋值

a = function () {
  function add([x, y] = arguments) {
    return x + y;
  }
  log(add([1, 2])); // 3

  log(
    [
      [1, 2],
      [3, 4]
    ].map(([a, b] = item) => a + b)
  ); //[ 3, 7 ]

  log(
    [
      [1, undefined],
      [3, 4]
    ].map(([a, b] = item) => a + b)
  ); // [ NaN, 7 ]

  log(
    [
      [1],
      [3, 4]
    ].map(([a, b = 5] = item) => a + b)
  ); // [ 6, 7 ]

}

a = function () {
  function move({
    x,
    y
  } = {
    x: 0,
    y: 0
  }) {
    return [x, y];
  }
  log(
    move(), // 0 0 
    move({
      x: 3
    }),//[ 3, undefined ]
    move({})//[ undefined, undefined ]
  ) 
}



//6. 圆括号
// 建议只要有可能，就不要在模式中放置圆括号。
// 可以使用圆括号的情况只有一种：赋值语句的非模式部分，可以使用圆括号。
// 原理：
    // 解构赋值内部机制为：模式 --> 同名属性 --> 属性值  --> 变量

    //例如：let { foo: baz } = { foo: "aaa", bar: "bbb" },
    //声明{ foo: baz }  --> 确认foo，baz为变量 --> 给foo，baz申请存储空间 -->  模式foo --> 同名属性foo --> 属性值"aaa"  -->  变量baz = "aaa";

    //例如：{ foo: baz } = { foo: "aaa", bar: "bbb" },
    //模式foo --> 同名属性foo --> 属性值"aaa"  -->  变量baz = "aaa";
    a = function () {
      let a = 0;
      let (a) = 1;//ReferenceError: let is not defined，
    }
    // 凡是声明语句等号前不能有圆括号




// 7.用途
// （1）交换变量的值
    // [x, y] = [y, x];
// （2）从函数返回多个值
// function example() {
//   return [1, 2, 3];
// }
// let [a, b, c] = example();
// （3）函数参数的定义
// （4）提取 JSON 数据
// （5）函数参数的默认值
// （6）遍历 Map 结构     ////for (let [key, value] of map) {}
// （7）输入模块的指定方法 //// const { SourceMapConsumer, SourceNode } = require("source-map");

a()
