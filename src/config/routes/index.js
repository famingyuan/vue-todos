// 该文件用于配置路由关系
import Todo from '../../todo/todo.vue';
import Login from '../../login/login.vue';

export default [
    {
        path: '/',
        redirect: '/app'
    },
    {
        path: '/app',
        component: Todo
    },
    {
        path: '/login',
        component: Login
    }
];
