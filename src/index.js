import Vue from 'vue';
import App from './App.vue';

import './less/a.less';
import './less/a.css';

import './images/bg.png';

// css 模块加载使用方式
import moduleCSS from './less/module.less';

const moduleDiv = document.createElement('div');
moduleDiv.classList.add(moduleCSS['module-test']);

document.body.appendChild(moduleDiv);

const root = document.createElement('div');
document.body.appendChild(root);

const fn = () => {
    return 'abc';
};

console.log(fn());

// $mout操作 将会替换 其参数对应的DOM对象
new Vue({
    render: (h) => h(App)
}).$mount(root);
