import Vue from 'vue'
import App from './App.vue'

import './assets/style/a.less'
import './assets/style/a.css'

const root = document.createElement('div');
document.body.appendChild(root);

const fn = ()=>{
    return 'abc';
}

console.log(fn());

new Vue({
    render: (h) => h(App),
}).$mount(root);