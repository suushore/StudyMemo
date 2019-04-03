// Promise
// # 1.简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果
// 从语法上说，Promise 是一个对象，从它可以获取异步操作的消息
// 特点:
// 1.1 状态不受外界影响。
// 异步操作的结果确定是pending（进行中）、fulfilled（已成功）和rejected（已失败）哪一种状态，
// 任何其他操作都无法改变这个状态
// 1.2 Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected
// 1.3 无法取消，内部抛出的错误不会反应到外部，处于pending状态时无法得知目前进展到哪一个阶段

// # 2.基本用法
const promise = new Promise(function(resolve, reject) {
  // ... some code
  if(/* 异步操作成功 */isOK){
    resolve(value);
  } else {
    reject(error);
  }
});
// resolve函数的作用是，将Promise对象的状态从 pending 变为 resolved，在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
// reject函数的作用是，将Promise对象的状态从pending 变为 rejected，在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。
// 实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
// Promise 新建后就会立即执行。
// 调用resolve或reject并不会终结 Promise 的参数函数的执行
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});
// 2
// 1
// 这是因为立即 resolved 的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务
// 一般来说，调用resolve或reject以后，Promise 的使命就完成了，后继操作应该放到then方法里面，
// 所以，最好在它们前面加上return语句，这样就不会有意外
new Promise((resolve, reject) => {
  return resolve(1);
  // 后面的语句不会执行
  console.log(2);
})

// # 3.Promise.prototype.then()
// then方法的第一个参数是resolved状态的回调函数，第二个参数（可选）是rejected状态的回调函数
// then方法返回的是一个新的Promise实例,因此可以采用链式写法，即then方法后面再调用另一个then方法
getJSON("/posts.json").then(function(json) {
  return json.post;
}).then(function(post) {
  // ...
});

// # 4.Promise.prototype.catch()