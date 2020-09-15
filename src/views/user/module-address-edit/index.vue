<template>
  <div>
    <van-nav-bar title="收货地址" left-arrow @click-left="goback"/>
    <van-address-edit
      style="background-color: #fff;"
      :areaList="areaList"
      :addressInfo="addressInfo"
      show-set-default
      show-delete
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import { AddressEdit, NavBar } from 'vant';
import areaList from './area.json';
import { addressDetail, addressUpdate, addressAdd, addressDelete } from '@/api/api';
import { removeLocalStorage } from '@/utils/local-storage';

export default {
  name: 'address-edit',

  data() {
    return {
      areaList,
      addressId: 0,
      addressInfo: {}
    };
  },
  created() {
    this.addressId = this.$route.query.addressId;
    if (this.addressId !== -1 && this.addressId !== 0) {
      this.init();
    }
  },

  methods: {
    init() {
      addressDetail({id: this.addressId}).then(res => {
        const result = res.data.data;
        this.addressInfo = {
          id: result.id,
          name: result.name,
          tel: result.phone,
          province: result.province,
          city: result.city,
          county: result.county,
          addressDetail: result.site,
          areaCode: result.siteNum,
          isDefault: result.def === 1 ? true : false
        };
      });
    },
    onSave(content) {
      // console.log(content);
      const data = {
        name: content.name,
        phone: content.tel,
        def: content.isDefault ? 1 : 0,
        province: content.province,
        city: content.city,
        county: content.county,
        site: content.addressDetail,
        siteNum: content.areaCode,
        remark: ''
      };
      if (this.addressId === -1) {
        delete data.id;
        data.userId = localStorage.getItem('userid');
        addressAdd(data).then(res => {
          this.$toast('收货地址添加成功');
          this.$router.go(-1);
        })
      } else {
        delete data.userId;
        data.id = content.id;
        addressUpdate(data).then(res => {
          // console.log(res);
          this.$toast('收货地址修改成功');
          this.$router.go(-1);
        });
      }      
    },
    onDelete(content) {
      addressDelete({ ids: content.id });
      removeLocalStorage('AddressId');
      this.$router.go(-1);
    },
    goback() {
      this.$router.go(-1);
    }
  },

  components: {
    [NavBar.name]: NavBar,
    [AddressEdit.name]: AddressEdit
  }
};
</script>
<style>
.van-switch--on {
  background-color: #f18ba2;
  border-color: f18ba2;
}
</style>