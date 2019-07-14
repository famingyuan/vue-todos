// 该文件用于路由设置

import Router from 'vue-router';
import routes from '../routes/index.js';

export default () => {
    return new Router({
        mode: 'history',
        routes,
        // http://localhost:8000/base/app 加上之后 自定义的路由前面自动加上 /base/ 以及
        // router-link 的路由也会自动适配， 这也是使用 router-link 比 a标签好的原因
        base: '/base/',
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
