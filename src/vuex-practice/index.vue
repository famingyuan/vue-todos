<template>
  <div>
    <h2>{{ introduce }}</h2>
    <div class="test-module">
      <h3>Vuex 基本语法使用</h3>
      <div class="tm-item">
        <div>
          count = {{ count }},
          countPlusLocalState = {{ countPlusLocalState }}
          countAlias = {{ countAlias }}
        </div>
        <div>getters countInfo: {{ countInfo }}</div>
        <div>msg: {{ msg }}</div>
        <div>msg2: {{ msg2 }}</div>
        <div>msg3:{{ msg3 }}</div>
        <div>
          <button @click="increment">
            Add
          </button>
        </div>
      </div>
      <div class="tm-item">
        <div>
          PostId: {{ postId }}
        </div>
        <div>
          <button @click="handle_updatePostId">
            handle_updatePostId
          </button>

          <button @click="handle_dispatchUpdatePost">
            handle_dispatchUpdatePost
          </button>

          <button @click="resetPostId">
            resetPostId
          </button>
        </div>
      </div>
    </div>
    <div class="test-module">
      <h3>Module 使用，有namespace情况</h3>
      <div class="tm-item">
        <p>modulePost_PostName: {{ modulePost_PostName }}</p>
        <p>modulePost_PostName_2:{{ modulePost_PostName_2 }}</p>
        <p>modulePost_postCount:{{ modulePost_postCount }}</p>
        <p>modulePost_fullPostName:{{ modulePost_fullPostName }}</p>
        <p>modulePost_fullPostName2:{{ modulePost_fullPostName2 }}</p>
      </div>
      <div class="tm-item">
        <h4>触发子模块 mutations</h4>
        <button @click="post_updatePostName">
          post/updatePostName
        </button>
        <h4>触发子模块 actions</h4>
        <button @click="post_asyncUpdatePostName">
          post/asyncUpdatePostName
        </button>
        <button @click="handle_post_asyncUpdatePostName2">
          handle_post_asyncUpdatePostName2
        </button>
        <button @click="handle_post_asyncUpdatePostName3">
          handle_post_asyncUpdatePostName3
        </button>
      </div>

      <div class="tm-item">
        <h3>Module 使用，无namespace情况</h3>
        <p>nm_newsTitle:{{ nm_newsTitle }}</p>
        <p>fullTitle:{{ fullTitle }}</p>
      </div>
      <div class="tm-item">
        <h3>Module 使用，无namespace情况，触发子模块函数</h3>
        <button @click="nm_updateTitle">
          nm_updateTitle
        </button>
        <button @click="nm_asyncUpdateTitle">
          nm_asyncUpdateTitle
        </button>
      </div>
    </div>

    <div class="tm-item">
      <h4>Create by {{ fullName }}</h4>
    </div>
  </div>
</template>

<style lang="less">
</style>

<script>
import { mapState, mapGetters, mapMutations, mapActions, createNamespacedHelpers } from 'vuex';
import mutationsType from '@/store/mutations/mutation_types';
// 创建基于某个模块的 map函数，包含 state,getter,mutations,actions
const { mapActions: modulePostMapActions } = createNamespacedHelpers('post');
export default {
    data () {
        return {
            localCount: 100
        };
    },
    computed: {
    // store.state 获取相关
        count () {
            return this.$store.state.count;
        },
        // 子模块属性 直接获取
        modulePost_postCount () {
            return this.$store.state.post.postCount;
        },
        // 采用 mapState ，如果属性重复，则后面的覆盖前面的
        ...mapState({
            // 箭头函数可使代码更简练
            count: state => state.count + '^_^',

            // 传字符串参数 'count' 等同于 `state => state.count`
            countAlias: 'count',

            // 为了能够使用 `this` 获取局部状态，必须使用常规函数
            countPlusLocalState (state) {
                return state.count + this.localCount;
            },

            // 可以任意增加 属性名
            msg () {
                return 'hello from user ' + this.$store.getters.fullName;
            },
            // =================== 子模块 state
            modulePost_PostName: state => state.post.postName
        }),
        // 指定模块 再做映射
        // 模块必须要配置namespaced: true,指定启用命名空间，
        // 如果不指定则可以通过state.moduleName.xx 来访问，但无法通过mapState传递指定模块方式找到

        ...mapState('post', {
            modulePost_PostName_2: state => state.postName
        }),

        // 将state中的 introduce ，映射为 computed中的 introduce
        ...mapState(['introduce', 'postId']),

        // ===== store.getters 获取相关
        fullName () {
            return this.$store.getters.fullName;
        },
        // mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：
        // 不能自定义函数作为计算属性使用，必须配合getters中的属性使用
        ...mapGetters({
            // 把 `this.countInfo` 映射为 `this.$store.getters.countInfo`
            countInfo: 'countInfo',
            msg2: 'fullName',
            // mapGetters 不支持自定义函数
            // msg3 () {
            //     return 'hello from user ' + this.$store.getters.fullName;
            // },
            msg3: 'fullName'
        }),

        // 定义了模块
        modulePost_fullPostName () {
            return this.$store.getters['post/fullPostName'];
        },
        ...mapGetters('post', {
            modulePost_fullPostName2: 'fullPostName'
        }),

        // 无namespace情况下的module state
        nm_newsTitle () {
            return this.$store.state.news.newsTitle;
        },

        // 无namespace情况下 getters注册在全局的
        fullTitle () { return this.$store.getters.fullTitle }

    },
    mounted () {
    // this.resetPostId('1111');
        this[mutationsType.RESET_POST_ID]('1234423432432');
        // this.RESET_POST_ID('111112');
        this.newAsyncResetGenerateId('this is new gernerate id by action function');
    },
    methods: {
    // =========== mutations相关
        increment () {
            this.$store.commit('increment');
        },
        handle_updatePostId () {
            this.$store.commit(mutationsType.UPDATE_POST_ID, '123456');
        },
        ...mapMutations([
            // 将 this[mutationsType.RESET_POST_ID]('newPostId') 映射为 this.$store.commit(mutationsType.RESET_POST_ID,'newPostId')
            // 之后调用 this[mutationsType.RESET_POST_ID](newPostId) 就可以了
            mutationsType.RESET_POST_ID
        ]),
        ...mapMutations({
            // 将 this.resetPostId(newPostId) 映射为 this.$store.commit(mutationsType.RESET_POST_ID,newPostId)
            // 之后调用 this.resetPostId(newPostId) 就可以了
            'resetPostId': mutationsType.RESET_POST_ID,
            'add': 'increment'
        }),
        // 以上采用数组的方式和 对象的方式区别仅在于 一个是默认名字，一个自定义名字
        // ====模块方式调用 mutations
        post_updatePostName () {
            this.$store.commit('post/updatePostName', 'from super mutations,postName=123456');
        },
        // ===============actions 相关
        handle_dispatchUpdatePost () {
            this.$store.dispatch('asyncGenerateId');
        },
        // ====模块方式调用 actions
        post_asyncUpdatePostName () {
            this.$store.dispatch('post/asyncUpdatePostName', 'from super actions ,postName=88888');
        },
        // 同mapMutations 区别一样 ， 数组用于同名映射， 对象用于自定义名称映射
        // 需要注意的是，带参数的调用，务必在本地函数中 调用这些mapAction or mapMutations 函数，
        // 否则传递的参数 可能是事件对象
        ...mapActions(['asyncGenerateId']),
        ...mapActions({
            'newAsyncGenerateId': 'asyncGenerateId',
            'newAsyncResetGenerateId': 'resetPostId'
        }),
        ...mapActions('post', {
            post_asyncUpdatePostName2: 'asyncUpdatePostName'
        }),
        handle_post_asyncUpdatePostName2 () {
            this.post_asyncUpdatePostName2('this is from handle_post_asyncUpdatePostName2');
        },
        ...modulePostMapActions({
            post_asyncUpdatePostName3: 'asyncUpdatePostName'
        }),
        handle_post_asyncUpdatePostName3 () {
            this.post_asyncUpdatePostName3('this is from handle_post_asyncUpdatePostName3');
        },
        nm_updateTitle () {
            console.log('----nm_updateTitle---');
        },
        // ========= 无 namespace 下的 mutations actions 访问
        ...mapMutations({
            nm_updateTitle: 'updateTitle'
        }),

        ...mapActions({
            nm_asyncUpdateTitle: 'asyncUpdateTitle'
        })
    }

};
</script>
