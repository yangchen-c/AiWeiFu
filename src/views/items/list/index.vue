<template>
  <div class="tab_product_list" ref="wrapper">
    <div class="tal_class_searchBox">
      <van-search
        placeholder="点击前往搜索"
        @click="$router.push({ name: 'search' })"
      />
      <div class="tal_class_searchMask"></div>
    </div>
    <van-panel>
      <van-grid
        v-if="productList.length"
        clickable
        :column-num="2"
        style="width: 100%;"
        :border="false"
      >
        <van-grid-item
          ref="scrollerBottom"
          v-for="(brand, index) in productList"
          :key="index"
          style="width: 50%;"
          @click="goProductDetail(brand.id)"
        >
          <img :src="brand.cover" style="width: 90%; height: 155px;" />
          <div class="name-wrapper">
            {{ brand.name }}
          </div>
          <div class="price-wrapper">
            <span class="price">价格：￥{{ brand.price }}</span>
            <img class="car-icon" src="../../../assets/images/car.png" />
          </div>
        </van-grid-item>
      </van-grid>
      <div v-else class="no-data">暂无数据</div>
    </van-panel>
  </div>
</template>

<script>
import { productListByType } from '@/api/api';
import { Search, Panel, Grid, GridItem } from 'vant';

export default {
  props: {
    typeId: [String, Number]
  },
  data() {
    return {
      productList: [],
      id: 0
    };
  },
  created() {
    this.getProductListByType();
  },
  activated() {
    //由于缓存了本页面，每次激活页面都要判断是否重置相关参数，并重新加载数据
    if (this.id !== this.typeId) {
      this.id = this.typeId; //更新分类id
      this.productList = []; //清空上次不同分类的产品数据
      this.getProductListByType();
    }
    this.$refs.wrapper.scrollTop = this.$store.state.scrollTop;
  },
  methods: {
    getProductListByType() {
      const params = {
        typeId: this.typeId
      };
      productListByType(params).then(res => {
        this.productList = res.data.data.product;
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
    [Grid.name]: Grid,
    [GridItem.name]: GridItem
  }
};
</script>

<style lang="scss" scoped>
.name-wrapper {
  width: 90%;
  font-size: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 10px;
}
.price-wrapper {
  width: 90%;
  height: 25px;
  text-align: center;
  font-size: 14px;
  color: #f28a9f;
  margin-top: 10px;
  padding: 0 10px;
  box-sizing: border-box;
}
.price {
  float: left;
}
.car-icon {
  float: right;
  width: 22px;
  height: 22px;
  vertical-align: middle;
}
.no-data {
  font-size: 16px;
  color: #999;
  text-align: center;
}
</style>
