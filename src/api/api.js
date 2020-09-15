import request from '@/utils/request';

// 首页数据接口
export function bannerList() {
  return request({
    url: 'banner',
    method: 'get'
  });
}

export function channelList() {
  return request({
    url: 'show_index_product_type',
    method: 'get'
  });
}

export function hotProductList() {
  return request({
    url: 'get_combination',
    method: 'get'
  });
}

export function categoryList() {
  return request({
    url: 'get_product_type_one',
    method: 'get'
  });
}

export function secondCategoryList(params) {
  return request({
    url: 'get_product_type_two',
    method: 'get',
    params
  });
}

// 分类列表
export function productListByType(params) {
  return request({
    url: 'get_product_type_id',
    method: 'get',
    params
  });
}

// 商品详情
export function productDetail(params) {
  return request({
    url: 'get_product_by_id',
    method: 'get',
    params
  });
}

export function orderList(params) {
  return request({
    url: 'orders',
    method: 'get',
    params
  });
}

export function addressList(params) {
  return request({
    url: 'site',
    method: 'get',
    params
  });
}

export function addressAdd(data) {
  return request({
    url: 'site',
    method: 'post',
    data
  });
}

export function addressDelete(params) {
  return request({
    url: 'site',
    method: 'delete',
    params
  });
}

export function addressUpdate(data) {
  return request({
    url: 'site/' + data.id,
    method: 'put',
    data
  });
}

export function addressDetail(params) {
  return request({
    url: 'get_site_by_id',
    method: 'get',
    params
  });
}

export function qrCodeInfo(params) {
  return request({
    url: 'find_user_by_id',
    method: 'get',
    params
  });
}

// 购物车
export function carList(params) {
  return request({
    url: 'buy_car',
    method: 'get',
    params
  });
}

export function carDelete(params) {
  return request({
    url: 'buy_car',
    method: 'delete',
    params
  });
}

export function carNumAdd(data) {
  return request({
    url: 'add_num',
    method: 'put',
    data
  });
}

export function carNumSub(data) {
  return request({
    url: 'subtract_num',
    method: 'put',
    data
  });
}

export function carSelected(data) {
  return request({
    url: 'select_cart',
    method: 'put',
    data
  });
}

export function carSelectedAll(data) {
  return request({
    url: 'select_all_cart',
    method: 'put',
    data
  });
}

// 加入购物车
export function carAdd(data) {
  return request({
    url: 'buy_car',
    method: 'post',
    data
  });
}

// 去支付
export function orderAdd(params) {
  return request({
    url: 'add_order',
    method: 'post',
    params
  });
}

// 下订单
export function orderAddByCar(data) {
  return request({
    url: 'add_order_by_buy_car',
    method: 'post',
    data
  });
}

// 订单详情
export function orderDetail(params) {
  return request({
    url: 'get_order_by_orderid',
    method: 'get',
    params
  });
}

// 订单备注
export function orderRemark(data) {
  return request({
    url: 'update_remark/' + data.orderid,
    method: 'put',
    data
  });
}

// 去支付
export function orderToPay(params) {
  return request({
    url: 'pay',
    method: 'post',
    params
  });
}

// 再来一单
export function orderAgain(params) {
  return request({
    url: 'another_list',
    method: 'get',
    params
  });
}

// 搜索
export function productSearch(params) {
  return request({
    url: 'get_product_like_name',
    method: 'get',
    params
  });
}

// 我的团队
export function myteamList(params) {
  return request({
    url: 'my_team_two',
    method: 'get',
    params
  });
}

// 个人中心用户信息
export function userInfo(params) {
  return request({
    url: 'find_user_by_id',
    method: 'get',
    params
  });
}

// 推荐商品
export function likeList(params) {
  return request({
    url: 'footmark',
    method: 'get',
    params
  });
}

// 删除订单
export function orderDelete(params) {
  return request({
    url: 'order',
    method: 'delete',
    params
  });
}

// 确认收货
export function confirmReceipt(params) {
  return request({
    url: 'confirm_receipt',
    method: 'put',
    params
  });
}

// 修改订单
export function orderUpdate(data) {
  return request({
    url: 'update_order',
    method: 'put',
    data
  });
}

// 修改支付方式
export function payWayChange(params) {
  return request({
    url: 'select_payType',
    method: 'put',
    params
  });
}

// 支付宝支付
export function aliPay(params) {
  return request({
    url: 'wap',
    method: 'post',
    params
  });
}

// 货到付到支付
export function cashPay(data) {
  return request({
    url: 'pay_success/' + data.orderid,
    method: 'put',
    data
  });
}

// 物流信息
export function chaDingDan(params) {
  return request({
    url: 'chaDingDan',
    method: 'get',
    params
  });
}
