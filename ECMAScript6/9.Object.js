// # 对象的扩展


// ## 1.属性的简洁表示法
let birth = '2000/01/01';
const Person = {
  name: '张三',
  //等同于birth: birth ////简洁写法的属性名总是字符串
  birth,
  // 等同于hello: function ()...
  hello() { console.log('我的名字是', this.name); }
};

// ### 1.1 CommonJS 模块输出一组变量，就非常合适使用简洁写法。
// module.exports = { getItem, setItem, clear };
// // 等同于
// module.exports = {
//   getItem: getItem,
//   setItem: setItem,
//   clear: clear
// };

// ### 1.2 属性的赋值器（setter）和取值器（getter），事实上也是采用这种写法。
// const cart = {
//   _wheels: 4,
//   get wheels () {
//     return this._wheels;
//   },
//   set wheels (value) {
//     if (value < this._wheels) {
//       throw new Error('数值太小了！');
//     }
//     this._wheels = value;
//   }
// }

// ### 1.3 如果方法的值是一个 Generator 函数，前面需要加上星号。
// const obj = {
//   * m() {
//     yield 'hello world';
//   }
// };

// ### 1.4 简洁写法的属性名总是字符串
// const obj = {
//   m() {console.log(1)},//等价于
//   m : function() {console.log(2)},//等价于
//   'm' : function() {console.log(3,this.a)},
//   a : 1,//在此，标识符储存为字符串，两者等价
//   'a' : 2,
// };
// obj.m();//3 2


// ## 2.表达式作属性名、方法名

// JavaScript 定义对象的属性，有两种方法。
// 方法一
// obj.foo = true;
// 方法二
// obj['a' + 'bc'] = 123;

// ### 2.1 ES6 允许用表达式作属性名，即把表达式放在方括号内。
// let lastWord = 'last word';
// const a = {
//   'first word1': 'hello1',//表达式不需要运算情况下，方括号可省略。
//   ['first word2']: 'hello2',
//   lastWord: 'world11',//传统方式
//   [lastWord]: 'world1',
//   ['last word2']: 'world2',
// };
// console.log(
//   a['first word1'], // "hello1"
//   a['first word2'], // "hello2"
//   a[lastWord], // "world1"
//   a['lastWord'], // "world11" //传统方式
//   a.lastWord, // "world11" //传统方式
//   a['last word2'], // "world2"
// )

//  ### 2.2 表达式作方法名，同上
// let obj = {
//   ['h' + 'ello']() {
//     return 'hi';
//   }
// };
// console.log(
//   obj.hello() // hi
// )

//  ### 2.3 注意，属性名表达式与简洁表示法，不能同时使用，会报错。
// const foo = 'bar'+'aaa';
// const bar = 'abc';
// const baz = { [foo] }; 
// // { [foo] } == { ['bar'+'aaa'] : ['bar'+'aaa']}，方括号作用产生分歧，报错。

//  ### 2.4 注意，表达式如果是对象，会自动转为字符串[object Object]，这一点要特别小心。
// const keyA = {a: 1};
// const keyB = {b: 2};
// const myObject = {
//   [keyA]: 'valueA',
//   [keyB]: 'valueB'
// };
// console.log(myObject)//{ '[object Object]': 'valueB' }


// ## 3.方法的 name 属性 （同函数的name 属性）
// 不同之处，如果方法使用getter、setter，则name属性在该方法的属性的描述对象的get和set属性上面
// const key1 = Symbol('description');
// const obj = {
//   get foo() {},
//   set foo(x) {},
//   [key1]() {},
// };
// const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');
// console.log(
//   // obj.foo.name, //TypeError: Cannot read property 'name' of undefined
//   descriptor.get.name, //get foo
//   descriptor.set.name, //set foo
//   obj[key1].name //[description] ,如果对象的方法是一个 Symbol 值,返回Symbol 值的描述
// )


// ## 4.属性的可枚举性和遍历

// 可枚举性
// 对象的每个属性都有一个描述对象（Descriptor），Object.getOwnPropertyDescriptor方法可以获取
// let obj = { foo: 123 };
// console.log(
//   Object.getOwnPropertyDescriptor(obj, 'foo')
// )
// { value: 123,
//   writable: true,
//   enumerable: true,//可枚举性
//   configurable: true 
// }
// 有四个操作会忽略enumerable为false的属性:
// for...in // !!!!!!只有for...in会返回继承的属性,尽量不要用for...in循环，而用 Object.keys() 代替
// Object.keys() //代替for...in(推荐)
// JSON.stringify()
// Object.assign() //ES6 新增
// 比如，对象原型的toString方法，以及数组的length属性，就通过“可枚举性”，从而避免被for...in遍历到。
// console.log(
//   Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable,//false
//   Object.getOwnPropertyDescriptor([], 'length').enumerable,//false
// )
// 另外，ES6 规定，所有 Class 的原型的方法都是不可枚举的。

// 属性的遍历
// 1）for...in，                         //循环  对象自身的和继承的   可枚举属性     不含 Symbol 属性
// 2）Object.keys(obj)，                 //数组  对象自身的          可枚举属性     不含 Symbol 属性
// 3）Object.getOwnPropertyNames(obj)，  //数组  对象自身的          所有属性       不含 Symbol 属性
// 4）Object.getOwnPropertySymbols(obj)，//数组  对象自身的                        所有 Symbol 属性
// 5）Reflect.ownKeys(obj)，             //数组  对象自身的          所有属性
// 遍历的次序规则
// console.log(
//   Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 })//[ '2', '10', 'b', 'a', Symbol() ]
// )


// ## 5.super 关键字
//  this关键字总是指向函数所在的当前对象
// super关键字总是指向函数所在的当前对象的原型对象
//      只能用在对象的方法之中
// const obj = {
//   foo: 'world',
//   find() {
//     return super.foo;
//   }
// };
// 目前，只有对象方法的简写法可以让 JavaScript 引擎确认，定义的是对象的方法。
// super.foo 
// === Object.getPrototypeOf(this).foo 
// === Object.getPrototypeOf(this).foo.call(this)


// ## 6.对象的扩展运算符  类似数组的

// 解构赋值
// 将目标对象自身的所有可遍历的（enumerable）、但尚未被读取的 自身的属性（不能复制继承自原型对象的属性），分配到指定的对象（...aaa）上面
// 要求等号右边是一个对象
// 解构赋值必须是最后一个参数，否则会报错
// 浅拷贝
// 单纯的解构赋值，可以读取对象继承的属性；
// 扩展运算符的解构赋值，只能读取对象自身的属性。
// ES6 规定，变量声明语句之中，如果使用解构赋值，扩展运算符后面必须是一个变量名，而不能是一个解构赋值表达式
// 错误
// let { x, ...{ y, z } } = o;
// 正确
// let { x, ...newObj } = o;
// let { y, z } = newObj;
// 解构赋值的一个用处，是扩展某个函数的参数，引入其他操作。
// function baseFunction({ a, b }) {
//   // ...
// }
// function wrapperFunction({ x, y, ...restConfig }) {
//   // 使用 x 和 y 参数进行操作
//   // 其余参数传给原始函数
//   return baseFunction(restConfig);
// }

// 扩展运算符  类似数组的
// let z = { a: 3, b: 4 };
// let n = { ...z };
// console.log(
//   n 
// )// { a: 3, b: 4 }
// 上面的例子只是拷贝了对象实例的属性，如果想完整克隆一个对象，还拷贝对象原型的属性，可以采用下面的写法。
// // 写法一
// const clone1 = {
//   __proto__: Object.getPrototypeOf(obj),
//   ...obj
// };//__proto__属性在非浏览器的环境不一定部署

// // 写法二
// const clone2 = Object.assign(
//   Object.create(Object.getPrototypeOf(obj)),
//   obj
// );

// // 写法三
// const clone3 = Object.create(
//   Object.getPrototypeOf(obj),
//   Object.getOwnPropertyDescriptors(obj)
// )

// 如果用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性会被覆盖掉。    这用来修改现有对象部分的属性
// let newVersion = {
//   ...previousVersion,
//   name: 'New Name' // Override the name property
// };

// 如果用户自定义的属性，放在扩展运算符前面，就成了设置新对象的默认属性值。
// let aWithDefaults = { x: 1, y: 2, ...a };

// 扩展运算符的参数对象之中，如果有取值函数get，这个函数是会执行的。
// let aWithXGetter = {
//   ...a,
//   get x() {
//     throw new Error('not throw yet');
//   }
// };
// 会抛出错误，因为 x 属性被执行了
// let runtimeError = {
//   ...a,
//   ...{
//     get x() {
//       throw new Error('throw now');
//     }
//   }
// };
