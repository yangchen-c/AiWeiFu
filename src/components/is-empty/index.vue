<template>
	<div class="is_empty">
		<div class="shop-car-img">
			<img src="../../assets/images/shop_car.png" alt="无商品">
		</div>
		<div class="slot-txt">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
  name: 'is-empty'
};
</script>


<style lang="scss" scoped>
.is_empty {
  text-align: center;
  color: $font-color-gray;
  padding-top: 60px;
  .shop-car-img {
    // margin-bottom: 40px;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background-color: #fff;
    vertical-align: middle;
    display: table-cell;
    text-align: center;
    img {
      width: 140px;
      height: 110px;
    }
  }
  .slot-txt {
    margin-top: 30px;
  }

}
</style>
