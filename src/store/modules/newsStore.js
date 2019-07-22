// post 模块
export default {
    // 不指定namespace 则注册在全局下
    state: {
        'newsTitle': 'Vuex学习指南',
        'readCount': 5000
    },
    getters: {
        fullTitle (state, getters, rootState, rootGetters) {
            return 'Vuex Step by Step.';
        }
    },
    mutations: {
        updateTitle (state, value) {
            state.newsTitle = value || 'new Title';
        }
    },
    actions: {
        asyncUpdateTitle ({ commit, state, getters, rootActions }, value) {
            console.log('----will update title in 2000ms');
            setTimeout(() => {
                commit('updateTitle', value);
            }, 2000);
        }
    }
};
