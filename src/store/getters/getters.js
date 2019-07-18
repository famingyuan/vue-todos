// getters 可以理解为 对 state中的数据 进行的computed操作
export default {
    // state为当前的全局state状态或者局部状态 具体取决于 getter 使用在具体的模块还是全局
    // getters为当前getters下的所有数据 可以调用别的getter
    countInfo: (state, getters) => 'count info is  ' + state.count,
    fullName: (state, getters) => {
        return state.firstName + ' ' + state.lastName;
    }
};
