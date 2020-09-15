import Vue from 'vue';
import Router from 'vue-router';
import { getLocalStorage } from '@/utils/local-storage';

import home from './home';
import items from './items';
import user from './user';
import order from './order';
import getPageTitle from '@/utils/get-page-title';
// import store from '../store';

Vue.use(Router);

const RouterModel = new Router({
  mode: 'history',
  routes: [...home, ...items, ...user, ...order]
});

RouterModel.beforeEach((to, from, next) => {
  document.title = getPageTitle(to.meta.title);
  // const { hasUserId } = getLocalStorage(
  //   'userid'
  // );
  // if (!hasUserId) {
  //   if (to.meta.login) {
  //     next({ name: 'home' });
  //     return;
  //   }
  // }
  // 要离开页面如果设置为不滚回到顶部，则本页是要记住上滚动高度到vuex中，以便下次进来恢复高度
  // if(from.meta.keepAlive==true) {
  //   console.log(document.documentElement.scrollTop)
  //   store.commit('setScrollTop', document.documentElement.scrollTop)
  // }
  next();
});

// RouterModel.afterEach((to, from) => {

//     // 如果进入后的页面是要滚动到顶部，则设置scrollTop = 0
//     //否则从vuex中读取上次离开本页面记住的高度，恢复它
//     if(to.meta.keepAlive==true){
//         console.log(store.state.scrollTop)
//         setTimeout(()=>{
//             document.documentElement.scrollTop = store.state.scrollTop
//         },50)
//     }else{
//         setTimeout(()=>{
//             document.documentElement.scrollTop = 0
//         },10)

//     }
// });

export default RouterModel;
