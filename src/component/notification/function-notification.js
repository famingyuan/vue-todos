/**
 * 基于现有组件 封装供API使用的组件，
 * 为组件添加API，参数等
 */

import Notification from './notification.vue';

// 当前返回的是一个基于Notification的组件
export default {
    extends: Notification,
    props: {
        verticalPos: {
            type: Number,
            default: 20
        }
    },
    created () {
        console.log('----created function-notification');
    },
    computed: {
        style () {
            return {
                bottom: `${this.verticalPos}px`,
                left: 'auto',
                right: '20px'
            };
        }
    },
    methods: {
        createTimer () {
            this.timer = setTimeout(() => {
                this.visible = false;
            }, +this.timeCount);
        },
        clearTimer () {
            this.timer && clearTimeout(this.timer);
        }
    }
};
