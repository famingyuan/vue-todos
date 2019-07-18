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
            commit('updatePostName', value);
        }
    }
};
