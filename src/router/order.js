const Tabbar = () => import('@/components/Tabbar/');

export default [
  {
    path: '/order',
    name: 'cart',
    meta: {
      login: true,
      title: '购物车',
      keepAlive: true
    },
    components: { 
      default: () => import('@/views/order/tabbar-cart'), 
      tabbar: Tabbar 
    }
  },
  {
    path: '/order/checkout/:orderId',
    name: 'orderCheckout',
    props: true,
    meta: {
      // keepAlive: true
      login: true,
      title: '提交订单'
    },
    component: () => import('@/views/order/checkout')
  },
  // {
  //   path: '/order/order-detail',
  //   name: 'orderDetail',
  //   component: () => import('@/views/order/order-detail')
  // },
  {
    path: '/order/alipay',
    name: 'alipay',
    meta: {
      // keepAlive: true,
      title: '支付提示'
    },
    component: () => import('@/views/order/payment-mask')
  },
  {
    path: '/order/payment/:status/:orderid/:userid?',
    name: 'paymentStatus',
    meta: {
      login: true,
      title: '支付成功'
    },
    component: () => import('@/views/order/payment-status'),
    props: true
  }
];
