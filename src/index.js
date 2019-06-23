import Vue from 'vue'
import App from './App.vue'

import './assets/style/a.less'
import './assets/style/a.css'

import './assets/images/bg.png'

const root = document.createElement('div');
document.body.appendChild(root);

const fn = ()=>{
    return 'abc';
}

console.log(fn());

// $mout操作 将会替换 其参数对应的DOM对象
new Vue({
    render: (h) => h(App),
}).$mount(root);