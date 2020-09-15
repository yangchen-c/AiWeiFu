<template>
  <div class="payment_status">
    <div class="status_top">
      <img class="status-img" src="../../../assets/images/pay_success.png" />
      <div class="status-txt">{{ statusText }}</div>
    </div>
    <div class="order-info">
      <div>
        <span>订单编号: </span>
        <span class="info-right">{{ orderInfo.orders.orderid }}</span>
      </div>
      <div>
        <span>实付金额: </span>
        <span class="pay-money info-right">{{ orderInfo.orders.payType === 3 ? '0' : orderInfo.payment }}元</span>
      </div>
      <div>
        <span>支付方式: </span>
        <span class="info-right">{{ orderInfo.orders.payType | payWayStatus }}</span>
      </div>
    </div>

    <div class="address-info">
      <div>
        <span>收货人: </span>
        <span class="info-right">{{ orderInfo.addres.name }}  {{ orderInfo.addres.phone }}</span>
      </div>
      <div>
        <span>收货人地址: </span>
        <span class="info-right">{{ orderInfo.addres.province + orderInfo.addres.city + orderInfo.addres.county + orderInfo.addres.site }}</span>
      </div>
    </div>

    <div class="buttons">
      <button @click="goIndex">返回首页</button>
      <button @click="again">再来一单</button>
    </div>
    <van-overlay :show="showOverlay" @click="showOverlay = false">
      <div class="wrapper" @click.stop>
        <div class="block">
          <p class="first">恭喜您获得</p>
          <p class="second">{{ orderInfo.orders.gainIntegral }}积分</p>
          <p class="third">积分已经发放到您的账户</p>
          <p class="third">积分可以用来购买积分商品</p>
          <p class="close-btn" @click="showOverlay = false"></p>
        </div>
      </div>
    </van-overlay>
    
  </div>
</template>

<script>
import { orderAgain, orderDetail, userInfo } from '@/api/api';
import { Overlay, Toast } from 'vant';

export default {
  name: 'payment-status',
  filters: {
    payWayStatus(status) {
      const statusMap = {
        1: '微信支付',
        2: '支付宝支付',
        3: '货到付款'
      };
      return statusMap[status];
    }
  },
  props: {
    status: String,
    orderid: String,
    userid: String
  },
  data() {
    return {
      isSuccess: true,
      orderInfo: {
        addres: {},
        orders: {}
      },
      showOverlay: false
    };
  },
  created() {
    // alert(window.location.href);
    this.init();
  },
  methods: {
    init() {
      Toast.loading({
        message: '支付成功',
        forbidClick: true,
        duration: 1000
      });
      const params = {
        orderid: this.orderid
      };
      orderDetail(params).then(res => {
        this.orderInfo = res.data.data;
        const paramsObj = {
          id: this.userid
        };
        userInfo(paramsObj).then(
          res1 => {
            if (res1.data.code === 0) {
              const userInfo = res1.data.data;
              const personPoints = userInfo.integralPresent ? userInfo.integralPresent : 0;
              this.$store.commit('setAvailablePoints', personPoints);
            } else {
              this.$toast('用户信息获取失败');
            }
          },
          () => {
            this.$toast('用户信息获取失败');
          }
        );
        // const availablePoints = Number(this.orderInfo.orders.gainIntegral) + Number(this.$store.state.availablePoints);
        // this.$store.commit('setAvailablePoints', availablePoints);
        // this.loadingOrderInfo = false;
        this.showOverlay = true;
      });
    },
    goIndex() {
      this.$router.push({ path: '/home' });
    },
    again() {
      const params = {
        orderid: this.orderid
      };
      orderAgain(params).then(res => {
        if (res.data.code === 0) {
          this.$router.push('/order/checkout/' + this.orderid);
        }
      });
    }
  },

  computed: {
    statusText() {
      return this.isSuccess ? '支付成功' : '支付失败';
    },
    statusIcon() {
      return this.isSuccess ? 'checked' : 'fail';
    },
    statusClass() {
      return this.isSuccess ? 'success_icon' : 'fail_icon';
    }
  },

  activated() {
    this.isSuccess = this.status === 'success';
  },
  components: {
    [Overlay.name]: Overlay,
    [Toast.name]: Toast
  }
};
</script>

<style lang="scss" scopd>
.payment_status {
  padding-top: 30px;
  box-sizing: border-box;
  background-color: #fff;
  text-align: center;
  width: 100%;
  position: relative;
}
.status_top {
  margin-bottom: 15px;
  i {
    margin-bottom: 5px;
  }
  > div {
    font-size: 18px;
  }
}
.status_text {
  color: $font-color-gray;
  margin-bottom: 50px;
}
.status_icon {
  font-size: 80px;
}
i.success_icon {
  @extend .status_icon;
  color: #06bf04;
}
i.fail_icon {
  @extend .status_icon;
  color: #f44;
}
.status-img {
  width: 120px;
  height: 116px;
}
.status-txt {
  font-size: 20px;
  color: #f28a9f;
  font-weight: 600;
  margin-left: -38px;
  margin-top: 15px;
}
.order-info,
.address-info {
  text-align: left;
  font-size: 14px;
  color: #333;
  padding: 20px 20px;
}
.order-info > div,
.address-info > div {
  height: 30px;
  line-height: 30px;
}
.order-info .pay-money {
  color: #f54545;
}
.order-info {
  // margin-bottom: 30px;
  border-bottom: 1px solid #e6e6e6;
}
.order-info .info-right,
.address-info .info-right {
  margin-left: 15px;
}
.buttons {
  margin-top: 40px;
  text-align: center;
}
.buttons button {
  width: 90%;
  height: 45px;
  text-align: center;
  line-height: 42px;
  outline: none;
  border: 1px solid #999;
  border-radius: 25px;
  font-size: 16px;
  color: rgba(153, 153, 153, 1);
  background: #fff;
}
.buttons button + button {
  border: none;
  background: #f28a9f;
  color: #fff;
  margin-top: 10px;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}
.block {
  width: 70%;
  height: 250px;
  background: url('../../../assets/images/points_modal.png') left top no-repeat;
  background-size: 100%;
  position: relative;
  padding-top: 140px;
  border-radius: 10px;
  box-sizing: border-box;
}
.block p {
  margin: 5px 0 0;
}
.block p.first,
.block p.second {
  font-size: 15px;
  font-family: Microsoft YaHei;
  color: rgba(248, 125, 150, 1);
}
.block p.second {
  font-size: 17px;
  margin-bottom: 8px;
}
.block p.third {
  font-size: 12px;
  font-family: Microsoft YaHei;
  color: rgba(102, 102, 102, 1);
  margin: 0;
}
.block p.close-btn {
  position: absolute;
  bottom: -50px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 30px;
  height: 30px;
  background: url('../../../assets/images/close.png') center no-repeat;
  background-size: 100%;
}
</style>
