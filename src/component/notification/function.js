/**
 *
 * 对于alert\notification等小组件，通常使用的直接API调用方式
 * 该文件将封装对 notification 的API调用以及相关细节处理
 *
 */

import Vue from 'vue';

// vue 组件
import Component from './function-notification';
// API的调用 通常采用 new Constructor 方式来创建构造器，而无需通过new Vue 方式，
// 所以通过 Vue.extend API得到一个基于现有组件参数的 构造器

// Vue extend 实现参数的混入 ，类似于 Vue.mixin
const NotificationConstructor = Vue.extend(Component);

let instanceList = [];
let seed = 0;
let prefix = 'notification_';
function removeNotification (notification) {
    let index = -1;
    instanceList.some((item, _index) => {
        return item === notification && (index = _index) > 0;
    });
    if (index !== -1) {
        instanceList.splice(index, 1);
    } else {
        throw new Error('未找到 index = ' + index);
    }

    var adx = notification.vm.$el._offsetHeight + 20;
    for (var i = index, len = instanceList.length; i < len; i++) {
        instanceList[i].vm.verticalPos -= adx;
    }
}

function notify (options) {
    let verticalPos = 20;

    instanceList.forEach((item) => {
        verticalPos += item.vm.$el.offsetHeight + 20;
    });

    let instance = new NotificationConstructor({
        propsData: {
            content: 'notification ' + seed,
            verticalPos: verticalPos
        }
    });

    instance.id = prefix + (seed++);

    instanceList.push(instance);

    // 挂载到文档外部，只是生成了html代码，也就是存在 节点的，只是没有append到页面上
    // 且 返回 vm - 实例自身
    let vm = instance.$mount();

    // true ,两者是相同的
    console.log('vm === instance ===> ' + (vm === instance));

    instance.vm = vm;

    // 真正将组件挂载到文档上
    document.body.appendChild(instance.vm.$el);

    // 只是点击了关闭
    instance.vm.$on('close', () => {
        console.log('-----close -----');
        instance.vm.$el._offsetHeight = instance.vm.$el.offsetHeight;
        instance.vm.visible = false;
    });

    instance.vm.$on('closed', () => {
        console.log('-----closed -----');
        removeNotification(instance);
        // instance.vm.$el.remove();
        // 调用组件的销毁 组件销毁并不会删除dom
        instance.$destroy();
        // 删除创建的DOM节点
        document.body.removeChild(instance.vm.$el);
    });
}

export default notify;
