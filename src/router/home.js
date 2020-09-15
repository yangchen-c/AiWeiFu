const Tabbar = () =>
    import ('@/components/Tabbar/');

export default [{
        path: '/',
        name: 'home',
        components: {
            default: () =>
                import ('@/views/home/tabbar-home'),
            tabbar: Tabbar
        },
        meta: {
            keepAlive: true,
            title: '首页'
        }
    },
    {
        path: '*',
        redirect: {
            name: 'home'
        }
    },
    {
        path: '/core',
        name: 'core',
        component: () =>
            import ('@/views/core/core'),
        meta: {
            title: "客服中心—爱璋喜瓦生殖健康平台"
        }
    },
];