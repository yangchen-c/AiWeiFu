// eslint-disable-next-line
const Tabbar = () => import('@/components/Tabbar/');

export default [
  {
    path: '/items',
    name: 'class',
    meta: {
      login: true,
      keepAlive: true,
      title: '分类'
    },
    components: {
      default: () => import('@/views/items/tabbar-catalog'),
      tabbar: Tabbar
    }
  },
  {
    path: '/items/search',
    name: 'search',
    meta: {
      login: true,
      keepAlive: true,
      title: '搜索'
    },
    component: () => import('@/views/items/search')
  },
  {
    path: '/items/list/:typeId',
    name: 'list',
    props: true,
    meta: {
      keepAlive: true,
      login: true,
      title: '分类详情'
    },
    component: () => import('@/views/items/list')
  },
  {
    path: '/Commoditydetails/:itemId',
    name: 'detail',
    props: true,
    meta: {
      // keepAlive: true,
      login: true,
      title: '商品详情'
    },
    component: () => import('@/views/items/detail')
  }
];
