<template>
  <div class="myteam-container">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ul class="myteam-list">
        <li class="myteam-item" v-for="(item, index) in list" :key="index">
          <div class="item-img"><img :src="item.avatar"></div>
          <div class="item-txt">
            <p>昵称：<span>{{ item.nickName }}</span></p>
            <!-- <p>手机号：<span>{{ item.phone }}</span></p> -->
          </div>
          <div class="item-link" @click="goMyteamSecond(item.id)">查看二级团队</div>
        </li>
      </ul>
    </van-list>
    <!-- <div class="no-data" v-else>您还没有自己的团队，赶紧去邀请好友哦~~</div> -->
  </div>
</template>
<script>
import { myteamList } from '@/api/api';
import { List } from 'vant';

export default {
  data () {
    return {
      list: [],
      page: 0,
      size: 10,
      // show: false,
      finished: false
    }
  },
  created () {
    this.page = 0;
    this.list = [];
    this.init();
  },
  methods: {
    init () {
      this.loading = true;
      this.finished = false;
      this.page++;
      const userId = localStorage.getItem('userid');
      const params = {
        page: this.page,
        size: this.size,
        userId,
        rank: 1
      };
      myteamList(params).then(
        res => {
          if (res.data.code === 0) {
            this.list = res.data.data.content;
          }
          this.finished = res.data.data.last;
          this.loading = false;
        },
        () => {
          this.$toast('我的团队信息获取失败');
        }
      )
    },
    goMyteamSecond () {
      this.$router.push({ path: '/user/myteamtwo' })
    },
    onLoad () {
      this.init();
    }
  },
  components: {
    [List.name]: List
  }
}
</script>
<style scoped>
.myteam-container {
  padding: 20px 15px;
}
.myteam-item {
  width: 100%;
  height: 90px;
  font-size:14px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(51,51,51,1);
}
.myteam-item .item-img {
  float: left;
}
.myteam-item .item-img img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.myteam-item .item-txt {
  float: left;
  margin-left: 10px;
  margin-top: 20px;
}
.myteam-item .item-txt p {
  margin: 0;
  line-height: 30px;
}

.myteam-item .item-link {
  float: right;
  color: #F28A9F;
  margin-top: 20px;
  font-size: 12px;
  border: 1px solid #F28A9F;
  padding: 6px 10px;
  border-radius: 8px;
}
.no-data {
  color: #aaa;
  text-align: center;
}
</style>