<template>
  <div class="post-page">
    post page
    postID:{{ postId }}
    title:{{ title }}
  </div>
</template>

<script>
export default {
    props: {
        postId: {
            type: [Number, String],
            required: false,
            default: -1
        },
        title: {
            type: Number,
            required: false,
            default: -1
        }
    },
    beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
        console.log('------beforeRouteEnter-------');
        next(vm => {
            // 通过 `vm` 访问组件实例
            console.log('beforeRouteEnter next vm.postId = ' + vm.postId);
        });
    },
    beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`

        // 对于 beforeRouteUpdate 和 beforeRouteLeave 来说，this 已经可用了，所以不支持传递回调，因为没有必要了。
        console.log('------beforeRouteUpdate-------');
        console.log('beforeRouteUpdate this.postId = ' + this.postId);
        next();
        this.$nextTick(() => {
            // 可以在nextTick 中 获取到最新的 postID
            console.log('next tick --->' + this.postId);
        });
    },
    beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
        console.log('------beforeRouteLeave-------');
        next();
    },
    mounted () {
        console.log('------post mounted-------');
    }

};

//  执行流程
// ---------global  beforeEach  -----
// ----component beforeEnter ---- 路由独立
// ------beforeRouteEnter-------  组件级
// ---------global beforeResolve -----
// ---------global afterEach -----
// ------post mounted-------
// 执行的大体流程是：
// 全局 beforeEach

// 路由独立 beforeEnter
// 组件 beforeRouteEnter this 无法使用，可以通过to from 拿到信息
// 或者 组件 beforeRouteUpdate （同一个组件 复用的情况）

// 全局 beforeResolve
// 全局 afterEach
</script>
