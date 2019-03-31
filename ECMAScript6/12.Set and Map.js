let {
  log
} = console;
// ## 1.Set
// 类似于数组，但是成员的值都是唯一的，没有重复的值。
// const set = new Set([1, 2, 3, 4, 4]);
// log(set,//Set { 1, 2, 3, 4 }
//   [...set],//[ 1, 2, 3, 4 ]
//   set.size,//4
// )
// 可以用作 去除数组重复成员 [...new Set(array)]或者Array.from(new Set(array))
//         去除字符串里面的重复字符 [...new Set('ababbc')].join('')
// let set = new Set();
// set.add(NaN);
// set.add(NaN);
// set.add(3);
// set.add(3);
// set.add("3");
// set.add({});
// set.add({});
// set.add({1:2});
// set.add({1:2});
// log(set) // NaN, 3, '3', {}, {}, { '1': 2 }, { '1': 2 }
// Set 实例的属性和方法
// (1).操作数据
// .add(value) .delete(value) .has(value) .clear()
// let set = new Set([1, 2, 3]);
// log(
//   set.add(NaN),// Set { 1, 2, 3, NaN }
//   set.delete(3),// true
//   set.has(2),// true
//   set.has(3),// false
//   set.clear(),//undefined,清除所有成员，没有返回值
// )
// (2).遍历成员
// keys()，values()，entries()
// let set = new Set(['red', 'green', 'blue']);
// for (let item of set.keys()) {
//   log(item);//red green blue
// }
// for (let item of set.values()) {
//   log(item);//red green blue
// }
// for (let item of set.entries()) {
//   log(item);
//   // ["red", "red"]
//   // ["green", "green"]
//   // ["blue", "blue"]
// }
// Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法。
// Set.prototype[Symbol.iterator] === Set.prototype.values
// 这意味着，可以省略values方法，直接用for...of循环遍历 Set。
// let set = new Set(['red', 'green', 'blue']);
// for (let item of set) {
//   log(item);//red green blue
// }
// forEach()，类似于数组的
// set.forEach((value, key, collectionSelf) => log(key + ' : ' + value),thisObj)
// 数组的map和filter方法也可以间接用于 Set
// new Set([...set].map(x => x * 2));
// new Set([...set].filter(x => (x % 2) == 0));
// 因此使用 Set 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）。
// let a = new Set([1, 2, 3]);
// let b = new Set([4, 3, 2]);
// // 并集
// let union = new Set([...a, ...b]);
// // 交集
// let intersect = new Set([...a].filter(x => b.has(x)));
// // 差集
// let difference = new Set([...a].filter(x => !b.has(x)));

// ## 2.WeakSet
// 与 Set 有两个区别
// WeakSet 的成员只能是对象，而不能是其他类型的值。
// WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，
//        也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存
// 因此，WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失。
// 垃圾回收机制何时运行是不可预测的，因此 ES6 规定 WeakSet 不可遍历。
// WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。

// ## 3.Map
// Object 结构提供了“字符串—值”的对应,
// Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现
// const map = new Map([
//   ['name', '张三'],
//   ['title', 'Author']
// ]);
// log(map) // Map { 'name' => '张三', 'title' => 'Author' }
// 任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构都可以当作Map构造函数的参数。
// 这就是说，Set和Map都可以用来生成新的 Map。
// (1)属性和操作方法
// size 属性 
// .set(key, value)  .get(key)  .has(key)  .delete(key) .clear()
const map = new Map();
map.set('foo', true);
map.set('bar', false);
log(map.size,//2
  map.set('bar', 1),// Map { 'foo' => true, 'bar' => 1 }
  map.get('bar'),// 1
  map.has('bar'),// true
  map.delete('bar'),//true
  map.clear(),//undefined
) 
// (2)遍历成员
// keys()，values()，entries() forEach() 类似于Set
// Map 结构的实例默认可遍历，它的默认遍历器生成函数就是它的entries方法。
// Map.prototype[Symbol.iterator] === Map.prototype.entries
// 数组的map和filter方法也可以间接用于 Map
// 与其他数据结构的互相转换
//（1）Map 转为数组
const myMap = new Map()
  .set(true, 7)
  .set({foo: 3}, ['abc']);
[...myMap]
//（2）数组 转为 Map
new Map([
  [true, 7],
  [{foo: 3}, ['abc']]
])
// （3）Map 转为对象
function mapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    let kStr = k.toString();
    obj[kStr] = v;
  }
  return obj;
}
// （4）对象转为 Map
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}
objToStrMap({yes: true, no: false})

// ## 4.WeakMap
// 与Map的区别有两点
// 首先，WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。
// 其次，WeakMap的键名所指向的对象，不计入垃圾回收机制。
// 与 Map 在 API 上的区别主要是两个，一是没有遍历操作（即没有keys()、values()和entries()方法），也没有size属性。
// 二是无法清空，即不支持clear方法。
// 因此，WeakMap只有四个方法可用：get()、set()、has()、delete()。
// 解决内存泄漏

