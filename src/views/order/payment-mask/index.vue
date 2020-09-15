<template>
    <div>
      <div class="J-weixin-tip weixin-tip" ref="myWeixinTip">
        <div class="weixin-tip-content tips-content" ref="myWeixinTipContent">
          <img src="../../../assets/images/browser.png" />
        </div>
      </div>
      <div class="J-weixin-tip-img weixin-tip-img"></div>
    </div>
</template>
<script>
  import _AP from '@/utils/ap';
    // ###说明：ap.js文件就是官网的js文件，自己找个文件夹放着，然后在alipay.vue页面中import
  export default {
    props: {
      goto: [String]
    },
    data() {
      return {

      }
    },
    mounted() {
      if (location.hash.indexOf('error') != -1) {
        alert('参数错误，请检查');
      } else {
        var ua = navigator.userAgent.toLowerCase();

        let tip = this.$refs.myWeixinTip;

        let tipImg = this.$refs.myWeixinTipContent;

        if (ua.indexOf('micromessenger') != -1) {

          tip.style.display = 'block';
          tipImg.style.display = 'block';

          if (ua.indexOf('iphone') != -1 || ua.indexOf('ipad') != -1 || ua.indexOf('ipod') != -1) {
            tipImg.className = 'J-weixin-tip-img weixin-tip-img iphone';
          } else {
            tipImg.className = 'J-weixin-tip-img weixin-tip-img android';
          }
        } else {

          var getQueryString = function (url, name) {
            var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
            if (reg.test(url)) return RegExp.$2.replace(/\+/g, " ");
          };
          var param = getQueryString(location.href, 'goto') || '';
          location.href = param != '' ? _AP.decode(param) : 'pay.htm#error';

        }
      }
    },
  }
</script>
<style scoped>
.weixin-tip {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  /*display: none;*/
  z-index: 20000;
}
.weixin-tip-img img {
  width: 70%;
  position: fixed;
  right: 30px;
  top: 5px;
  z-index: 20001;
  color: #fff;
}
</style>
