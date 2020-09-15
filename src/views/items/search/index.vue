<template>
  <div class="item_search">
    <form action="/search"
          @submit="disabledSubmit">
      <van-search placeholder="请输入商品名称"
                  v-model="keyword"
                  @search="enterSearch"
                  autofocus />
    </form>
    <van-panel style="width: 100%;">
      <van-grid v-if="list.length" clickable :column-num="2" style="width: 100%;" :border="false">
        <van-grid-item
          v-for="(brand, index) in list"
          :key="index"
          style="width: 50%;"
          @click="goProductDetail(brand.id)"
        >
          <img :src="brand.cover" style="width: 90%" />
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
import { Panel, Grid, GridItem, Search } from 'vant';
import { productSearch } from '@/api/api';

export default {
  data() {
    return {
      keyword: '',
      list: []
    };
  },
  methods: {
    enterSearch() {
      this.reset();
      this.searchGoods();
    },
    reset() {
      this.list = [];
    },
    disabledSubmit() {
      return false;
    },
    searchGoods() {
      const params = {
        name: this.keyword
      }
      productSearch(params).then(res => {
        this.list = res.data.data;
      });
    },
    goProductDetail(id) {
      this.$router.push(`/Commoditydetails/${id}`);
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
.item_search {
  background-color: #fff;
}
.item_search_content {
  padding: 15px 10px 0;
}
.item_search_text,
.no-data {
  font-size: $font-size-normal;
  color: $font-color-gray;
  margin-bottom: 20px;
  text-align: center;
}

.item_search_history > span {
  margin-right: 10px;
  margin-bottom: 10px;
}
.name-wrapper {
  width: 90%;
  font-size:15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 10px;
}
.price-wrapper {
  width: 90%;
  height: 25px;
  text-align: center;
  font-size:14px;
  color: #F28A9F;
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
</style>
