<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="2">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods" class="base-info"></detail-base-info>
      <detail-shop-info :shop-info="shopInfo" class="shop-info" />
      <detail-goods-info :detail-info="detailInfo" @imgLoaded="imageLoad"></detail-goods-info>
      <detail-param-info :params-info="paramsInfo"/>
      <detail-commont-info :commont-info="commontInfo" class="commont-info" ref="commontInfo"/>
      <goods-list :goods="recommendInfo" :is-recommend="true" ref="recommendInfo" class="recommend-goods"/>
    </scroll>
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

// 网络请求
import { getDetail, Goods, Shop, GoodsParam, getRecommendData } from "../../network/detail";
import GoodsList from '../../components/content/goods/GoodsList.vue';

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
      recommendInfo: []
    };
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;
    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      console.log(res);
      // 1.获取顶部轮播图片
      const data = res.result;
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
      getRecommendData().then(res => {
        console.log(res);
        this.recommendInfo = res.data.list
      })
    });
  },
  updated() {

  },
  
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
    },
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
    GoodsList
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
  .recommend-goods {
    padding-top: 5px;  }
</style>