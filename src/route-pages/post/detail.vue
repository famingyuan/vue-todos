<template>
  <div class="post-detail">
    <div v-if="isLoading">
      loading...
    </div>
    <div v-if="err">
      error Info : {{ err }}
    </div>

    <div
      v-if="post"
      class="post-info"
    >
      title: {{ post.title }} <br>
      content: {{ post.content }}
    </div>
  </div>
</template>

<script>
const getPost = function (postId, callback) {
    console.log('----will get post id ---- ' + postId);
    setTimeout(() => {
        callback(null, {
            title: 'title [' + postId + ']',
            content: 'this is content of post [' + postId + ']'
        });
    }, 2000);
};
export default {
    props: {
        postId: {
            type: [String, Number],
            required: true
        }
    },
    data () {
        return {
            post: null,
            isLoading: true,
            err: null
        };
    },
    beforeRouteEnter (to, from, next) {
        // 先获取数据 然后才会创建 组件
        // 当前页面会先停留在 from 界面 需要from界面做相应的跳转提示
        getPost(to.params.postId, (err, post) => {
            next(vm => vm.setData(err, post));
        });
    },
    // 路由改变前，组件就已经渲染完了
    // 逻辑稍稍不同
    beforeRouteUpdate (to, from, next) {
        this.post = null;
        this.isLoading = true;
        getPost(to.params.postId, (err, post) => {
            this.setData(err, post);
            next();
        });
    },
    methods: {
        setData: function (err, post) {
            this.isLoading = false;
            this.err = err;
            this.post = post;
        }
    }
};
</script>
