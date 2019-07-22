
//  所有针对state的变更都是在此处做
import mutationsType from './mutation_types';
export default {
    increment (state, value) {
        if (typeof (value) === 'number') {
            state.count = value;
        } else {
            state.count++;
        }
    },
    // 更新ID
    [mutationsType.UPDATE_POST_ID] (state, value) {
        state.postId = value;
    },
    // 重置
    [mutationsType.RESET_POST_ID] (state, value) {
        state.postId = value || 'reset to inital value';
    }

};
