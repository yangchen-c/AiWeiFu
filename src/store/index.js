import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// localStorage.setItem('userid', '133');

export default new Vuex.Store({
  state: {
    //这里放全局参数
    availablePoints: 0,
    scrollTop: 0
    // currentPoints: 0
  },
  mutations: {
    //这里是set方法
    setAvailablePoints(state, availablePoints) {
      state.availablePoints = availablePoints;
    },
    setScrollTop(state, scrollTop) {
      state.scrollTop = scrollTop;
    }
    // setAvailablePoints(state,availablePoints){
    //   state.availablePoints = availablePoints
    // }
  },
  getters: {
    //get方法
    getAvailablePoints: state => state.availablePoints,
    getScrollTop: state => state.scrollTop
  },
  actions: {
    //这个部分我暂时用不上
  },
  modules: {
    //这里是我自己理解的是为了给全局变量分组，所以需要写提前声明其他store文件，然后引入这里
  }
});
