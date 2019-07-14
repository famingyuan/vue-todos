// 该文件用于配置路由关系
import Todo from '../../todo/todo.vue';
import Login from '../../login/login.vue';
import Test from '../../test/test.vue';

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
    },

    {
        path: '/test/:id',
        component: Test,
        name: 'test-page',
        // 路由匹配的 id ，将作为属性 传入组件 Test ，
        // 从而不需要在组件中 通过 this.$route来获取。 从而实现组件于路由的解耦
        props: true,
        meta: {
            title: 'this is test page of vue todo.',
            description: 'used to pass params for SEO'
        },
        children: [
            // 访问路径为 /test/:id
            // 用于设置子路由的默认显示组件，通常用于存在多个子路由，需要默认显示一个时 使用
            {
                path: '',
                component: Login
            },
            // 访问路径为 /test/:id/login
            // 子路由 Login组件 需要显示在 test组件下的route-view中
            {
                path: 'login',
                component: Login
            }

        ]
    }
];
