import _ from 'lodash';
import printMe from './print.js';
async function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');
    // const _ = await import(/* webpackChunkName: "lodash" */ 'lodash');
    const mock = await import(/* webpackChunkName: "mock" */ 'mock');
    //不再使用静态导入 lodash，而使用动态导入来分离一个 chunk
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;
    element.appendChild(btn);
    return element;
  }
  component().then(component =>{
  document.body.appendChild(component)
  })