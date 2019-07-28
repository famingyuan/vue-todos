<template>
  <transition
    name="fade"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @enter-cancelled="enterCancelled"

    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
    @leave-cancelled="leaveCancelled"
  >
    <div
      v-show="visible"
      class="notification"
      :style="style"
    >
      <span>{{ content }}</span>
      <button @click="close">
        {{ btn }}
      </button>
    </div>
  </transition>
</template>

<style lang="less" scoped>
.notification {
  position: absolute;
  bottom: 0;
  left: 20px;
  padding: 10px 15px;
  background: #ddd;
  display: flex;
  justify-content: space-between;
  z-index: 999;
  transition: all 0.3s;
  align-items: center;
  min-width: 280px;
  span {
    font-size: 20px;
  }
  button {
    font-size: 16px;
  }
}
</style>

<script>
export default {
    name: 'Notification',
    props: {
        content: {
            type: String,
            required: true
        },
        btn: {
            type: String,
            default: '删除'
        }

    },
    data () {
        return {
            visible: true
        };
    },
    computed: {
        style () {
            return {};
        }
    },
    created () {
        console.log('----created notification');
    },
    methods: {

        // 由外层 控制 notification的显示与否
        close () {
            this.$emit('close');
        },
        // ==== 事件钩子函数
        beforeEnter: function (el) {
            // ...
            console.log('----base beforeEnter-----');
        },
        // 当与 CSS 结合使用时 回调函数 done 是可选的。
        // done的调用 必须是异步，因为其表示过度的结束，所以即便是采用异步 ，其时间也必须大于css动画的时间
        // 所以通常情况下，不调用，除非采用JS控制样式操作，并且在JS动画完成之后 才调用 done，表示动画的完毕，从而afterEnter才会执行
        // 一旦配置了 enter事件，则且有done参数 则必须要调用 done，以表示动画完毕
        enter: function (el) {
            console.log('-----base enter---');
            // eslint-disable-next-line no-debugger
            // debugger;
        },
        afterEnter () {
            console.log('-----base after enter ----');
        },
        enterCancelled: function (el) {
            // ...
            console.log('-----base enterCancelled---');
        },

        // --------
        // 离开时
        // --------

        beforeLeave: function (el) {
            // ...
            console.log('-----base beforeLeave---');
        },
        // 当与 CSS 结合使用时
        // 回调函数 done 是可选的
        leave: function (el, done) {
            // ...
            console.log('-----base leave---');
            setTimeout(() => {
                done();
            }, 900);
        },
        // 待 隐藏之后
        // transition 如果没有name属性，则默认为 v
        afterLeave () {
            console.log('-----base afterLeave---');
            this.$emit('closed');
        },
        // leaveCancelled 只用于 v-show 中
        leaveCancelled: function (el) {
            // ...
            console.log('-----base leaveCancelled---');
        }

    }
};
</script>
