// 该文件用于配置路由关系
import Todo from '@/todo/todo.vue';

const Login = () => import('@/route-pages/login/login.vue');

const Sidebar = () => import('@/route-pages/sidebar/index.vue');

const LoginID = () => import('@/route-pages/login/loginID.vue');

const Test = () => import('@/route-pages/test/test.vue');

const Post = () => import('@/route-pages/post/index.vue');

const PostDetail = () => import('@/route-pages/post/detail.vue');

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
        // component: Login
        components: {
            default: Login,
            // 一个地址 配置多个视图情况以此来控制实现 多栏布局动态控制的问题
            sidebar: Sidebar
        },
        // 对多视图情况，分别设置各个视图是否启用props
        props: {
            default: true,
            sidebar: false
        },
        children: [
            {
                path: ':loginID',
                component: LoginID,
                // 一旦设置为了对象， 则原有的通过路径匹配到的 loginID 就不会自动注入了
                // 除非采用 函数返回对象，并使用 $route方式注入
                // props: {
                //     customId: 'this is customID'
                // },
                // 采用函数方式 可以自由组装参数
                props: (route) => {
                    return Object.assign({
                        customId: 'this is customID'
                    }, route.params);
                }

            }
        ]
    },

    {
        path: '/test/:id',
        component: Test,
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
                component: Login
            },
            // 访问路径为 /test/:id/login
            // 子路由 Login组件 需要显示在 test组件下的route-view中
            {
                path: 'login',
                component: Login,
                props: (route) => {
                    return Object.assign({
                        loginID: route.params.id
                    }, route.params);
                }
            }

        ]
    },

    {
        path: '/post/:postId',
        component: Post,
        props: true,
        // 路由独享 钩子
        beforeEnter: (to, from, next) => {
            // ...
            console.log('----component beforeEnter ----');
            next();
        },
        children: [
            {
                path: 'detail',
                props: true,
                component: PostDetail
            }
        ]
    }
];
