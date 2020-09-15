<template>
  <div class="item_detail">
    <van-swipe indicator-color="#F28A9F">
      <van-swipe-item v-for="(image, index) in banners" :key="index">
        <img width="100%" :src="image">
      </van-swipe-item>
    </van-swipe>
    <van-cell-group class="item_cell_group" v-if="goods">
      <van-cell class="item_info">
        <div class="item-title">
          {{ goods.name }}
        </div>
        <div class="item-sub-title">
          <span class="item_price">价格: {{ goods.price + '.00' }}元</span>
          <span class="item-baoyou">包邮</span>
          <span class="item-sales">销售{{ goods.sales }}件</span>
        </div>
      </van-cell>
    </van-cell-group>

    <van-popup v-model="propsPopup" :show="propsPopup" position="bottom">
      <div class="popup-container">
        <div class="goods-img-txt">
          <img class="goods-img" :src="goods.cover">
          <div class="goods-txt">
            <p class="goods-name">{{ goods.name }}</p>
            <p class="goods-price">￥{{ goods.price + '.00' }}</p>
          </div>
        </div>
        <div class="goods-num">
          <p class="goods-num-left">购物数量</p>
          <div class="goods-num-right">
            <span class="add-sub-btn" @click="subNum">-</span>
            <span class="goods-num-num">{{ goodsNum }}</span>
            <span class="add-sub-btn" @click="addNum">+</span>
          </div>
        </div>
        <div class="buttons">
          <button @click="addCart(goods.id)">加入购物车</button>
          <button @click="buyGoods(goods.id)">立即购买</button>
        </div>
      </div>
    </van-popup>

    <div class="item_desc">
      <div class="item_desc_title">商品详情</div>
      <div class="item_desc_wrap" v-if="goods.detail" v-html="goods.detail"></div>
      <div class="item_desc_wrap" v-else style="text-align: center;">
        <p>暂无详情</p>
      </div>
    </div>

    <div class="desc-sub-title">
      <span>·正品保障</span>
      <span>·退购无忧</span>
      <span>·爱心客服</span>
    </div>
    <div class="desc-price-intro">
      <h3>价格说明</h3>
      <p>
        <span>划线价格：</span>
        划线的价格是商品的专柜价、的吊牌价、正品零售价、指导价。曾经展示过的销售价，仅供你参考。
      </p>
      <p>
        <span>未划线价格：</span>
        未划线的价格是商品的销售标价，具体的成交价格因为会员使用优惠劵、积分等发生变化，最终以订单结算价格为准。
      </p>
      <p>
        *此说明仅当出现价格比较时有效。若这件商品针对划线价进行了特殊说明，以特殊说明为准。
      </p>
    </div>

    <van-goods-action>
      <van-goods-action-icon @click="toCart" icon="cart-o" text="购物车" />
      <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" />
      <van-goods-action-button type="warning" text="加入购物车" @click="skuClick" />
      <van-goods-action-button type="danger" text="立即购买" @click="skuClick" />
    </van-goods-action>
  </div>
</template>

<script>
import { productDetail, carAdd, orderAdd } from '@/api/api';
import {
  Sku,
  Swipe,
  SwipeItem,
  GoodsAction,
  GoodsActionButton,
  GoodsActionIcon,
  Popup
} from 'vant';
// import meiqia from '@/utils/meiqia';
// import { setLocalStorage } from '@/utils/local-storage';
// import _ from 'lodash';

export default {
  props: {
    itemId: [String, Number]
  },

  data() {
    return {
      goodsNum: 1,
      banners: [],
      goods: {},
      propsPopup: false
    };
  },

  created() {
    this.initData();
  },

  methods: {
    onClickIcon() {
      // window.location.href = 'https://chatlink.mstatik.com/widget/standalone.html?eid=248759&fallback=1&agentid=30b603afddf91efd3ef472cc21f5466f,d21edcf661f6b53c5033fab4b2fe9856';
      // _MEIQIA('init');
      // _MEIQIA('showPanel');
      this.$router.push({ path: '/core' });
    },
    subNum() {
      this.goodsNum--;
      if (this.goodsNum < 1) {
        this.goodsNum = 1;
      }
    },
    addNum() {
      this.goodsNum++;
    },
    skuClick() {
      this.propsPopup = true;
    },
    initData() {
      const userId = localStorage.getItem('userid');
      const params = {
        id: this.itemId,
        userId
      };
      productDetail(params).then(res => {
        this.goods = res.data.data;
        let bannersArr = this.goods.image.split(',');
        for (let i=0; i<bannersArr.length; i++) {
          if (bannersArr[i]) {
            this.banners.push(bannersArr[i]);
          }
        }
      });
    },
    toCart() {
      this.$router.push({
        name: 'cart'
      });
    },
    addCart(id) {
      const userId = Number(localStorage.getItem('userid'));
      let data = {
        userId,
        num: this.goodsNum,
        productId: id
      };

      carAdd(data).then(res => {
        if (res.data.code === 0) {
          this.$toast({
            message: '已添加至购物车',
            duration: 2000
          });
          this.propsPopup = false;
        }
      });
    },
    buyGoods(id) {
      const userId = Number(localStorage.getItem('userid'));
      let params = {
        userId,
        num: this.goodsNum,
        productId: id
      };
      orderAdd(params).then(res => {
        if (res.data.code === 0) {
          const orderId = res.data.data;
          this.$router.push('/order/checkout/' + orderId);
          this.propsPopup = false;
        }
      });
    }
  },

  components: {
    [Popup.name]: Popup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Sku.name]: Sku,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionButton.name]: GoodsActionButton,
    [GoodsActionIcon.name]: GoodsActionIcon
  }
};
</script>

<style lang="scss" scoped>
.item_detail {
  img {
    max-width: 100%;
  }
}

.item_cell_group {
  margin-bottom: 15px;
}

.item_price {
  font-size: 16px;
  color: #ec0000;
  margin-right: 10px;
}

.item_market_price {
  color: $font-color-gray;
  text-decoration: line-through;
  font-size: $font-size-small;
}

.item-title {
  font-size: 14px;
  color: #474444;
  line-height: 1.4;
  margin-bottom: 10px;
  // padding: 0 10px;
}
.item-sub-title {
  height: 20px;
  // padding: 0 10px;
}
.item-sub-title .item-price {
  float: left;
}
.item-sub-title .item-sales {
  float: right;
  font-size: 12px;
  color: #ec0000;
}
.item-sub-title .item-baoyou {
  float: right;
  margin-left: 15px;
  margin-top: 5px;
  width: 33px;
  height: 15px;
  background: linear-gradient(
    -33deg,
    rgba(245, 69, 69, 1),
    rgba(245, 111, 69, 1)
  );
  border-radius: 4px;
  text-align: center;
  line-height: 14px;
  font-size: 12px;
  color: #fff;
}
.item_dispatch {
  font-size: $font-size-small;
  color: $font-color-gray;
}

.item_intro {
  line-height: 18px;
  margin: 5px 0;
  font-size: $font-size-small;
  color: $font-color-gray;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.item_desc {
  background-color: #fff;
  /deep/ p {
    padding: 0 10px;
    margin-block-start: 0 !important;
    margin-block-end: 0 !important;
  }
  /deep/ img {
    max-width: 100%;
    display: block;
  }
}

.item_desc_title {
  @include one-border;
  padding: 10px 0;
  text-align: center;
  color: #db3d3c;
}

.desc-sub-title {
  text-align: center;
  font-size: 16px;
  color: #f54545;
  padding: 0 40px;
  margin-top: 30px;
}
.desc-sub-title span + span {
  margin-left: 30px;
}
.desc-price-intro {
  font-family: PingFang SC;
  font-weight: 500;
  color: #211a1a;
  padding: 0 20px;
}
.desc-price-intro h3 {
  font-size: 16px;
}
.desc-price-intro p {
  font-size: 12px;
  font-weight: normal;
  margin-top: 8px;
}
.desc-price-intro p span {
  font-size: 14px;
  font-weight: 600;
}

.popup-container {
  padding: 20px 10px;
}
.goods-img-txt,
.goods-num {
  width: 100%;
  // padding: 20px 10px 0;
  // box-sizing: border-box;
}
.goods-img-txt {
  height: 116px;
}
.goods-img,
.goods-txt {
  float: left;
}
.goods-img {
  width: 96px;
  height: 96px;
}
.goods-txt {
  margin-left: 12px;
  width: 68%;
  font-size: 14px;
}
p {
  margin: 0;
}
.goods-txt .goods-price {
  font-size: 16px;
  color: #f28a9f;
  font-weight: 500;
  margin-top: 10px;
}
.goods-num {
  font-size: 16px;
  height: 30px;
}
.goods-num-left {
  float: left;
}
.goods-num-right {
  float: right;
}
.goods-num .add-sub-btn {
  display: inline-block;
  width: 22px;
  height: 22px;
  border: 1px solid #aaa;
  text-align: center;
  line-height: 20px;
  font-size: 14px;
}
.goods-num-num {
  color: #f28a9f;
  display: inline-block;
  width: 22px;
  text-align: center;
}
.buttons {
  text-align: center;
}
.buttons button {
  width: 40%;
  height: 40px;
  outline: none;
  border: none;
  background: linear-gradient(to right, #ffd01e, #ff8917);
  font-size: 14px;
  color: #fff;
  text-align: center;
  line-height: 40px;
  border-radius: 30px 0 0 30px;
  margin-top: 20px;
}
.buttons button + button {
  background: linear-gradient(
    90deg,
    rgba(245, 69, 69, 1),
    rgba(245, 119, 69, 1)
  );
  border-radius: 0 30px 30px 0;
}
</style>
<style>
.van-goods-action-button--first {
  margin-left: 50px;
}
.van-goods-action-button--danger {
  background: linear-gradient(
    90deg,
    rgba(245, 69, 69, 1),
    rgba(245, 119, 69, 1)
  );
  /*box-shadow:0px 0px 4px 0px rgba(245,95,69,1);*/
}
.van-goods-action-icon__icon {
  margin: 0 auto;
}
</style>
