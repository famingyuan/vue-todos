/**
 * 基于现有组件 封装供API使用的组件，
 * 为组件添加API，参数等，因组件式 会扩展相关API 以适配相关JS操作
 */

import Notification from './notification.vue';

// 当前返回的是一个基于Notification的组件
export default {
    extends: Notification,
    // 外部注入属性 用于通过标签进行绑定采用的， API调用 通常用不到
    props: {

    },
    // 内部使用 ，外部可更改，但不可传值
    data () {
        return {
            // 设置为false 默认不显示，以便能出发 enter相关事件钩子
            visible: false,
            verticalPos: 0,
            autoClose: 3000,
            height: 0
        };
    },
    created () {
        console.log('----created function-notification');
    },
    mounted () {
        this.createTimer();
    },
    beforeDestroy () {
        this.clearTimer();
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
        // ==== 事件钩子
        afterEnter () {
            this.height = this.$el.offsetHeight;
            console.log('-----after enter ----', 'height = ' + this.height);
        },

        // --------
        // 离开时
        // --------

        // 待 隐藏之后
        // transition 如果没有name属性，则默认为 v
        afterLeave () {
            console.log('-----afterLeave---');
            console.log('orginal notification closed');
            this.$emit('closed');
        },

        createTimer () {
            if (this.autoClose) {
                this.timer = setTimeout(() => {
                    this.visible = false;
                }, +this.autoClose);
                console.log('will close in ' + this.autoClose);
            }
        },
        clearTimer () {
            this.timer && clearTimeout(this.timer);
        }
    }
};
