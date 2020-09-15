<template>
  <div>
    <div id="app">
      <keep-alive>
        <router-view class="view-router" v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view class="view-router" v-if="!$route.meta.keepAlive"></router-view>
      <router-view name="tabbar"></router-view>
    </div>

    <div>
      <div class="customerService">
        <router-link to="/core">
          <!-- <p class="customerService_text">药事咨询</p> -->
          <img class="icon" src="@/assets/core/icon.png" alt="">
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import locationParams from '@/utils/location-param.js';

export default {
  created() {
    // let currentUrl = window.location.href;
    // let paramsStr = currentUrl.split('?')[1];
    // console.log(paramsStr);
    // if (paramsStr) {
    //   let paramsArr = paramsStr.split('&');
    //   let userid = '';
    //   for (var i = paramsArr.length - 1; i >= 0; i--) {
    //     if (paramsArr[i].indexOf('userid') !== -1) {
    //       userid = paramsArr[i].split('=')[1];
    //     }
    //   }
    //   if (userid) {
    //     localStorage.setItem('userid', userid);
    //   }
    // }
    let userid = locationParams('userid');
    if (userid) {
      localStorage.setItem('userid', userid);
    }

  }
}  
</script>

<style lang="scss" src="./assets/scss/global.scss"></style>

<style>
.customerService {
  width: 57px;
  height: 57px;
  display: block;
  position: fixed;
  right: 0;
  bottom: 100px;
}
.icon {
  width: 100%;
  height: 100%;
}
</style>
