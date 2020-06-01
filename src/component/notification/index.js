/**
 *
 * 对于组件而言，需要支持插件方式，通常就采用该方式，方便使用
 *
 */
// 外界调用 vue.use(pluginFn)

import Notification from './notification.vue';
import NotificationAPI from './function.js';

export default (Vue) => {
    // 全局注册组件
    Vue.component(Notification.name, Notification);

    Vue.prototype.$notify = NotificationAPI;
};
