<template>
  <div class="user_header">
    <!-- <van-icon name="set" class="user_set" @click="toSetting"/> -->
    <div class="user_avatar">
      <img :src="userInfo.avatar" width="60" height="60">
    </div>
    <div class="user-name">{{ userInfo.nickName }}</div>
    <div class="user-points">
      <!-- <p>{{ userInfo.integralPresent ? userInfo.integralPresent : 0 }}</p> -->
      <p>{{ this.$store.state.availablePoints }}</p>
      <p>当前积分余额</p>
    </div>
  </div>
</template>

<script>
import avatar_default from '@/assets/images/avatar_default.png';
// import bg_default from '@/assets/images/user_head_bg.png';
import { getLocalStorage } from '@/utils/local-storage';
import { userInfo } from '@/api/api';

export default {
  name: 'user-header',

  props: {
    isLogin: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      userInfo: {
        avatar: avatar_default,
        nickName: '昵称'
      },
      avatar: avatar_default
      // background_image: bg_default
    };
  },

  created () {
    this.getUserInfo();
  },

  methods: {
    getUserInfo() {
      const id = localStorage.getItem('userid');
      const params = {
        id
      };
      userInfo(params).then(
        res => {
          if (res.data.code === 0) {
            this.userInfo = res.data.data;
            const availablePoints = this.userInfo.integralPresent  ? this.userInfo.integralPresent : 0;
            this.$store.commit('setAvailablePoints', availablePoints);
          } else {
            this.$toast('用户信息获取失败');
          }
        },
        () => {
          this.$toast('用户信息获取失败');
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.user_header {
  height: 130px;
  font-size:22px;
  font-family:NotoSansHans;
  font-weight:400;
  color:rgba(17,17,17,1);
  padding: 30px 14px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background: #fff;
}

// .user_set {
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   font-size: 24px;
// }
.user_avatar {
  // margin-bottom: 10px;
  img {
    border: 0;
    border-radius: 50%;
  }
}
.user-name {  
  margin-left: 14px;
  width: 45%;
}
.user-points {
  font-size: 14px;
  text-align: center;
}
.user-points p {
  margin: 0;
  color: #333;
}
.user-points p+p {
  color: #999;
}
</style>
