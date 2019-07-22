import Vuex from 'vuex';

import mutations from '@/store/mutations/mutations';
import baseState from '@/store/state/state';
import getters from '@/store/getters/getters';
import actions from '@/store/actions/actions';

import postStore from '@/store/modules/postStore';
import newsStore from '@/store/modules/newsStore';

export default () => {
    return new Vuex.Store({
        state: baseState,
        getters,
        mutations,
        actions,
        // 定义了模块之后 所有的 state getters mutations actions 默认映射到全局上
        // 否则就是 store.state[state/stateProperty]
        //    store.getters[module/gettersProperty]
        modules: {
            'post': postStore,
            'news': newsStore
        }
    });
};
