// 该文件用于路由设置

import Router from 'vue-router';
import routes from '../routes/index.js';

export default () => {
    return new Router({
        mode: 'history',
        routes,
        linkActiveClass: 'active-link',
        linkExactActiveClass: 'exact-active-link',
        // 处理浏览器滚动位置
        scrollBehavior (to, from, savedPostion) {
            return savedPostion || { x: 0, y: 0 };
        },
        // 如果浏览器不支持 history 则启用hash
        fallback: true
        // parseQuery (str) {
        // },
        // stringifyQuery (obj) {
        // }
    });
};
