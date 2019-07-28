import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import VueRouter from 'vue-router';
import CreateRooter from './config/router/index';
import CreateStore from './store/store.js';

import NotificationPlugin from '@/component/notification/index.js';
// import OrgNotificationPlugin from '@/component/notification2/index.js';

import './less/global.less';

Vue.use(VueRouter);
Vue.use(Vuex);

// 使用自定义插件
Vue.use(NotificationPlugin);
// Vue.use(OrgNotificationPlugin);

const router = CreateRooter();
const store = CreateStore();

// $mout操作 将会替换 其参数对应的DOM对象
new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#root');
