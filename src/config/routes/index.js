// 该文件用于配置路由关系
import Todo from '../../todo/todo.vue';

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
        // component: () => import('../../login/login.vue')
        components: {
            default: () => import('../../login/login.vue'),
            // 一个地址 配置多个视图情况以此来控制实现 多栏布局动态控制的问题
            sidebar: () => import('../../sidebar/index.vue')
        }
    },

    {
        path: '/test/:id',
        component: () => import('../../test/test.vue'),
        name: 'test-page',
        // 路由匹配的 id ，将作为属性 传入组件 Test ，
        // 从而不需要在组件中 通过 this.$route来获取。 从而实现组件于路由的解耦
        // props: true,
        // 也可以直接传值
        props: {
            id: '8888'
        },
        meta: {
            title: 'this is test page of vue todo.',
            description: 'used to pass params for SEO'
        },
        children: [
            // 访问路径为 /test/:id
            // 用于设置子路由的默认显示组件，通常用于存在多个子路由，需要默认显示一个时 使用
            {
                path: '',
                component: import('../../login/login.vue')
            },
            // 访问路径为 /test/:id/login
            // 子路由 Login组件 需要显示在 test组件下的route-view中
            {
                path: 'login',
                component: import('../../login/login.vue')
            }

        ]
    }
];
