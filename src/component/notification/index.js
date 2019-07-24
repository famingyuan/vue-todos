/**
 *
 * 对于弹窗、提醒等组件通常都会定义为全局插件方式
 *
 */
// 外界调用 vue.use(pluginFn)

import Notification from '@/component/notification/notification.vue';
export default (Vue) => {
    // 全局注册组件
    Vue.component(Notification.name, Notification);
};
