<template>
  <div>
    <div v-if="this.dataList == ''" class="text">暂无物流信息</div>
    <van-steps
      direction="vertical"
      :active="active"
      v-for="(item, i) in dataList"
      :key="i"
    >
      <van-step>
        <h3>订单号</h3>
        <p>{{ item.mailNo }}</p>
      </van-step>
      <van-step>
        <h3>{{ item.routes[0].acceptAddress }}</h3>
        <p>{{ item.routes[0].remark }}</p>
        <p>{{ item.routes[0].acceptTime }}</p>
      </van-step>
      <van-step>
        <h3>{{ item.routes[1].acceptAddress }}</h3>
        <p>{{ item.routes[1].remark }}</p>
        <p>{{ item.routes[1].acceptTime }}</p>
      </van-step>
      <!-- <van-step>
        <h3>快件已发货</h3>
        <p>2016-07-10 09:30</p>
      </van-step>-->
    </van-steps>
  </div>
</template>

<script>
import { chaDingDan } from '@/api/api';
export default {
  data() {
    return {
      active: 2,
      dataList: []
      // dataList: [
      //   {
      //     mailNo: 'SF1011603494291',
      //     routes: [
      //       {
      //         acceptTime: '2019-05-09 10:11:26',
      //         acceptAddress: '深圳',
      //         opcode: '50',
      //         remark: '已派件'
      //       },
      //       {
      //         acceptTime: '2019-05-09 18:11:26',
      //         acceptAddress: '深圳',
      //         opcode: '80',
      //         remark: '已签收'
      //       }
      //     ]
      //   }
      // ]
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let params = {
        orderId: this.$route.query.id
        // orderId: '1017'
      };
      chaDingDan(params)
        .then(res => {
          // console.log(res);
          this.dataList = res.data.routeResps;
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.text {
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
