<template>
  <div>
    <h2>{{ introduce }}</h2>
    <div class="tm">
      <div>
        count = {{ count }},
        countPlusLocalState = {{ countPlusLocalState }}
        countAlias = {{ countAlias }}
      </div>
      <div>getters countInfo: {{ countInfo }}</div>
      <div>msg: {{ msg }}</div>
      <div>msg2: {{ msg2 }}</div>
      <div>
        <button @click="increment">
          Add
        </button>
      </div>
    </div>
    <div class="tm">
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
    <div class="tm">
      <h4>Create by {{ fullName }}</h4>
    </div>
  </div>
</template>

<style lang="less">
</style>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import mutationsType from '@/store/mutations/mutation_types';

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
            }
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
            msg2: 'fullName'
            // 由于msg3 并不是getters中的属性 所以不能直接用
            // msg3 () {
            //     return 'hello from user ' + this.$store.getters.fullName;
            // }
        })

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

        // ===============actions 相关
        handle_dispatchUpdatePost () {
            this.$store.dispatch('asyncGenerateId');
        },

        // 同mapMutations 区别一样 ， 数组用于同名映射， 对象用于自定义名称映射
        // 需要注意的是，带参数的调用，务必在本地函数中 调用这些mapAction or mapMutations 函数，
        // 否则传递的参数 可能是事件对象
        ...mapActions(['asyncGenerateId']),
        ...mapActions({
            'newAsyncGenerateId': 'asyncGenerateId',
            'newAsyncResetGenerateId': 'resetPostId'
        })

    }

};
</script>
