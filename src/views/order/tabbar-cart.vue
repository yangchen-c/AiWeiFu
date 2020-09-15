<template>
  <div class="tab-cart" ref="wrapper">
    <van-checkbox-group class="card-goods" v-model="checkedGoods">
      <div v-for="(item, i) in goods" :key="i" class="card-goods__item">
        <div class="card-goods__item-top">
          <van-checkbox :key="item.id" :name="item.id" v-model="item.selectState === 1" @click="toggle(item.id)"></van-checkbox>

          <van-card class="shoppingcar-card" :title="item.product.name" :price="item.product.price + '.00'" :thumb="item.product.cover">
            <div slot="footer" style="margin-top: -25px;">
              <van-stepper v-model="item.num" @plus="addNum(i)" @minus="subNum(i)" disableInput />
            </div>
          </van-card>
        </div>

        <div class="cart_delete" @click="deleteCart(i)">删除商品</div>
      </div>
    </van-checkbox-group>

    <div class="no-goods-content" v-if="!goods.length && !loadingCarList">
      <is-empty>您的购物车空空如也~</is-empty>
      <div class="go-index" @click="goIndex">去首页逛逛吧~</div>
    </div>

    <van-loading v-if="
        loadingCarList ||
          loadingSelectedAll ||
          loadingSelected ||
          loadingLikeList
      " vertical color="#f18ba2" style="text-align: center; margin-top: 50px;">加载中...
    </van-loading>

    <van-panel class="like-panel">
      <h3 class="like-title">——— 你可能还喜欢 ———</h3>
      <van-grid v-if="likeList.length" clickable :column-num="2" style="width: 100%;" :border="false">
        <van-grid-item v-for="(brand, index) in likeList" :key="index" style="width: 50%;" @click="goProductDetail(brand.id)">
          <img :src="brand.cover" style="width: 90%" />
          <div class="name-wrapper">
            {{ brand.name }}
          </div>
          <div class="price-wrapper">
            <span class="price">价格：￥{{ brand.price }}</span>
            <img class="car-icon" src="../../assets/images/car.png" />
          </div>
        </van-grid-item>
      </van-grid>
      <div v-else class="no-data">暂无推荐商品</div>
    </van-panel>

    <van-submit-bar style="bottom: 50px" :price="totalPrice" :disabled="!checkedGoods.length" :buttonText="'结算'" :loading="isSubmit" label="总计" @submit="cartSubmit">
      <van-checkbox v-model="checkedAll" @click="setCheckAll" style="padding: 0 10px;">全选
      </van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import {
  Panel,
  Grid,
  GridItem,
  Checkbox,
  CheckboxGroup,
  Card,
  SubmitBar,
  Stepper,
  Tag
} from 'vant';
import {
  carList,
  carDelete,
  carNumAdd,
  carNumSub,
  carSelected,
  carSelectedAll,
  orderAddByCar,
  likeList
} from '@/api/api';
// import { setLocalStorage } from '@/utils/local-storage';

import isEmpty from '@/components/is-empty/';
import _ from 'lodash';

export default {
  data() {
    return {
      // isEditor: false,
      checkedAll: false,
      isSubmit: false,
      checkedGoods: [],
      allGoods: [],
      goods: [],
      loadingCarList: true,
      loadingSelectedAll: false,
      loadingSelected: false,
      likeList: [],
      loadingLikeList: true
    };
  },
  created() {
    this.init();
    this.getLikeList();
  },
  activated() {
    this.$refs.wrapper.scrollTop = this.$store.state.scrollTop;
  },
  computed: {
    totalPrice() {
      let selectedGoods = [];
      _.each(this.checkedGoods, id => {
        selectedGoods.push(
          _.find(this.goods, vv => {
            return id === vv.id;
          })
        );
      });
      return selectedGoods.reduce(
        (total, item) => total + item.product.price * item.num * 100,
        0
      );
    }
  },

  methods: {
    goIndex() {
      this.$router.push({ path: '/' });
    },
    addNum(index) {
      const id = this.goods[index].id;
      const userId = localStorage.getItem('userid');
      const data = {
        id,
        userId
      };
      carNumAdd(data).then(
        res => {
          console.log(res);
        },
        () => {
          this.$toast({
            message: '增加失败，请稍后重试',
            duration: 1500
          });
        }
      );
    },
    subNum(index) {
      const id = this.goods[index].id;
      const userId = localStorage.getItem('userid');
      const data = {
        id,
        userId
      };
      carNumSub(data).then(
        () => {
          // console.log(res);
        },
        () => {
          this.$toast({
            message: '减少失败，请稍后重试',
            duration: 1500
          });
        }
      );
    },
    getLikeList() {
      this.loadingLikeList = true;
      const userId = localStorage.getItem('userid');
      const params = {
        userId
      };
      likeList(params).then(
        res => {
          this.loadingLikeList = false;
          this.likeList = res.data.data;
        },
        () => {
          this.loadingLikeList = false;
        }
      );
    },
    init() {
      this.loadingCarList = true;
      const userId = localStorage.getItem('userid');
      const params = {
        userId
      };
      carList(params).then(
        res => {
          this.loadingCarList = false;
          if (res.data.code === 0) {
            this.goods = res.data.data.buyCar;
            this.allGoods = this.getAllList();
            this.checkedGoods = this.getCheckedList(this.goods);
            if (this.checkedGoods.length === this.allGoods.length) {
              this.checkedAll = true;
            } else {
              this.checkedAll = false;
            }
          } else {
            this.goods = [];
          }
        },
        () => {
          this.loadingCarList = false;
          this.goods = [];
        }
      );
    },
    getAllList() {
      let result = [];
      _.each(this.goods, v => {
        result.push(v.id);
      });
      return result;
    },
    getCheckedList(goods) {
      let result = [];
      _.each(goods, v => {
        if (v.selectState === 1) {
          result.push(v.id);
        }
      });
      return result;
    },
    cartSubmit(info) {
      console.log(info);
      let productIds = [];
      let checkedGoods = this.checkedGoods;
      _.each(checkedGoods, id => {
        productIds.push(
          _.find(this.goods, vv => {
            return id === vv.id;
          }).productId
        );
      });
      this.isSubmit = true;
      // setLocalStorage({AddressId: 0, CartId: 0, CouponId: 0});

      const userId = Number(localStorage.getItem('userid'));
      const data = {
        userId
      };
      orderAddByCar(data).then(res => {
        if (res.data.code === 0) {
          const orderId = res.data.data;
          this.$router.push('/order/checkout/' + orderId);
        }
      });
    },
    setCheckAll(val) {
      console.log(val);
      this.loadingSelectedAll = true;
      const userId = localStorage.getItem('userid');
      const data = {
        userId
      };
      carSelectedAll(data).then(() => {
        this.loadingSelectedAll = false;
      });
      if (this.checkedGoods.length === this.allGoods.length) {
        this.checkedGoods = [];
      } else {
        this.checkedGoods = this.allGoods;
      }
    },
    deleteCart(o) {
      let id = this.goods[o].id;
      this.$dialog
        .confirm({ message: '确定删除所选商品吗', cancelButtonText: '再想想' })
        .then(() => {
          this.$nextTick(() => {
            this.deleteNext(id);
          });
        });
    },
    toggle(id) {
      this.loadingSelected = true;
      const data = {
        id
      };
      carSelected(data).then(() => {
        this.loadingSelected = false;
        if (this.checkedGoods.length === this.allGoods.length) {
          this.checkedAll = true;
        } else {
          this.checkedAll = false;
        }
      });
    },
    deleteNext(id) {
      const userId = localStorage.getItem('userid');
      const params = {
        id,
        userId
      };
      carDelete(params).then(res => {
        if (res.data.code === 0) {
          this.init();
        }
      });
    },
    goProductDetail(id) {
      const scroll = this.$refs.wrapper.scrollTop;
      this.$store.commit('setScrollTop', scroll);
      this.$router.push({ path: '/Commoditydetails/' + id });
    }
  },

  components: {
    [Panel.name]: Panel,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Card.name]: Card,
    [Tag.name]: Tag,
    [Stepper.name]: Stepper,
    [isEmpty.name]: isEmpty,
    [Checkbox.name]: Checkbox,
    [SubmitBar.name]: SubmitBar,
    [CheckboxGroup.name]: CheckboxGroup
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/mixin';

.tab-cart {
  padding: 20px 10px 50px;
  // padding-bottom: 50px;
  box-sizing: border-box;
}

.editor_head {
  @include one-border;
  text-align: right;
  padding: 10px;
  font-size: $font-size-normal;
  background-color: #fff;
}
.card-goods {
  background-color: $bg-color;
  .card-goods__item {
    border-radius: 7px;
    margin-bottom: 10px;
    background-color: #fff;
    .card-goods__item-top {
      display: flex;
      align-items: center;
    }
  }
  .cart_delete {
    width: 100%;
    height: 45px;
    text-align: center;
    // line-height: 38px;
    padding: 10px 0;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    border-top: 0.5px solid #e6e6e6;
    // line-height: 100px;
    // padding: 0 10px;
    // color: #fff;
    // background-color: #f18ba2;
    &::before {
      display: inline-block;
      content: '';
      width: 20px;
      height: 19px;
      background: url('../../assets/images/goods_delete.png') center no-repeat;
      background-size: 100%;
      vertical-align: text-bottom;
      margin-right: 8px;
    }
  }
  .card-goods__footer {
    font-size: $font-size-normal;
    color: $font-color-gray;
  }
}
.no-goods-content {
  display: flex;
  flex-direction: column;
  jusity-content: center;
  align-items: center;
  .go-index {
    width: 180px;
    height: 45px;
    border: 0.5px solid #f28a9f;
    border-radius: 4px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(242, 138, 159, 1);
    text-align: center;
    line-height: 45px;
    margin-top: 60px;
  }
}

.clear_invalid {
  width: 120px;
  color: $font-color-gray;
  border: 1px solid $font-color-gray;
  margin: 0 auto;
  text-align: center;
  padding: 5px 3px;
  margin-top: 20px;
  border-radius: 3px;
}

.like-panel {
  background-color: $bg-color;
  margin-bottom: 50px;
}
.like-panel .van-cell {
  background-color: $bg-color;
}

.like-title {
  margin-top: 50px;
  color: #f28a9f;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
}
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
  margin-bottom: 50px;
}
</style>
<style>
.shoppingcar-card .van-card__title {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(245, 106, 69, 1);
}
.shoppingcar-card .van-card__price {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(235, 0, 0, 1);
}
.van-checkbox__icon--checked .van-icon {
  background-color: #f18ba2;
  border-color: #f18ba2;
}
.van-stepper__minus,
.van-stepper__plus,
.van-stepper__input {
  background-color: #fff;
  border: 0.5px solid #999;
  height: 25px;
}
.van-stepper__input {
  color: #f56a45;
  margin: 0;
  border-left: none;
  border-right: none;
}
.van-submit-bar__price {
  color: rgba(235, 0, 0, 1);
}
.van-submit-bar__button--danger {
  background: #f18ba2;
  border-color: #f18ba2;
}
</style>
