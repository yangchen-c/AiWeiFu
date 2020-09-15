<template>
  <div class="tab_home" ref="wrapper">
    <div class="tal_class_searchBox">
      <van-search placeholder="点击前往搜索" @click="$router.push({ name: 'search' })" />
      <div class="tal_class_searchMask"></div>
    </div>
    <van-swipe :autoplay="5000" indicator-color="#F28A9F">
      <van-swipe-item v-for="(banner, index) in bannerList" :key="index" @click="bannerProductDetail(banner.url)">
        <img :src="banner.imgUrl" style="width: 100%; height:230px" />
      </van-swipe-item>
    </van-swipe>

    <div class="product-tips">
      <div class="item">
        <img src="@/assets/images/ddd.png" background-size="cover" />
        <span>官方正品保证</span>
      </div>
      <div class="item">
        <img src="@/assets/images/ddd.png" background-size="cover" />
        <span>七天无理由退换</span>
      </div>
      <div class="item">
        <img src="@/assets/images/ddd.png" background-size="cover" />
        <span>24小时内发货</span>
      </div>
    </div>

    <div class="goods-channel">
      <div class="item" @click="goProductList(channel.id)" v-for="(channel, index) in channelList" :key="index">
        <img :src="channel.imgUrl" background-size="cover" />
        <p>{{ channel.name }}</p>
      </div>
    </div>

    <van-panel style="margin-bottom: 50px;">
      <van-grid clickable :column-num="2" :border="false">
        <van-grid-item v-for="(brand, index) in hotProductList" :key="index" style="width: 50%;" @click="goProductDetail(brand.id)">
          <img :src="brand.cover" style="width: 90%" />
          <div style="width: 90%; font-size:15px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 10px;">
            {{ brand.name }}
          </div>
          <div style="width: 90%; text-align: center; font-size:14px; color: #F28A9F; margin-top: 5px;">
            价格：￥{{ brand.price }}
          </div>
        </van-grid-item>
      </van-grid>
      <div slot="header">
        <van-cell-group>
          <van-cell class="hot-product-wrapper">
            <template #title>
              <img src="@/assets/images/baopin.png" />
              <span class="custom-title hot-product-title">爆品专区</span>
              <span class="custom-value hot-product-sub-title">调理备孕</span>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </van-panel>

    <!-- <div class="customerService">
      <router-link to="/core">
        <p class="customerService_text">药事咨询</p>
        <img class="icon" src="@/assets/core/icon.png" alt="">
      </router-link>
    </div> -->

  </div>
</template>

<script>
import { bannerList, channelList, hotProductList } from '@/api/api';

import {
  Swipe,
  SwipeItem,
  Tabbar,
  TabbarItem,
  Search,
  Panel,
  Grid,
  GridItem
} from 'vant';

export default {
  data() {
    return {
      bannerList: [],
      channelList: [],
      hotProductList: []
    };
  },
  activated() {
    this.$refs.wrapper.scrollTop = this.$store.state.scrollTop;
  },
  created() {
    // let currentUrl = window.location.href;
    // console.log(currentUrl);
    // console.log(this.$route.query.userid);
    // const userid = this.$route.query.userid;
    // if (userid) {
    //   localStorage.setItem('userid', userid);
    // }
    this.getBannerList();
    this.getChannelList();
    this.getHotProductList();
  },

  methods: {
    GetUrlRelativePath(url) {
      let arrUrl = url.split('http://client.aiweifujk.com/');
      let start = '';
      if (arrUrl[1].indexOf('?') !== -1) {
        start = arrUrl[1].split('?')[0];
      } else {
        start = arrUrl[1];
      }
      return start;
    },
    GetUrlPara(url) {
      let params = '';
      if (url.indexOf('?') !== -1) {
        let arrUrl = url.split('?');
        let para = arrUrl[1].split('=');
        params = para[1];
      }
      return params;
    },
    getBannerList() {
      bannerList().then(res => {
        this.bannerList = res.data.data;
      });
    },
    bannerProductDetail(url) {
      if (url) {
        let routerPath = this.GetUrlRelativePath(url);
        let routerParams = this.GetUrlPara(url);
        this.$router.push({ path: routerPath + '/' + routerParams });
      }
    },
    getChannelList() {
      channelList().then(res => {
        this.channelList = res.data.data;
      });
    },
    goProductList(id) {
      this.$router.push({ path: '/items/list/' + id });
    },
    getHotProductList() {
      hotProductList().then(res => {
        this.hotProductList = res.data.data;
      });
    },
    goProductDetail(id) {
      const scroll = this.$refs.wrapper.scrollTop;
      this.$store.commit('setScrollTop', scroll);
      this.$router.push({ path: '/Commoditydetails/' + id });
    }
  },

  components: {
    [Search.name]: Search,
    [Panel.name]: Panel,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem
  }
};
</script>

<style lang="scss" scoped>
.interval_bot {
  margin-bottom: 10px;
}
.van-panel {
  margin-top: 20px;
}
.product-tips {
  background: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px 0;
}
.product-tips .item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.product-tips img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
  vertical-align: middle;
}
.product-tips span {
  font-size: 12px;
  text-align: center;
  color: #f28a9f;
  font-weight: 600;
}
.goods-channel {
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-top: 10px;
}
.goods-channel .item {
  width: 25%;
  text-align: center;
  margin-top: 10px;
}
.goods-channel img {
  width: 55px;
  height: 55px;
  border-radius: 50%;
}
.goods-channel p {
  // display: inline-block;
  font-size: 14px;
  text-align: center;
  margin-top: 5px;
  margin-bottom: 10px;
  color: #333;
}
.hot-product-title {
  font-size: 18px;
  color: #1b1a1a;
  font-weight: 600;
  margin-left: 8px;
}
.hot-product-sub-title {
  // margin-left: -150px;
  margin-left: 15px;
  text-align: left;
  font-size: 15px;
  color: #c1baba;
}
.hot-product-wrapper img {
  width: 20px;
  height: 20px;
  vertical-align: text-bottom;
}
.customerService {
  width: 57px;
  height: 57px;
  display: block;
  position: fixed;
  right: 0;
  bottom: 100px;
  // background: forestgreen;
}
.icon {
  width: 100%;
  height: 100%;
}
</style>
