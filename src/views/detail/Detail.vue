<template>
  <div id="detail">
    <detail-nav-bar @titleClick='titleClick' ref="tabControl"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <!-- <div>{{ $store.state.cartList[0] }}</div> -->
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods" class="detail-base"></detail-base-info>
      <detail-shop-info :shop-info="shopInfo" class="detail-shop" />
      <detail-goods-info :detail-info="detailInfo" @imgLoaded="imageLoad" class="detail-goods"></detail-goods-info>
      <detail-param-info :params-info="paramsInfo" class="detail-params" ref="paramInfo"/>
      <detail-commont-info :commont-info="commontInfo" class="detail-commont" ref="commontInfo"/>
      <goods-list :goods="recommendInfo" :is-recommend="true" ref="recommendInfo" class="detail-recommend"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue';
import DetailParamInfo from './childComps/DetailParamInfo.vue';
import DetailCommontInfo from './childComps/DetailCommontInfo.vue';
import DetailBottomBar from './childComps/DetailBottomBar'
import BackTop from '../../components/content/backTop/BackTop'

// 网络请求
import { getDetail, Goods, Shop, getRecommendData } from "../../network/detail";
import GoodsList from '../../components/content/goods/GoodsList.vue';
// 导入混入
import {backTopMixin, imgListenerMixin} from '../../common/mixin'

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shopInfo: {},
      detailInfo: {},
      paramsInfo: {},
      commontInfo: {},
      recommendInfo: [],
      topY: [0, 0, 0, 0, Number.MAX_VALUE],
      currentIndex: 0
    };
  },
  mixins: [imgListenerMixin, backTopMixin],
  created() {
    // 请求详情数据
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;
    // 2.query方式保存iid
    // this.iid = this.$route.query.iid;
    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      // 1.获取顶部轮播图片
      const data = res.result;
      // 取出轮播图的数据
      this.topImages = data.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3.创建店铺信息
      this.shopInfo = new Shop(data.shopInfo);
      // 4.获取店铺信息
      this.detailInfo = data.detailInfo;
      // 5.获取尺寸参数信息
      // this.paramsInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      this.paramsInfo = data.itemParams
      // 6.获取评论信息
      if (data.rate.cRate !== 0) {
        this.commontInfo = data.rate.list[0]
      }
    }),
    getRecommendData().then(res => {
      // console.log(res);
      this.recommendInfo = res.data.list
    })
  },
  updated() {

  },
  
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      // 组件对象必须使用$el来获取
      this.topY[1] = this.$refs.paramInfo.$el.offsetTop
      this.topY[2] = this.$refs.commontInfo.$el.offsetTop
      this.topY[3] = this.$refs.recommendInfo.$el.offsetTop
      // console.log(this.topY);
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.topY[index], 500)
    },
    contentScroll(position) {
      // 返回顶部
      this.isShowBackTop = (-position.y) > 1000
      // console.log(position);
      // 1.获取Y值
      const positionY = -position.y
      // 2.和主题中的值进行对比
      //  [0, 6461, 7351, 7667]  在0 ~ 6461之间是商品  。。。。
      this.topY.forEach((item, index) => {
        if (positionY >= item && positionY < this.topY[index + 1] && this.currentIndex !== index) {
          this.currentIndex = index
          // 传给navBar中的currentIndex
          this.$refs.tabControl.currentIndex = this.currentIndex
        }
      });
    },
    addToCart() {
      // console.log(this.iid);
      // console.log(this.topImages[0]);
      // 1.获取购物车需要展示的商品信息
      const product = {
        // console.log(this.topImages[0])
        image: this.topImages[0],
        title: this.goods.title,
        desc: this.goods.desc,
        price: this.goods.lowNowPrice,
        id: this.iid
      }
      // 2.将商品添加到购物车里   dispatch分发任务
      this.$store.dispatch('setCartData', product)
      // console.log(product);   dispatch返回一个promise
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res);
      // })
    }
  },
  destroyed() {
    this.$bus.$off('itemImageLoad', this.imgLoadListener)
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommontInfo,
    GoodsList,
    DetailBottomBar,
    BackTop
  }
};
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 110;
    background-color: #fff;
    height: 100vh;
  }
  .content {
    overflow: hidden;
    height: calc(100% - 94px);
    position: absolute;
    top: 44px;
    bottom: 50px;
    left: 0;
    right: 0;
  }
  .detail-shop, .detail-base, .detail-params, .detail-recommend, .detail-commont, .detail-goods {
    box-shadow: 0px 5px 1px rgba(100, 100, 100, .1);
  }
  .recommend-goods {
    padding-top: 5px;  }
</style>