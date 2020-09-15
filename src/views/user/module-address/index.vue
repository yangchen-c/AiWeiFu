<template>
  <div>
    <van-nav-bar
      title="地址管理"
      left-text=""
      left-arrow
      @click-left="goback"
    />
    <van-address-list
      v-model="chosenAddressId"
      add-button-text="新增收货地址"
      :list="addressList"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
    />
  </div>
</template>

<script>
import { addressList } from '@/api/api';
import { AddressList, NavBar } from 'vant';
import { setLocalStorage } from '@/utils/local-storage';

export default {
  props: {
    isLink: [Boolean, String]
  },
  data() {
    return {
      chosenAddressId: -1,
      addressList: []
    };
  },

  created() {
    this.loadAddress();
    console.log(typeof this.isLink);
  },
  methods: {
    onAdd() {
      this.$router.push({ name: 'address-edit', query: { addressId: -1 } });
    },
    onEdit(item) {
      this.$router.push({
        name: 'address-edit',
        query: { addressId: item.id }
      });
    },
    onSelect(item) {
      if (this.isLink === 'true') {
        const addressStr = JSON.stringify(item);
        setLocalStorage({ address: addressStr });
        this.$router.go(-1);
      }
    },
    goback() {
      this.$router.go(-1);
    },
    loadAddress() {
      const userId = localStorage.getItem('userid');
      const params = {
        userId
      };
      addressList(params).then(
        res => {
          var list = res.data.data;
          for (var i = 0; i < list.length; i++) {
            var item = list[i];
            this.addressList.push({
              id: item.id,
              name: item.name,
              tel: item.phone,
              address:
                item.province + item.city + item.county + ' ' + item.site,
              isDefault: item.def === 1 ? true : false
            });
            if (item.def === 1) {
              this.chosenAddressId = item.id;
            }
          }
        },
        () => {
          this.$toast('暂无收货地址');
        }
      );
    }
  },

  components: {
    [NavBar.name]: NavBar,
    [AddressList.name]: AddressList
  }
};
</script>

<style lang="scss" scoped>
.addressGroup {
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
}

.bottom_btn {
  position: fixed;
  bottom: 0;
}
</style>
<style>
.van-address-item .van-radio__icon--checked .van-icon,
.van-button--danger {
  background-color: #f18ba2;
  border-color: #f18ba2;
}
.van-address-item:not(:last-child) {
  border-bottom: 0.5px solid #e1e1e1;
}
.van-icon-edit::before {
  content: '\F04B';
}
.no-data {
  text-align: center;
  font-size: 14px;
  color: #333;
}
</style>
