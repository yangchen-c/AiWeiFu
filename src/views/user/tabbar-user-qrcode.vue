<template>
  <div class="qrcode-container">
    <div class="wx-info">
      <div class="wx-title">
        <img class="wx-avatar" :src="qrCodeInfo.avatar" />
        <span class="wx-username">
          {{ qrCodeInfo.nickName }}
        </span>
      </div>
      <img
        class="wx-qrcode"
        :src="qrCodeInfo.qrcode"
        @click="showQrCodeImg(qrCodeInfo.qrcode)"
      />
    </div>
  </div>
</template>
<script>
import { qrCodeInfo } from '@/api/api';

export default {
  data() {
    return {
      qrCodeInfo: {}
    };
  },
  created() {
    this.getQrCodeInfo();
  },
  methods: {
    getQrCodeInfo() {
      const id = localStorage.getItem('userid');
      const params = {
        id
      };
      qrCodeInfo(params).then(
        res => {
          this.qrCodeInfo = res.data.data;
        },
        () => {
          this.$toast('二维码信息获取失败');
        }
      );
    },
    showQrCodeImg(value) {
      window.location.href = value;
    }
  }
};
</script>

<style scoped>
.qrcode-container {
  /*width: 100%;*/
  /*height: 100%;*/
  background: url('../../assets/images/qrcode_bg.png') center no-repeat;
  background-size: cover;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 0;
  padding: 0;
}
.wx-info {
  width: 250px;
  height: 250px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(245, 213, 64, 1);
  border-radius: 10px;
  padding: 20px 0;
  text-align: center;
  position: fixed;
  bottom: 10px;
  left: 0;
  right: 0;
  margin: 0 auto;
  box-sizing: border-box;
}
.wx-title {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-family: PingFang;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  margin-left: -10px;
  /*text-align: center;*/
}
.wx-avatar {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  /*vertical-align: middle;*/
}
.wx-username {
  margin-left: 10px;
}
.wx-qrcode {
  width: 145px;
  height: 145px;
  margin-top: 15px;
}
</style>
