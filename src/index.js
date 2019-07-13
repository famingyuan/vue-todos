import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import CreateRooter from './config/router/index';

Vue.use(VueRouter);
// $mout操作 将会替换 其参数对应的DOM对象
new Vue({
    router: CreateRooter(),
    render: (h) => h(App)
}).$mount('#root');
