// post 模块
export default {
    // 需要指定命名空间，如果不指定则可以通过state.moduleName.xx 来访问，但无法通过mapState传递指定模块方式找到
    namespaced: true,
    state: {
        'postName': 'Centrial News',
        'postCount': 188
    },
    getters: {
        fullPostName (state, getters, rootState) {
            return 'China ' + state.postName + ' , Super postId = ' + rootState.postId;
        }
    },
    mutations: {
        updatePostName (state, value) {
            state.postName = value || 'new Post Name';
        }
    },
    actions: {
        asyncUpdatePostName ({ commit, state, getters }, value) {
            console.log('----will update post name in 2000ms');
            setTimeout(() => {
                commit('updatePostName', value);
            }, 2000);
        }
    }
};
