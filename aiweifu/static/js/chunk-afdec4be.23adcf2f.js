(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-afdec4be"],{"09fe":function(t,e,a){},"0a26":function(t,e,a){"use strict";a.d(e,"a",(function(){return s}));var i=a("ad06"),n=a("78eb"),r=a("9884"),o=a("ea8e"),s=function(t){var e=t.parent,a=t.bem,s=t.role;return{mixins:[Object(r["a"])(e),n["a"]],props:{name:null,value:null,disabled:Boolean,iconSize:[Number,String],checkedColor:String,labelPosition:String,labelDisabled:Boolean,shape:{type:String,default:"round"},bindGroup:{type:Boolean,default:!0}},computed:{disableBindRelation:function(){return!this.bindGroup},isDisabled:function(){return this.parent&&this.parent.disabled||this.disabled},direction:function(){return this.parent&&this.parent.direction||null},iconStyle:function(){var t=this.checkedColor||this.parent&&this.parent.checkedColor;if(t&&this.checked&&!this.isDisabled)return{borderColor:t,backgroundColor:t}},tabindex:function(){return this.isDisabled||"radio"===s&&!this.checked?-1:0}},methods:{onClick:function(t){var e=this,a=t.target,i=this.$refs.icon,n=i===a||i.contains(a);this.isDisabled||!n&&this.labelDisabled?this.$emit("click",t):(this.toggle(),setTimeout((function(){e.$emit("click",t)})))},genIcon:function(){var t=this.$createElement,e=this.checked,n=this.iconSize||this.parent&&this.parent.iconSize;return t("div",{ref:"icon",class:a("icon",[this.shape,{disabled:this.isDisabled,checked:e}]),style:{fontSize:Object(o["a"])(n)}},[this.slots("icon",{checked:e})||t(i["a"],{attrs:{name:"success"},style:this.iconStyle})])},genLabel:function(){var t=this.$createElement,e=this.slots();if(e)return t("span",{class:a("label",[this.labelPosition,{disabled:this.isDisabled}])},[e])}},render:function(){var t=arguments[0],e=[this.genIcon()];return"left"===this.labelPosition?e.unshift(this.genLabel()):e.push(this.genLabel()),t("div",{attrs:{role:s,tabindex:this.tabindex,"aria-checked":String(this.checked)},class:a([{disabled:this.isDisabled,"label-disabled":this.labelDisabled},this.direction]),on:{click:this.onClick}},[e])}}}},"1a23":function(t,e,a){"use strict";var i=a("d282"),n=a("ea8e"),r={size:[Number,String],value:null,loading:Boolean,disabled:Boolean,activeColor:String,inactiveColor:String,activeValue:{type:null,default:!0},inactiveValue:{type:null,default:!1}},o=a("78eb"),s=a("543e"),c=Object(i["a"])("switch"),d=c[0],l=c[1];e["a"]=d({mixins:[o["a"]],props:r,computed:{checked:function(){return this.value===this.activeValue},style:function(){return{fontSize:Object(n["a"])(this.size),backgroundColor:this.checked?this.activeColor:this.inactiveColor}}},methods:{onClick:function(t){if(this.$emit("click",t),!this.disabled&&!this.loading){var e=this.checked?this.inactiveValue:this.activeValue;this.$emit("input",e),this.$emit("change",e)}},genLoading:function(){var t=this.$createElement;if(this.loading){var e=this.checked?this.activeColor:this.inactiveColor;return t(s["a"],{class:l("loading"),attrs:{color:e}})}}},render:function(){var t=arguments[0],e=this.checked,a=this.loading,i=this.disabled;return t("div",{class:l({on:e,loading:a,disabled:i}),attrs:{role:"switch","aria-checked":String(e)},style:this.style,on:{click:this.onClick}},[t("div",{class:l("node")},[this.genLoading()])])}})},"1bf2":function(t,e,a){},"24eb":function(t,e,a){"use strict";a.r(e);var i,n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"order"},[i("div",{staticClass:"buy-tips"},[t._v("等待买家进行支付")]),t.loadingOrderInfo?t._e():i("div",{staticClass:"buy-content"},[i("div",[t.goods.addres?t._e():i("div",{staticClass:"address-container",staticStyle:{"line-height":"36px"},on:{click:function(e){return t.goAddressList()}}},[t._v("\n        点击选择地址\n      ")]),t.goods.addres?i("div",{staticClass:"address-container",on:{click:function(e){return t.goAddressList()}}},[i("div",{staticClass:"address-txt"},[i("div",{staticClass:"addr-name-tel"},[i("span",{staticClass:"addr-name"},[t._v(t._s(t.goods.addres.name))]),i("span",{staticClass:"addr-tel"},[t._v(t._s(t.goods.addres.phone))])]),i("div",{staticClass:"addr-desc"},[t.goods.addres.province?i("div",[t._v("\n              "+t._s(t.goods.addres.province+(t.goods.addres.province===t.goods.addres.city?"":t.goods.addres.city)+t.goods.addres.county+t.goods.addres.site)+"\n            ")]):i("div",[t._v(t._s(t.goods.addres.address))])])])]):t._e()]),t._l(t.goods.product,(function(t){return i("van-card",{key:t.id,staticStyle:{"border-bottom":"1px solid #e6e6e6",padding:"8px 16px"},attrs:{title:t.name,num:t.num,price:t.price+".00",thumb:t.cover}})})),i("van-cell-group",[i("van-field",{staticStyle:{"border-bottom":"1px solid #e6e6e6","margin-bottom":"20px"},attrs:{placeholder:"选填",label:"备注信息"},model:{value:t.message,callback:function(e){t.message=e},expression:"message"}}),i("van-cell",{attrs:{title:"邮费",value:"免邮"}}),i("van-cell",{staticClass:"total-price",attrs:{title:"总计",value:"￥"+t.goods.payment}}),t.hasPointsProduct?i("div",[i("div",{staticClass:"points-wrapper"},[i("div",{staticClass:"use-points"},[t._v("\n            使用积分数额\n            "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.usePoints,expression:"usePoints"}],attrs:{type:"number"},domProps:{value:t.usePoints},on:{input:[function(e){e.target.composing||(t.usePoints=e.target.value)},t.blurPoints]}})])]),i("div",{staticClass:"available-points"},[t._v("\n          可用积分 "+t._s(t.goods.user.integralPresent)+"\n        ")])]):t._e()],1),i("div",{staticClass:"pay_way_group"},[i("div",{staticClass:"pay_way_title"},[t._v("选择支付方式")]),i("van-radio-group",{on:{change:t.changePayWay},model:{value:t.payWay,callback:function(e){t.payWay=e},expression:"payWay"}},[i("van-cell-group",[i("van-cell",[i("template",{slot:"title"},[i("img",{attrs:{src:a("603c"),alt:"支付宝"}}),i("span",[t._v("支付宝支付")])]),i("van-radio",{staticStyle:{"margin-top":"5px"},attrs:{name:"ali","checked-color":"#07c160"}})],2),i("van-cell",[i("template",{slot:"title"},[i("img",{attrs:{src:a("3c34"),alt:"微信支付"}}),i("span",[t._v("微信支付")])]),i("van-radio",{staticStyle:{"margin-top":"5px"},attrs:{name:"wx","checked-color":"#07c160"}})],2),i("van-cell",[i("template",{slot:"title"},[i("img",{attrs:{src:a("f338"),alt:"货到付款"}}),i("span",[t._v("货到付款")])]),i("van-radio",{staticStyle:{"margin-top":"5px"},attrs:{name:"cash","checked-color":"#07c160"}})],2)],1)],1)],1)],2),t.loadingOrderInfo?i("van-loading",{staticStyle:{"text-align":"center","margin-top":"100px"},attrs:{vertical:"",color:"#f18ba2"}},[t._v("加载中...")]):t._e(),i("van-button",{staticClass:"buy-btn",attrs:{disabled:t.isDisabled},on:{click:t.onSubmit}},[t._v(t._s("cash"===t.payWay?"立即购买":"立即支付"))])],1)},r=[],o=a("ade3"),s=(a("68ef"),a("dc1b"),a("e27c")),c=(a("ac1e"),a("543e")),d=(a("9d70"),a("3743"),a("dde9"),a("9f14")),l=(a("1a04"),a("1146"),a("565f")),u=(a("66b9"),a("b650")),h=(a("e3b3"),a("d9d2"),a("1a23")),g=(a("9cb7"),a("66fd")),f=(a("7f7f"),a("ac6a"),a("5df3"),a("e7e5"),a("d399")),p=(a("c5f6"),a("4ec3")),v=a("3c96"),b=a("ffa2"),m={props:{orderId:[String,Number]},data:function(){return{message:"",isDisabled:!1,goods:{orders:{}},checked:!1,usePoints:0,loadingOrderInfo:!0,payWay:"wx",hasPointsProduct:!1,changePayWayFlag:!0,promisePayWay:"",promiseRemark:"",promisePoints:""}},created:function(){this.init()},methods:{changePayWay:function(){var t=this,e="";switch(this.payWay){case"wx":e=1;break;case"ali":e=2;break;case"cash":e=3;break}var a={orderid:this.orderId,payType:e};this.promisePayWay=Object(p["F"])(a).then((function(){t.changePayWayFlag=!0}),(function(){t.changePayWayFlag=!1}))},blurPoints:function(){this.usePoints>this.goods.user.integralPresent?(f["a"].fail("输入积分应小于可用积分"),this.isDisabled=!0):this.isDisabled=!1},onSubmit:function(){var t=this;if(this.goods.addres&&null!==this.goods.addres){if(this.message){var e={orderid:this.orderId,remark:this.message};this.promiseRemark=Object(p["C"])(e).then((function(e){0===e.data.code&&t.$toast({message:"备注信息已提交",duration:2e3})}),(function(){t.$toast({message:"备注信息提交失败",duration:2e3})}))}if(this.usePoints&&this.usePoints>0){var a={orderid:this.orderId,expendIntegral:this.usePoints};this.promisePoints=Object(p["E"])(a).then((function(){t.$toast({message:"积分使用成功",duration:2e3})}),(function(){t.$toast({message:"积分使用失败",duration:2e3})}))}this.changePayWayFlag?Promise.all([this.promiseRemark,this.promisePoints,this.promisePayWay]).then((function(){if("wx"===t.payWay){var e=t,a={orderId:t.orderId};Object(p["D"])(a).then((function(t){0===t.data.code?WeixinJSBridge.invoke("getBrandWCPayRequest",{appId:t.data.data.appId,timeStamp:t.data.data.timeStamp,nonceStr:t.data.data.nonceStr,package:t.data.data.package,signType:t.data.data.signType,paySign:t.data.data.paySign},(function(t){"get_brand_wcpay_request:ok"==t.err_msg?e.$router.push({path:"/order/payment/success/"+e.orderId+"/"+localStorage.getItem("userid")}):"get_brand_wcpay_request:fail"==t.err_msg?f["a"].fail("支付失败！"):"get_brand_wcpay_request:cancel"==t.err_msg?f["a"].fail("支付取消！"):f["a"].fail("支付失败！")})):f["a"].fail("请稍后重试...")}))}else if("ali"===t.payWay){var i={orderNo:t.orderId};Object(p["f"])(i).then((function(t){console.log("1111111",t.data.data.body);var e=document.createElement("div");e.innerHTML=t.data.data.body,document.body.appendChild(e),document.forms[0].acceptCharset="utf-8";var a="";Array.prototype.slice.call(document.querySelectorAll("input[type=hidden]")).forEach((function(t){a+=t.name+"="+encodeURIComponent(t.value)+"&"}));var i=document.forms[0].action+"&"+a;b["a"].pay(i)})).catch((function(t){console.log("222",t),f["a"].fail("支付失败！")}))}else if("cash"===t.payWay){var n={orderid:t.orderId,status:1};Object(p["o"])(n).then((function(e){t.$router.push({path:"/order/payment/success/"+t.orderId+"/"+localStorage.getItem("userid")})}),(function(){t.$toast({message:"下单失败",duration:2e3})}))}}),(function(){t.$toast({message:"支付失败",duration:2e3})})):this.$toast({message:"支付方式修改失败",duration:2e3})}else f["a"].fail("请设置收货地址")},goAddressList:function(){this.$router.push({path:"/user/address/"+!0})},init:function(){var t=this;this.loadingOrderInfo=!0;var e=Object(v["a"])("address"),a=JSON.parse(e.address);Object(v["b"])("address");var i={orderid:this.orderId};Object(p["A"])(i).then((function(e){if(0===e.data.code){if(t.goods=e.data.data,t.goods.payment=t.goods.payment.toFixed(2),t.message=t.goods.orders.remark,t.payWay=1===t.goods.orders.payType?"wx":"ali",null!==a){t.goods.addres=a;var i={addressId:t.goods.addres.id,orderid:t.orderId};Object(p["E"])(i).then((function(e){0!==e.data.code&&t.$toast({message:"地址修改失败",duration:2e3})}),(function(){t.$toast({message:"地址修改失败",duration:2e3})}))}for(var n=t.goods.product,r=0;r<n.length;r++)n[r].whetherIntegral&&(t.hasPointsProduct=!0)}t.loadingOrderInfo=!1}),(function(){t.loadingOrderInfo=!1}))}},components:(i={},Object(o["a"])(i,f["a"].name,f["a"]),Object(o["a"])(i,g["a"].name,g["a"]),Object(o["a"])(i,h["a"].name,h["a"]),Object(o["a"])(i,u["a"].name,u["a"]),Object(o["a"])(i,l["a"].name,l["a"]),Object(o["a"])(i,d["a"].name,d["a"]),Object(o["a"])(i,c["a"].name,c["a"]),Object(o["a"])(i,s["a"].name,s["a"]),i)},A=m,y=(a("4e7e"),a("2f06"),a("2877")),S=Object(y["a"])(A,n,r,!1,null,"91334202",null);e["default"]=S.exports},"2a49":function(t,e,a){},"2f06":function(t,e,a){"use strict";var i=a("2a49"),n=a.n(i);n.a},"3c34":function(t,e){t.exports="data:image/png;base64,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"},"44bf":function(t,e,a){"use strict";var i=a("2638"),n=a.n(i),r=a("d282"),o=a("a142"),s=a("ea8e"),c=a("ad06"),d=Object(r["a"])("image"),l=d[0],u=d[1];e["a"]=l({props:{src:String,fit:String,alt:String,round:Boolean,width:[Number,String],height:[Number,String],radius:[Number,String],lazyLoad:Boolean,showError:{type:Boolean,default:!0},showLoading:{type:Boolean,default:!0},errorIcon:{type:String,default:"photo-fail"},loadingIcon:{type:String,default:"photo"}},data:function(){return{loading:!0,error:!1}},watch:{src:function(){this.loading=!0,this.error=!1}},computed:{style:function(){var t={};return Object(o["c"])(this.width)&&(t.width=Object(s["a"])(this.width)),Object(o["c"])(this.height)&&(t.height=Object(s["a"])(this.height)),Object(o["c"])(this.radius)&&(t.overflow="hidden",t.borderRadius=Object(s["a"])(this.radius)),t}},created:function(){var t=this.$Lazyload;t&&o["b"]&&(t.$on("loaded",this.onLazyLoaded),t.$on("error",this.onLazyLoadError))},beforeDestroy:function(){var t=this.$Lazyload;t&&(t.$off("loaded",this.onLazyLoaded),t.$off("error",this.onLazyLoadError))},methods:{onLoad:function(t){this.loading=!1,this.$emit("load",t)},onLazyLoaded:function(t){var e=t.el;e===this.$refs.image&&this.loading&&this.onLoad()},onLazyLoadError:function(t){var e=t.el;e!==this.$refs.image||this.error||this.onError()},onError:function(t){this.error=!0,this.loading=!1,this.$emit("error",t)},onClick:function(t){this.$emit("click",t)},genPlaceholder:function(){var t=this.$createElement;return this.loading&&this.showLoading?t("div",{class:u("loading")},[this.slots("loading")||t(c["a"],{attrs:{name:this.loadingIcon},class:u("loading-icon")})]):this.error&&this.showError?t("div",{class:u("error")},[this.slots("error")||t(c["a"],{attrs:{name:this.errorIcon},class:u("error-icon")})]):void 0},genImage:function(){var t=this.$createElement,e={class:u("img"),attrs:{alt:this.alt},style:{objectFit:this.fit}};if(!this.error)return this.lazyLoad?t("img",n()([{ref:"image",directives:[{name:"lazy",value:this.src}]},e])):t("img",n()([{attrs:{src:this.src},on:{load:this.onLoad,error:this.onError}},e]))}},render:function(){var t=arguments[0];return t("div",{class:u({round:this.round}),style:this.style,on:{click:this.onClick}},[this.genImage(),this.genPlaceholder(),this.slots()])}})},"4e7e":function(t,e,a){"use strict";var i=a("1bf2"),n=a.n(i);n.a},"5df3":function(t,e,a){"use strict";var i=a("02f4")(!0);a("01f9")(String,"String",(function(t){this._t=String(t),this._i=0}),(function(){var t,e=this._t,a=this._i;return a>=e.length?{value:void 0,done:!0}:(t=i(e,a),this._i+=t.length,{value:t,done:!1})}))},"603c":function(t,e){t.exports="data:image/png;base64,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"},"66fd":function(t,e,a){"use strict";var i=a("2638"),n=a.n(i),r=a("d282"),o=a("a142"),s=a("ba31"),c=a("a3e2"),d=a("44bf"),l=Object(r["a"])("card"),u=l[0],h=l[1];function g(t,e,a,i){var r,l=e.thumb,u=a.num||Object(o["c"])(e.num),g=a.price||Object(o["c"])(e.price),f=a["origin-price"]||Object(o["c"])(e.originPrice),p=u||g||f||a.bottom;function v(t){Object(s["a"])(i,"click-thumb",t)}function b(){if(a.tag||e.tag)return t("div",{class:h("tag")},[a.tag?a.tag():t(c["a"],{attrs:{mark:!0,type:"danger"}},[e.tag])])}function m(){if(a.thumb||l)return t("a",{attrs:{href:e.thumbLink},class:h("thumb"),on:{click:v}},[a.thumb?a.thumb():t(d["a"],{attrs:{src:l,width:"100%",height:"100%",fit:"cover","lazy-load":e.lazyLoad}}),b()])}function A(){return a.title?a.title():e.title?t("div",{class:[h("title"),"van-multi-ellipsis--l2"]},[e.title]):void 0}function y(){return a.desc?a.desc():e.desc?t("div",{class:[h("desc"),"van-ellipsis"]},[e.desc]):void 0}function S(){var a=e.price.toString().split(".");return t("div",[t("span",{class:h("price-currency")},[e.currency]),t("span",{class:h("price-integer")},[a[0]]),".",t("span",{class:h("price-decimal")},[a[1]])])}function k(){if(g)return t("div",{class:h("price")},[a.price?a.price():S()])}function w(){if(f){var i=a["origin-price"];return t("div",{class:h("origin-price")},[i?i():e.currency+" "+e.originPrice])}}function E(){if(u)return t("div",{class:h("num")},[a.num?a.num():"x"+e.num])}function C(){if(a.footer)return t("div",{class:h("footer")},[a.footer()])}return t("div",n()([{class:h()},Object(s["b"])(i,!0)]),[t("div",{class:h("header")},[m(),t("div",{class:h("content",{centered:e.centered})},[t("div",[A(),y(),null==a.tags?void 0:a.tags()]),p&&t("div",{class:"van-card__bottom"},[null==(r=a["price-top"])?void 0:r.call(a),k(),w(),E(),null==a.bottom?void 0:a.bottom()])])]),C()])}g.props={tag:String,desc:String,thumb:String,title:String,centered:Boolean,lazyLoad:Boolean,thumbLink:String,num:[Number,String],price:[Number,String],originPrice:[Number,String],currency:{type:String,default:"¥"}},e["a"]=u(g)},"78eb":function(t,e,a){"use strict";a.d(e,"a",(function(){return i}));var i={inject:{vanField:{default:null}},watch:{value:function(){var t=this.vanField;t&&(t.resetValidation(),t.validateWithTrigger("onChange"))}},created:function(){var t=this.vanField;t&&!t.children&&(t.children=this)}}},"9b7e":function(t,e,a){},"9cb7":function(t,e,a){"use strict";a("68ef"),a("9d70"),a("3743"),a("09fe"),a("9b7e"),a("ea82")},"9f14":function(t,e,a){"use strict";var i=a("d282"),n=a("0a26"),r=Object(i["a"])("radio"),o=r[0],s=r[1];e["a"]=o({mixins:[Object(n["a"])({bem:s,role:"radio",parent:"vanRadio"})],computed:{currentValue:{get:function(){return this.parent?this.parent.value:this.value},set:function(t){(this.parent||this).$emit("input",t)}},checked:function(){return this.currentValue===this.name}},methods:{toggle:function(){this.currentValue=this.name}}})},a3e2:function(t,e,a){"use strict";var i=a("2638"),n=a.n(i),r=a("d282"),o=a("ba31"),s=a("ad06"),c=Object(r["a"])("tag"),d=c[0],l=c[1];function u(t,e,a,i){var r,c=e.type,d=e.mark,u=e.plain,h=e.color,g=e.round,f=e.size,p=u?"color":"backgroundColor",v=(r={},r[p]=h,r);e.textColor&&(v.color=e.textColor);var b={mark:d,plain:u,round:g};f&&(b[f]=f);var m=e.closeable&&t(s["a"],{attrs:{name:"cross"},class:l("close"),on:{click:function(t){t.stopPropagation(),Object(o["a"])(i,"close")}}});return t("transition",{attrs:{name:e.closeable?"van-fade":null}},[t("span",n()([{key:"content",style:v,class:l([b,c])},Object(o["b"])(i,!0)]),[null==a.default?void 0:a.default(),m])])}u.props={size:String,mark:Boolean,color:String,plain:Boolean,round:Boolean,textColor:String,closeable:Boolean,type:{type:String,default:"default"}},e["a"]=d(u)},a481:function(t,e,a){"use strict";var i=a("cb7c"),n=a("4bf8"),r=a("9def"),o=a("4588"),s=a("0390"),c=a("5f1b"),d=Math.max,l=Math.min,u=Math.floor,h=/\$([$&`']|\d\d?|<[^>]*>)/g,g=/\$([$&`']|\d\d?)/g,f=function(t){return void 0===t?t:String(t)};a("214f")("replace",2,(function(t,e,a,p){return[function(i,n){var r=t(this),o=void 0==i?void 0:i[e];return void 0!==o?o.call(i,r,n):a.call(String(r),i,n)},function(t,e){var n=p(a,t,this,e);if(n.done)return n.value;var u=i(t),h=String(this),g="function"===typeof e;g||(e=String(e));var b=u.global;if(b){var m=u.unicode;u.lastIndex=0}var A=[];while(1){var y=c(u,h);if(null===y)break;if(A.push(y),!b)break;var S=String(y[0]);""===S&&(u.lastIndex=s(h,r(u.lastIndex),m))}for(var k="",w=0,E=0;E<A.length;E++){y=A[E];for(var C=String(y[0]),x=d(l(o(y.index),h.length),0),I=[],O=1;O<y.length;O++)I.push(f(y[O]));var P=y.groups;if(g){var B=[C].concat(I,x,h);void 0!==P&&B.push(P);var j=String(e.apply(void 0,B))}else j=v(C,h,x,I,P,e);x>=w&&(k+=h.slice(w,x)+j,w=x+C.length)}return k+h.slice(w)}];function v(t,e,i,r,o,s){var c=i+t.length,d=r.length,l=g;return void 0!==o&&(o=n(o),l=h),a.call(s,l,(function(a,n){var s;switch(n.charAt(0)){case"$":return"$";case"&":return t;case"`":return e.slice(0,i);case"'":return e.slice(c);case"<":s=o[n.slice(1,-1)];break;default:var l=+n;if(0===l)return a;if(l>d){var h=u(l/10);return 0===h?a:h<=d?void 0===r[h-1]?n.charAt(1):r[h-1]+n.charAt(1):a}s=r[l-1]}return void 0===s?"":s}))}}))},aa77:function(t,e,a){var i=a("5ca1"),n=a("be13"),r=a("79e5"),o=a("fdef"),s="["+o+"]",c="​",d=RegExp("^"+s+s+"*"),l=RegExp(s+s+"*$"),u=function(t,e,a){var n={},s=r((function(){return!!o[t]()||c[t]()!=c})),d=n[t]=s?e(h):o[t];a&&(n[a]=d),i(i.P+i.F*s,"String",n)},h=u.trim=function(t,e){return t=String(n(t)),1&e&&(t=t.replace(d,"")),2&e&&(t=t.replace(l,"")),t};t.exports=u},c5f6:function(t,e,a){"use strict";var i=a("7726"),n=a("69a8"),r=a("2d95"),o=a("5dbc"),s=a("6a99"),c=a("79e5"),d=a("9093").f,l=a("11e9").f,u=a("86cc").f,h=a("aa77").trim,g="Number",f=i[g],p=f,v=f.prototype,b=r(a("2aeb")(v))==g,m="trim"in String.prototype,A=function(t){var e=s(t,!1);if("string"==typeof e&&e.length>2){e=m?e.trim():h(e,3);var a,i,n,r=e.charCodeAt(0);if(43===r||45===r){if(a=e.charCodeAt(2),88===a||120===a)return NaN}else if(48===r){switch(e.charCodeAt(1)){case 66:case 98:i=2,n=49;break;case 79:case 111:i=8,n=55;break;default:return+e}for(var o,c=e.slice(2),d=0,l=c.length;d<l;d++)if(o=c.charCodeAt(d),o<48||o>n)return NaN;return parseInt(c,i)}}return+e};if(!f(" 0o1")||!f("0b1")||f("+0x1")){f=function(t){var e=arguments.length<1?0:t,a=this;return a instanceof f&&(b?c((function(){v.valueOf.call(a)})):r(a)!=g)?o(new p(A(e)),a,f):A(e)};for(var y,S=a("9e1e")?d(p):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),k=0;S.length>k;k++)n(p,y=S[k])&&!n(f,y)&&u(f,y,l(p,y));f.prototype=v,v.constructor=f,a("2aba")(i,g,f)}},d9d2:function(t,e,a){},dc1b:function(t,e,a){},dde9:function(t,e,a){},e27c:function(t,e,a){"use strict";var i=a("d282"),n=a("78eb"),r=a("9884"),o=Object(i["a"])("radio-group"),s=o[0],c=o[1];e["a"]=s({mixins:[Object(r["b"])("vanRadio"),n["a"]],props:{value:null,disabled:Boolean,direction:String,checkedColor:String,iconSize:[Number,String]},watch:{value:function(t){this.$emit("change",t)}},render:function(){var t=arguments[0];return t("div",{class:c([this.direction]),attrs:{role:"radiogroup"}},[this.slots()])}})},ea82:function(t,e,a){},f338:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAFo0lEQVRoQ+2ae1BUVRzHv+cuj72wPAJZJG2cmlJ8jEpmUj4BUUiYpKayWBodWSxShxAn0pmwKR+jJEyMNrlUzLikjZXNlPkqNZuaqRkVLfMxpqaYursgbxZY7mnOWe+yPHZZ1oWVht8/3Lv3nN/5fn6/3/mdZXcJBrkRR/qNmtfHAJYxAI3xLiM5BfhciNB/dKEnHd0Abmoy5wggmwgwzbvCO69Ogd8k0Pwofekx+yedAIyazAIKsu5+Et5VCwFdF6EvfVd+3QZgeGHxcPj73ryfxdu0tbRFqfeU3WL3HQAabSmApYMCAPhErddl2gAMr2gnQ8CpQSLeKlNCjPpzXQXPwK30zByBkKLBBCBR+ubw8tJiDmDUaPdSYOFgAiDANxF6XRoHMGi0RwHMGUwAAI6p9bq4IQAvZm0oA14MPl96KAOAjw8EUQQJEEFEJf/L7wMDIagCQVSqu3+t9zUbPvBk1nrPQEBaKgQu7q5IWaCKCVJxwa5a8/eH0bBrj6vDXRnnGkDgc6kOnbWcrIDl6nX+3C/6MfiOi7aNbfz6W9u1GDcTTfsPQ6GOgDjX+XFTV7QdzK8Ldu8AbBEWVRZd30cfQWhBPl+33WBE9aq1/Dok9w34xUxC/Y4y+MdOhd/E8WBwTXs7AGWxYUUbQesbULOhENTc0huDZwBgsaDm/S1o+/sKglcsg/+TU1D/6U6Yj/4MVoJyBmuLtkE54yn4T33cIYBy5tMIylqMpn0H0bj7qwECANB69jxqN221RjxvJWoLP4RfzESE5C63iah5bzOU8bOgnB7rEIANZgAMpHZzMVr/+MsZhGcyYF/rrCzEhNloOVEBZdws694YOxq+Y8egOr8A4rx4iPGznQIohoUjZG0epOo7PLOg1BGEZwDsW2PbOev/3UywbIFpKfy+asVqBDwzD2JyolMANk8uPUd75a5vzwDIoplTGYYJYJGXjQGYlmQj4NkFCFi4oLfa7tTJetrsHgWoWV+ItvMXHYoKXbOKZ8D46jIELEyxbWp5glRbB6muHorwsG7nisczwBy2VpyBZKqGIioSYmIcb42yGTOy+KV997E9YxlITbYBMOENZeVou3QZiqjhaK+8AeWs6Qhc9Hz/ZICVh9+kCfCbMA6KyAhYrlXCfPxX+Dw8im9c+xLyjR7dLdKmpcshLpjf0VaLt0MZO7VTABp3fQkqSVClv8j9eSwD5p9+geXadagyFnUrFQYWtDQDiki109o2Za2EmJTIAcxHj0MIC+MBYWa58S98RjxoE+0/ZTJ8Rj3kOYC64u0Izsnmra2+rByWK//wNsnEsBKwXL7KW6QzM72WA3FeAp/TfOgIHy/VN6AqO5dPkw8xdoq3njwNMWnuvQOwzcfKgTY387S2/H4CdSUf8wUVI6IQtsn6AZn9WeAIwvzDMShGWqPsP+0JXnasg8mdSwgNQXjJFlCzGbVbt/FxktGEdlOVI5e9t1F5puy89fSf/JRlJp+0LBt33lnvNPpdH9qf0uyEbrt4ybbx2TV7zQVzHYA5k9shKxlWSuzNmxD2gKvvW7rpCXkrhzeErsYyYn+2OAHpGwBzxDaxfa037NzN69ldY+1WOSMWQlAQWs+dR/O+QzwbLlrfAXjtDwuHEBIMy20DaEOji2v1yzD3APpFintOhwDci5vnZg1lwHOxdM/T/ykD6doNIHjbvUB4aRbFRnW5bg3/eP12hnY+oTjgJSluLUsJkiJ36g5ygKr0FcESMZ+lwEi3vA3wJAJUClQ5Pry8pM72LaVRo82jwJYB1uLWcgRYHaHXFbLJnb7oNmiy9gM0yS2vAzaJHFDrdyTLy3X7qYEhPfMlEPIZANc/uR0Y8c2gdIm6vPQL++V6/LHH7ZczJxIFUgiEeAqaMDD6el6FgPxIIR2h7fguclfpma6jHP5axZui+7L2f9K/sE9WTd7EAAAAAElFTkSuQmCC"},fdef:function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},ffa2:function(t,e,a){"use strict";a("a481"),a("7f7f");var i={},n={PADCHAR:"=",ALPHA:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",makeDOMException:function(){try{return new DOMException(DOMException.INVALID_CHARACTER_ERR)}catch(e){var t=new Error("DOM Exception 5");return t.code=t.number=5,t.name=t.description="INVALID_CHARACTER_ERR",t.toString=function(){return"Error: "+t.name+": "+t.message},t}},getbyte64:function(t,e){var a=n.ALPHA.indexOf(t.charAt(e));if(-1===a)throw n.makeDOMException();return a},decode:function(t){t=""+t;var e,a,i,r=n.getbyte64,o=t.length;if(0===o)return t;if(o%4!==0)throw n.makeDOMException();e=0,t.charAt(o-1)===n.PADCHAR&&(e=1,t.charAt(o-2)===n.PADCHAR&&(e=2),o-=4);var s=[];for(a=0;a<o;a+=4)i=r(t,a)<<18|r(t,a+1)<<12|r(t,a+2)<<6|r(t,a+3),s.push(String.fromCharCode(i>>16,i>>8&255,255&i));switch(e){case 1:i=r(t,a)<<18|r(t,a+1)<<12|r(t,a+2)<<6,s.push(String.fromCharCode(i>>16,i>>8&255));break;case 2:i=r(t,a)<<18|r(t,a+1)<<12,s.push(String.fromCharCode(i>>16));break}return s.join("")},getbyte:function(t,e){var a=t.charCodeAt(e);if(a>255)throw n.makeDOMException();return a},encode:function(t){if(1!==arguments.length)throw new SyntaxError("Not enough arguments");var e,a,i=n.PADCHAR,r=n.ALPHA,o=n.getbyte,s=[];t=""+t;var c=t.length-t.length%3;if(0===t.length)return t;for(e=0;e<c;e+=3)a=o(t,e)<<16|o(t,e+1)<<8|o(t,e+2),s.push(r.charAt(a>>18)),s.push(r.charAt(a>>12&63)),s.push(r.charAt(a>>6&63)),s.push(r.charAt(63&a));switch(t.length-c){case 1:a=o(t,e)<<16,s.push(r.charAt(a>>18)+r.charAt(a>>12&63)+i+i);break;case 2:a=o(t,e)<<16|o(t,e+1)<<8,s.push(r.charAt(a>>18)+r.charAt(a>>12&63)+r.charAt(a>>6&63)+i);break}return s.join("")}};i.pay=function(t){var e=encodeURIComponent(n.encode(t));console.log(window.location.origin),location.replace(window.location.origin+"/order/alipay?goto="+e)},i.decode=function(t){return n.decode(decodeURIComponent(t))},e["a"]=i}}]);