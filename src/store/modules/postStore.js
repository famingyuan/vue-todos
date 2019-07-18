// post 模块
export default {
    state: {
        'postName': 'Centrial News',
        'postCount': 100
    },
    getters: {
        fullPostName (state) {
            return 'China ' + state.postName;
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
