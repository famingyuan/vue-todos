// 该文件用于路由设置

import VueRouter from 'vue-router';
import routes from '../router/index.js';

export default () => {
    return new VueRouter({
        routes
    });
};
