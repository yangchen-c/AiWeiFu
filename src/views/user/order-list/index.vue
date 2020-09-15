<template>
  <div class="order_list">
    <van-tabs v-model="activeIndex"
              :swipe-threshold="5"
              title-active-color="#F1532D"
              @click="handleTabClick">
      <van-tab v-for="(tabTitle, index) in tabTitles"
               :title="tabTitle"
               :key="index">
        <van-list v-model="loading"
                  :finished="finished"
                  :immediate-check="false"
                  finished-text="没有更多了"
                  @load="getOrderList">
          <van-panel v-for="(el, i) in orderList"
                     :key="i"
                     :title="'订单编号: ' + el.orderid"
                     :status="String(el.status) | orderStatusFilter">
            <van-card v-for="(goods, goodsI) in el.orderDetails"
                      :key="goodsI"
                      :title="goods.product.name"
                      :num="goods.num"
                      :price="goods.product.price + '.00'"
                      :thumb="goods.product.cover">
            </van-card>
            <div class="total">共计{{ el.orderDetails.length }}件商品 合计: <span class="total-price">￥{{ el.price }}</span>（含运费￥0.00）</div>

            <div slot="footer"
                 class="footer_btn">
              <van-button size="small"
                          v-if="el.status==0"
                          type="danger"
                          @click.stop="toPay(el.orderid)">去支付</van-button>
              <van-button size="small"
                          v-if="el.status==2"
                          type="danger"
                          @click.stop="confirmOrder(el.orderid)">确认收货</van-button>
              <van-button size="small"
                          v-if="(el.status==0) || (el.status==3)"
                          @click.stop="delOrder(el.orderid)">删除订单</van-button>
              <van-button size="small"
                          v-if="el.status==3"
                          type="danger"
                          @click.stop="againOrder(el.orderid)">再来一单</van-button>
            </div>

          </van-panel>

        </van-list>

      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { orderList, orderDelete, confirmReceipt, orderAgain } from '@/api/api';
import { Tab, Tabs, Panel, Card, List, Tag } from 'vant';

export default {
  name: 'order-list',

  props: {
    active: {
      type: [String, Number],
      default: 0
    }
  },
  filters: {
    orderStatusFilter(status) {
      const statusMap = {
        '0': '',
        '1': '',
        '2': '',
        '3': '交易完成'
      };
      return statusMap[status];
    }
  },
  created() {
    this.init();
  },
  data() {
    return {
      activeIndex: Number(this.active),
      tabTitles: ['全部', '待付款', '待发货', '待收货', '已完成'],
      orderList: [],
      page: 0,
      limit: 10,
      loading: false,
      finished: false
    };
  },

  methods: {
    init() {
      this.page = 0;
      this.orderList = [];
      this.getOrderList();
    },
    getOrderList() {
      this.loading = true;
      this.finished = false;
      this.page++;
      const userId = Number(localStorage.getItem('userid'));
      let activeIndex = '';
      if (this.activeIndex === 0) {
        activeIndex = '';
      } else {
        activeIndex = this.activeIndex - 1;
      }
      const params = {
        userId,
        status: activeIndex,
        page: this.page,
        size: this.limit
      }
      orderList(params).then(res => {
        this.orderList.push(...res.data.data.content);
        for (var i = this.orderList.length - 1; i >= 0; i--) {
          this.orderList[i].price = this.orderList[i].price.toFixed(2);
        }
        this.finished = res.data.data.last;
        this.loading = false;
      });
    },
    delOrder (id) {
      this.$dialog
        .confirm({ message: '确定要删除该订单吗?' })
        .then(() => {
          orderDelete({ orderid: id }).then(() => {
            this.init();
            this.$toast('已删除订单');
          });
        })
        .catch(() => {});
    },
    againOrder (id) {
      orderAgain({ orderid: id }).then(res => {
        if (res.data.code === 0) {
          this.$router.push({ path: '/order/checkout/' + id })
        }
      })
      .catch(() => {
        this.$toast('生成订单失败，请稍后重试');
      })
    },
    confirmOrder(id) {
      this.$dialog
        .confirm({
          message: '请确认收到货物, 确认收货后无法撤销!'
        })
        .then(() => {
          confirmReceipt({ orderid: id }).then(() => {
            this.init();
            this.$toast('已确认收货');
          });
        })
        .catch(() => {});
    },
    toPay(id) {
      this.$router.push({ path: '/order/checkout/' + id });
    },
    handleTabClick() {
      this.$router.push({path: '/user/order/list/' + this.activeIndex});
      this.page = 0;
      this.orderList = [];
      this.getOrderList();
    }
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Panel.name]: Panel,
    [Card.name]: Card,
    [List.name]: List,
    [Tag.name]: Tag
  }
};
</script>

<style lang="scss" scoped>
.order_list {
  .van-panel {
    margin-top: 20px;
  }

  .van-card {
    background-color: #fff;
  }

  .total {
    text-align: right;
    padding: 10px;
    font-size:12px;
    font-family:SourceHanSansSC;
    font-weight:400;
    color:rgba(155,155,155,1);
    .total-price {
      font-size: 16px;
      color: #000;
    }
  }

  .footer_btn {
    text-align: right;
    .van-button {
      margin-left: 10px;
    }
  }
}
</style>
<style>
.van-tabs__line {
  background-color: #f1532d;
}
.van-cell__title{
  font-size:12px;
  font-family:SourceHanSansSC;
  font-weight:400;
  color:rgba(159,159,159,1);
  white-space: nowrap;
}
.van-panel__header-value {
  width: 100px;
  color: #f1532d;
}
.van-card__price {
  color: #f1532d;
}
.footer_btn .van-button {
  border: 0.5px solid #e1e1e1;
}
.footer_btn .van-button.van-button--danger {
  border: none;
  background: #f1532d;
}
</style>
