import Vuex from 'vuex';

import mutations from '@/store/mutations/mutations';
import baseState from '@/store/state/state';
import getters from '@/store/getters/getters';
import actions from '@/store/actions/actions';

import postStore from '@/store/modules/postStore';

export default () => {
    return new Vuex.Store({
        state: baseState,
        getters,
        mutations,
        actions,

        modules: {
            'post': postStore
        }
    });
};
