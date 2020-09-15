<template>
  <div class="tab_class">
    <div class="tal_class_searchBox">
      <van-search placeholder="点击前往搜索" />
      <div
        class="tal_class_searchMask"
        @click="$router.push({ name: 'search' })"
      ></div>
    </div>

    <div class="class_tree clearfix">
      <ul class="class_tree_nav">
        <li
          v-for="(item, index) in categoryList"
          :key="index"
          :class="{ active_nav: currentCategory.id == item.id }"
          @click="changeCatalog(item.id)"
        >
          {{ item.name }}
        </li>
      </ul>
      <div class="class_tree_content">
        <div v-if="!hasContent">
          <van-grid clickable :column-num="3" :border="false">
            <van-grid-item
              v-for="(secondCategory, index) in secondCategoryList"
              :key="index"
              @click="goProductList(secondCategory.id)"
              style="width: 30%;"
            >
              <img :src="secondCategory.imgUrl" style="width: 100%" />
              <div
                style="width: 100%; font-size:14px; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 10px;"
              >
                {{ secondCategory.name }}
              </div>
            </van-grid-item>
          </van-grid>
        </div>
        <div v-else class="no-data">暂无数据</div>
      </div>
    </div>
  </div>
</template>

<script>
import { categoryList, secondCategoryList } from '@/api/api';
import { Search, Grid, GridItem } from 'vant';

export default {
  data() {
    return {
      categoryList: [],
      currentCategory: {},
      secondCategoryList: [],
      hasContent: false
    };
  },

  created() {
    this.getCategoryList();
  },

  methods: {
    getCategoryList() {
      categoryList().then(res => {
        const data = res.data.data;
        this.categoryList = data;
        this.currentCategory = data[0];
        const params = {
          typeId: this.currentCategory.id
        };
        secondCategoryList(params).then(res2 => {
          // this.secondCategoryList = res2.data.data;
          if (res2.data.code === 0 && res2.data.data.length) {
            this.secondCategoryList = res2.data.data;
            this.hasContent = false;
          } else {
            this.hasContent = true;
          }
        });
      });
    },
    changeCatalog(typeId) {
      const currentCategoryArr = this.categoryList.filter(item => {
        return item.id === typeId;
      });
      this.currentCategory = currentCategoryArr[0];
      const params = {
        typeId
      };
      secondCategoryList(params).then(res => {
        if (res.data.code === 0 && res.data.data.length) {
          this.secondCategoryList = res.data.data;
          this.hasContent = false;
        } else {
          this.hasContent = true;
        }
      });
    },
    goProductList(id) {
      this.$router.push({ path: `/items/list/${id}` });
    }
  },
  components: {
    [Search.name]: Search,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/mixin';
.no-data {
  font-size: 16px;
  color: #999;
  text-align: center;
}
.tab_class {
  overflow: hidden;
  background-color: #fff;
}
.height-fix {
  padding-bottom: 42px;
}
.tal_class_searchBox {
  position: relative;
}
.tal_class_searchMask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
}

.box {
  width: 250px;
  height: 20px;
  text-align: center;
  font-family: PingFangSC-Light, helvetica, 'Heiti SC';
  font-size: 13px;
  position: absolute;
  top: 95px;
}
.box span {
  line-height: 20px;
}
.class_tree {
  position: relative;
  background-color: #fff;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  height: 100%;
  box-sizing: border-box;
}
.class_tree_nav {
  float: left;
  width: 100px;
  height: 100%;
  background-color: #fff;
  overflow: scroll;
  > li {
    @include one-border;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-left: 2px solid $bg-color;
  }
  > li.active_nav {
    background-color: #fff;
    border-left: 2px solid #F28A9F;
    color: #F28A9F;
  }
}
.class_tree_content {
  margin-left: 100px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  .class_tree_all {
    text-align: right;
    padding-right: 10px;
    height: 40px;
    line-height: 40px;
    color: $font-color-gray;
    font-size: $font-size-small;
  }
  .van-icon-arrow {
    font-size: $font-size-small;
  }
  .class_tree_items_wrap {
    padding: 10px 20px;
    margin-right: -3%;
    margin-top: 70px;
    text-align: center;
    > div {
      float: left;
      padding-right: 3%;
      box-sizing: border-box;
      width: 33.333%;
      margin-bottom: 20px;
    }
    img {
      max-width: 100%;
    }

    .class_tree_item_img {
      display: inline-block;
      max-width: 100%;
      width: 70px;
      height: 70px;
    }
    .class_tree_item_name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
