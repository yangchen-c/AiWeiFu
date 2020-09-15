const tab_user = () => import('@/views/user/tabbar-user');
const UserAddress = () => import('@/views/user/module-address');
const UserAddressEdit = () => import('@/views/user/module-address-edit');
const UserOrderList = () => import('@/views/user/order-list');
const Tabbar = () => import('@/components/Tabbar/');

export default [
  {
    path: '/user',
    name: 'user',
    meta: {
      login: true,
      keepAlive: true,
      title: '个人中心'
    },
    components: { default: tab_user, tabbar: Tabbar }
    // beforeEnter: (to, from, next) => {
    //   if (localStorage.getItem('userid')) {
    //     next();
    //   } else {
    //     // next(false);
    //     window.location.href = '/home';
    //   }
    // }
  },
  {
    path: '/user/qrcode',
    name: 'qrcode',
    meta: {
      login: true,
      title: '会员二维码'
    },
    component: () => import('@/views/user/tabbar-user-qrcode')
  },
  {
    path: '/user/myteam',
    name: 'myteam',
    meta: {
      login: true,
      title: '我的爱心'
    },
    component: () => import('@/views/user/tabbar-user-myteam')
  },
  {
    path: '/user/myteamtwo',
    name: 'myteamtwo',
    meta: {
      login: true,
      title: '二级团队'
    },
    component: () => import('@/views/user/tabbar-user-myteamtwo')
  },
  {
    path: '/user/address/:isLink',
    name: 'address',
    props: true,
    meta: {
      login: true,
      title: '地址管理'
    },
    component: UserAddress
  },
  {
    path: '/user/address/edit',
    name: 'address-edit',
    props: true,
    meta: {
      login: true,
      title: '收货地址'
    },
    component: UserAddressEdit
  },
  {
    path: '/user/order/list/:active',
    name: 'user-order-list',
    meta: {
       login: true,
      title: '全部订单'
    },
    props: true,
    component: UserOrderList
  }
];
