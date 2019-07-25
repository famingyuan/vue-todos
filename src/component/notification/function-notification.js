/**
 *
 * 对于alert\notification等小组件，通常使用的直接API调用方式
 *
 *
 */

import Vue from 'vue';

// vue 组件
import Notification from './notification.vue';

let instanceMapping = {};
let seed = 1;
function createNotification (options) {
    const NotificationCreator = Vue.extend(Notification);

    let instance = new NotificationCreator({
        propsData: {
            content: 'hello,this is a dynamic notification...'
        }
    });

    instance.id = 'notification_' + seed;

    instanceMapping[instance.id] = instance;

    // 挂载到文档外部，只是生成了html代码
    // 且 返回 vm - 实例自身
    let vm = instance.$mount();

    // true ,本质上 两者是相同的
    console.log('vm === instance ===> ' + (vm === instance));

    instance.vm = vm;

    // 真正将组件挂载到文档上
    document.body.appendChild(instance.vm.$el);

    instance.$on('close', () => {
        console.log('-----close -----');
    });

    instance.$on('closed', () => {
        console.log('-----closed -----');
        delete instanceMapping[instance.id];
        instance.vm.$el.remove();
    });
}

export default createNotification;
