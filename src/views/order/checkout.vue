<template>
  <div class="order">
    <div class="buy-tips">等待买家进行支付</div>
    <div class="buy-content" v-if="!loadingOrderInfo">
      <div>
        <div
          v-if="!goods.addres"
          class="address-container"
          @click="goAddressList()"
          style="line-height: 36px;"
        >
          点击选择地址
        </div>
        <div
          v-if="goods.addres"
          class="address-container"
          @click="goAddressList()"
        >
          <div class="address-txt">
            <div class="addr-name-tel">
              <span class="addr-name">{{ goods.addres.name }}</span>
              <span class="addr-tel">{{ goods.addres.phone }}</span>
            </div>
            <div class="addr-desc">
              <div v-if="goods.addres.province">
                {{
                  goods.addres.province +
                    (goods.addres.province === goods.addres.city
                      ? ''
                      : goods.addres.city) +
                    goods.addres.county +
                    goods.addres.site
                }}
              </div>
              <div v-else>{{ goods.addres.address }}</div>
            </div>
          </div>
        </div>
      </div>

      <van-card
        v-for="item in goods.product"
        :key="item.id"
        :title="item.name"
        :num="item.num"
        :price="item.price + '.00'"
        :thumb="item.cover"
        style="border-bottom: 1px solid #e6e6e6; padding: 8px 16px;"
      ></van-card>

      <van-cell-group>
        <van-field
          v-model="message"
          placeholder="选填"
          label="备注信息"
          style="border-bottom: 1px solid #e6e6e6; margin-bottom: 20px;"
        ></van-field>
        <van-cell title="邮费" value="免邮"></van-cell>
        <van-cell
          class="total-price"
          title="总计"
          :value="'￥' + goods.payment"
        ></van-cell>

        <div v-if="hasPointsProduct">
          <div class="points-wrapper">
            <div class="use-points">
              使用积分数额
              <input type="number" v-model="usePoints" @input="blurPoints" />
            </div>
          </div>
          <div class="available-points">
            可用积分 {{ goods.user.integralPresent }}
          </div>
        </div>

        <!-- <div class="youfei">
          <span>邮费:</span>
          <span>免邮</span>
        </div>
        <div class="total-price">
          <span>总计:</span>
          <span class="red">￥{{ goods.payment }}</span>
        </div>-->
      </van-cell-group>

      <div class="pay_way_group">
        <div class="pay_way_title">选择支付方式</div>
        <van-radio-group v-model="payWay" @change="changePayWay">
          <van-cell-group>
            <van-cell>
              <template slot="title">
                <img src="../../assets/images/zhifubao.png" alt="支付宝" />
                <span>支付宝支付</span>
              </template>
              <van-radio
                style="margin-top: 5px;"
                name="ali"
                checked-color="#07c160"
              />
            </van-cell>
            <van-cell>
              <template slot="title">
                <img src="../../assets/images/weixin.png" alt="微信支付" />
                <span>微信支付</span>
              </template>
              <van-radio
                style="margin-top: 5px;"
                name="wx"
                checked-color="#07c160"
              />
            </van-cell>

            <van-cell>
              <template slot="title">
                <img src="../../assets/images/cash.png" alt="货到付款" />
                <span>货到付款</span>
              </template>
              <van-radio
                style="margin-top: 5px;"
                name="cash"
                checked-color="#07c160"
              />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
    </div>
    <van-loading
      v-if="loadingOrderInfo"
      vertical
      color="#f18ba2"
      style="text-align: center; margin-top: 100px;"
      >加载中...</van-loading
    >
    <van-button class="buy-btn" :disabled="isDisabled" @click="onSubmit">{{
      payWay === 'cash' ? '立即购买' : '立即支付'
    }}</van-button>
  </div>
</template>

<script>
import { Card, Field, Toast, Switch, Button } from 'vant';
import { Radio, RadioGroup, Loading } from 'vant';
import {
  orderDetail,
  orderRemark,
  orderToPay,
  orderUpdate,
  payWayChange,
  aliPay,
  cashPay
} from '@/api/api';
import { getLocalStorage, removeLocalStorage } from '@/utils/local-storage';
import _AP from '@/utils/ap';

export default {
  props: {
    orderId: [String, Number]
  },
  data() {
    return {
      message: '',
      isDisabled: false,
      goods: {
        orders: {}
      },
      checked: false,
      usePoints: 0,
      loadingOrderInfo: true,
      payWay: 'wx',
      hasPointsProduct: false,
      changePayWayFlag: true,
      promisePayWay: '',
      promiseRemark: '',
      promisePoints: ''
    };
  },
  created() {
    this.init();
  },

  methods: {
    changePayWay() {
      let payType = '';
      switch (this.payWay) {
        case 'wx':
          payType = 1;
          break;
        case 'ali':
          payType = 2;
          break;
        case 'cash':
          payType = 3;
          break;
      }
      // const payType = this.payWay === 'wx' ? 1 : 2;
      const data = {
        orderid: this.orderId,
        payType
      };
      this.promisePayWay = payWayChange(data).then(
        () => {
          this.changePayWayFlag = true;
        },
        () => {
          this.changePayWayFlag = false;
        }
      );
    },
    blurPoints() {
      if (this.usePoints > this.goods.user.integralPresent) {
        Toast.fail('输入积分应小于可用积分');
        this.isDisabled = true;
      } else {
        this.isDisabled = false;
      }
    },
    onSubmit() {
      if (!this.goods.addres || this.goods.addres === null) {
        Toast.fail('请设置收货地址');
        return;
      }

      // 判断是否填写备注
      if (this.message) {
        const data = {
          orderid: this.orderId,
          remark: this.message
        };
        this.promiseRemark = orderRemark(data).then(
          res => {
            if (res.data.code === 0) {
              this.$toast({
                message: '备注信息已提交',
                duration: 2000
              });
            }
          },
          () => {
            this.$toast({
              message: '备注信息提交失败',
              duration: 2000
            });
            return;
          }
        );
      }

      // 判断是否填写积分
      if (this.usePoints && this.usePoints > 0) {
        const data = {
          orderid: this.orderId,
          expendIntegral: this.usePoints
        };
        this.promisePoints = orderUpdate(data).then(
          () => {
            this.$toast({
              message: '积分使用成功',
              duration: 2000
            });
          },
          () => {
            this.$toast({
              message: '积分使用失败',
              duration: 2000
            });
            return;
          }
        );
      }

      if (!this.changePayWayFlag) {
        this.$toast({
          message: '支付方式修改失败',
          duration: 2000
        });
        return;
      }

      // if (this.payWay === 'cash') {
      //   const that = this;
      //   that.$router.push({
      //     path:
      //       '/order/payment/success/' +
      //       that.orderId +
      //       '/' +
      //       localStorage.getItem('userid')
      //   });
      //   return;
      // }

      Promise.all([
        this.promiseRemark,
        this.promisePoints,
        this.promisePayWay
      ]).then(
        () => {
          if (this.payWay === 'wx') {
            const that = this;
            const params = {
              orderId: this.orderId
            };
            orderToPay(params).then(res => {
              if (res.data.code === 0) {
                WeixinJSBridge.invoke(
                  'getBrandWCPayRequest',
                  {
                    appId: res.data.data.appId,
                    // 公众号名称，由商户传入
                    timeStamp: res.data.data.timeStamp,
                    // 时间戳，自1970年以来的秒数
                    nonceStr: res.data.data.nonceStr,
                    // 随机串
                    package: res.data.data.package,
                    signType: res.data.data.signType,
                    // 微信签名方式：
                    paySign: res.data.data.paySign
                    // 微信签名
                  },
                  function(res) {
                    // 使用以下方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                    if (res.err_msg == 'get_brand_wcpay_request:ok') {
                      that.$router.push({
                        path:
                          '/order/payment/success/' +
                          that.orderId +
                          '/' +
                          localStorage.getItem('userid')
                      });
                    } else if (res.err_msg == 'get_brand_wcpay_request:fail') {
                      Toast.fail('支付失败！');
                    } else if (
                      res.err_msg == 'get_brand_wcpay_request:cancel'
                    ) {
                      Toast.fail('支付取消！');
                    } else {
                      Toast.fail('支付失败！');
                    }
                  }
                );
              } else {
                Toast.fail('请稍后重试...');
              }
            });
          } else if (this.payWay === 'ali') {
            // this.$router.push({ path: '/order/alipay/' + this.orderId });
            const params = {
              orderNo: this.orderId
            };
            aliPay(params)
              .then(res => {
                console.log('1111111', res.data.data.body);
                const div = document.createElement('div');
                div.innerHTML = res.data.data.body;
                document.body.appendChild(div);
                document.forms[0].acceptCharset = 'utf-8';
                var queryParam = '';
                Array.prototype.slice
                  .call(document.querySelectorAll('input[type=hidden]'))
                  .forEach(function(ele) {
                    queryParam +=
                      ele.name + '=' + encodeURIComponent(ele.value) + '&';
                  });
                let url = document.forms[0].action + '&' + queryParam;
                _AP.pay(url);
                // const div = document.createElement('div');
                // div.innerHTML = res.data.result;
                // console.log(div);
                // document.body.appendChild(div);
                // document.forms[0].submit();
              })
              .catch(err => {
                console.log('222', err);
                Toast.fail('支付失败！');
              });
            //   res => {
            //     const div = document.createElement('div');
            //     div.innerHTML = res.data.result;
            //     document.body.appendChild(div);
            //     document.forms[0].acceptCharset = 'utf-8';
            //     var queryParam = '';
            //     Array.prototype.slice
            //       .call(document.querySelectorAll('input[type=hidden]'))
            //       .forEach(function(ele) {
            //         queryParam +=
            //           ele.name + '=' + encodeURIComponent(ele.value) + '&';
            //       });
            //     let url = document.forms[0].action + '&' + queryParam;
            //     _AP.pay(url);
            //     // const div = document.createElement('div');
            //     // div.innerHTML = res.data.result;
            //     // console.log(div);
            //     // document.body.appendChild(div);
            //     // document.forms[0].submit();
            //   },
            //   () => {
            //     Toast.fail('支付失败！');
            //   }
            // );
          } else if (this.payWay === 'cash') {
            const data = {
              orderid: this.orderId,
              status: 1
            };
            cashPay(data).then(
              res => {
                this.$router.push({
                  path:
                    '/order/payment/success/' +
                    this.orderId +
                    '/' +
                    localStorage.getItem('userid')
                });
              },
              () => {
                this.$toast({
                  message: '下单失败',
                  duration: 2000
                });
              }
            );
          }
        },
        () => {
          this.$toast({
            message: '支付失败',
            duration: 2000
          });
        }
      );
    },
    goAddressList() {
      this.$router.push({
        path: '/user/address/' + true
      });
    },
    init() {
      this.loadingOrderInfo = true;
      const addressStr = getLocalStorage('address');
      const addressObj = JSON.parse(addressStr.address);
      removeLocalStorage('address');
      const params = {
        orderid: this.orderId
      };
      orderDetail(params).then(
        res => {
          if (res.data.code === 0) {
            this.goods = res.data.data;
            this.goods.payment = this.goods.payment.toFixed(2);
            this.message = this.goods.orders.remark;
            this.payWay = this.goods.orders.payType === 1 ? 'wx' : 'ali';
            if (addressObj !== null) {
              this.goods.addres = addressObj;
              const data = {
                addressId: this.goods.addres.id,
                orderid: this.orderId
              };
              orderUpdate(data).then(
                res => {
                  if (res.data.code !== 0) {
                    this.$toast({
                      message: '地址修改失败',
                      duration: 2000
                    });
                  }
                },
                () => {
                  this.$toast({
                    message: '地址修改失败',
                    duration: 2000
                  });
                }
              );
            }

            // this.hasPointsProduct
            const goodsProdcut = this.goods.product;
            for (let i = 0; i < goodsProdcut.length; i++) {
              if (goodsProdcut[i].whetherIntegral) {
                this.hasPointsProduct = true;
              }
            }
          }
          this.loadingOrderInfo = false;
        },
        () => {
          this.loadingOrderInfo = false;
        }
      );
    }
  },
  components: {
    [Toast.name]: Toast,
    [Card.name]: Card,
    [Switch.name]: Switch,
    [Button.name]: Button,
    [Field.name]: Field,
    [Radio.name]: Radio,
    [Loading.name]: Loading,
    [RadioGroup.name]: RadioGroup
  }
};
</script>

<style lang="scss" scoped>
.order {
  // background: url('../../assets/images/buy_bg.png') left top no-repeat;
  background-size: 100%;
  padding: 0 10px;
  background-position: left top;
  background-repeat: no-repeat;
  background-image: url('data:image/png;base64,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');
}
.buy-tips {
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  margin-top: 48px;
}
.buy-content {
  padding-top: 20px;
  background: #fff;
  border-radius: 10px 10px 0 0;
  margin-top: 40px;
}
.address-container {
  padding: 0 16px;
  height: 60px;
  border-bottom: 1px solid #e6e6e6;
}
.address-container:before {
  float: left;
  display: inline-block;
  content: '';
  width: 20px;
  height: 25px;
  background: url('../../assets/images/address.png') center no-repeat;
  background-size: 100%;
  margin-right: 10px;
  margin-top: 5px;
}
.address-txt {
  width: 85%;
  float: left;
}
.addr-name {
  font-size: 14px;
  color: #333;
  font-weight: 600;
  margin-right: 15px;
}
.addr-tel {
  font-size: 12px;
  color: #999;
}
.addr-desc {
  font-size: 12px;
  color: #333;
}

// .youfei,
// .total-price {
//   text-align: right;
// }
// .youfei span,
// .total-price span {
//   display: inline-block;
//   width: 100px;
//   height: 44px;
//   // text-align: center;
// }

.buy-btn {
  width: 100%;
  height: 45px;
  background: linear-gradient(
    90deg,
    rgba(242, 138, 159, 1),
    rgba(248, 125, 150, 1)
  );
  border-radius: 20px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  line-height: 45px;
  outline: none;
  border: none;
  margin-top: 60px;
  margin-bottom: 30px;
}
.points-wrapper {
  height: 40px;
  margin-top: 10px;
  padding: 0 10px;
}
.points-wrapper .switch-icon {
  float: left;
}
.points-wrapper .use-points {
  float: right;
  font-size: 14px;
  color: #333;
}
.points-wrapper .use-points input {
  border: none;
  border-bottom: 1px solid #999;
  width: 100px;
  text-align: center;
  color: #333;
}
.available-points {
  text-align: right;
  padding: 0 10px;
  font-size: 14px;
  color: #999;
}

.pay_way_group img {
  vertical-align: middle;
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.pay_way_title {
  padding: 15px;
  background-color: #fff;
}
</style>
<style>
.total-price .van-cell__value {
  color: #f28a9f;
  font-size: 16px;
  font-weight: 600;
}
</style>
