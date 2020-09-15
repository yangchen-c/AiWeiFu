<!-- 组件说明=>客服中心 -->
<template>
  <div id="core">
    <div class="content_box">
      <div class="content">
        <!-- 售前在线 -->
        <div class="PreSale_inquiry">
          <img class="PreSale_inquiry_img" src="@/assets/core/WeChat.png" alt="" />
          <p class="PreSale_inquiry_p" @click="onClickIconBefore">
            <span class="PreSale_inquiry_title">售前在线咨询</span>
            <img class="arrow" src="@/assets/core/arrow.png" alt="" />
          </p>
        </div>

        <!-- 售后在线 -->
        <div class="PreSale_inquiry">
          <img class="PreSale_inquiry_img" src="@/assets/core/WeChat1.png" alt="" />
          <p class="PreSale_inquiry_p" @click="onClickIconAfter">
            <span class="PreSale_inquiry_title">售后在线服务</span>
            <img class="arrow" src="@/assets/core/arrow.png" alt="" />
          </p>
        </div>

        <!-- 售前电话 -->
        <div class="PreSale_inquiry">
          <img class="PreSale_inquiry_img" src="@/assets/core/phone.png" alt="" />
          <p class="PreSale_inquiry_p">
            <span class="PreSale_inquiry_title">售前热线</span>
            <a class="click_inquiry" :href="'tel:' + PreSale">{{PreSale}}<img class="arrow" src="@/assets/core/arrow.png" alt="" /></a>
          </p>
        </div>

        <!-- 售后电话 -->
        <div class="PreSale_inquiry">
          <img class="PreSale_inquiry_img" src="@/assets/core/phone1.png" alt="" />
          <div class="PreSale_inquiry-text">
            <div class="after-sale-p">
              <span class="PreSale_inquiry_title">售后热线</span>
              <a class="click_inquiry" :href="'tel:' + AfterSale">{{AfterSale}}</a>
            </div>
            <div>
              <marquee style="color: #ccc; font-size: 14px;">
                <p class="click_inquiry">
                  尊敬的用户您好！平台咨询时间：8：30—18：00。祝您好孕。非咨询时间请您选择在线咨询留言，上班后会及时回复您！
                </p>
              </marquee>
            </div>
          </div>
          <img class="arrow" src="@/assets/core/arrow.png" alt="" />
        </div>

        <!-- 我的足迹 -->
        <div class="PreSale_inquiry">
          <img class="PreSale_inquiry_img" src="@/assets/core/zuji.png" alt="" />
          <p class="PreSale_inquiry_p" @click="goCar">
            <span class="PreSale_inquiry_title">我的足迹</span>
            <img class="arrow" src="@/assets/core/arrow.png" alt="" />
          </p>
        </div>

        <!-- 我的快递 -->
        <div class="PreSale_inquiry">
          <img class="PreSale_inquiry_img" src="@/assets/core/kuaidi.png" alt="" />
          <p class="PreSale_inquiry_p" @click="goUser">
            <span class="PreSale_inquiry_title">快递查询</span>
            <img class="arrow" src="@/assets/core/arrow.png" alt="" />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import meiqia from '@/utils/meiqia';

export default {
  name: 'Core',
  data() {
    return {
      PreSale: 15373116868, // 售前电话

      AfterSale: 17732131689 // 售后电话
    };
  },

  computed: {},

  methods: {
    onClickIconBefore() {
      // alert('before');
      window.location.href = 'https://chatlink.mstatik.com/widget/standalone.html?eid=248759&agentid=30b603afddf91efd3ef472cc21f5466f';
    },
    onClickIconAfter() {
      // alert('after');
      window.location.href = 'https://chatlink.mstatik.com/widget/standalone.html?eid=248759&agentid=d21edcf661f6b53c5033fab4b2fe9856';
    },
    goUser() {
      this.$router.push(`/user`);
    },
    goCar() {
      this.$router.push(`/order`);
    }
  },

  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style scoped>
p {
  margin: 0;
}
#core {
  height: 100%;
  background: #fff;
}

.PreSale_inquiry {
  width: 100%;
  height: 40px;
  padding: 0 15px;
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.PreSale_inquiry_img {
  width: 40px;
  height: 40px;
  vertical-align: middle;
}
.PreSale_inquiry-text {
  margin-left: 15px;
  margin-top: 10px;
  width: 100%;
  font-size: 15px;
  font-weight: 600;
  color: #333;
  /*font-family:PingFang SC;*/
}
.PreSale_inquiry-text a {
  font-weight: normal;
}
.after-sale-p {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.PreSale_inquiry_p {
  width: 100%;
  height: 40px;
  margin-left: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.PreSale_inquiry_p span {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  font-family: PingFang SC;
}
.PreSale_inquiry_p .click_inquiry,
.click_inquiry {
  color: #ccc;
  font-size: 14px;
}
.arrow {
  width: 8px;
  height: 15px;
  vertical-align: middle;
  margin-left: 13px;
}
</style>
