import COMMIT_TYPES from '@/store/mutations/mutation_types.js';
const actions = {
    asyncIncrement (context) {
        console.log('---- will increment count in 2000ms---');
        setTimeout(() => {
            context.commit('increment');
        }, 2000);
    },
    // 生成postID
    asyncGenerateId ({ commit, state, getters }) {
        console.log('---- will generate ID after 2000ms---');
        setTimeout(() => {
            commit(COMMIT_TYPES.UPDATE_POST_ID, Math.random());
        }, 2000);
    },
    // 第一个参数为context 包含先关参数
    // 第二个参数 接受传递的值
    resetPostId ({ commit, state, getters }, value) {
        console.log('---- will reset postId after 2000ms---');
        setTimeout(() => {
            commit(COMMIT_TYPES.RESET_POST_ID, value);
        }, 2000);
    }
};
export default actions;
