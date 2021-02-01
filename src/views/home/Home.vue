<template>
  <div id="home">
    <!-- 指定替换插槽 name -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl1"
        class="tab-control"
        v-show="isTabFixed"
      />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <home-recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <goods-list :goods="showGoods" />
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
// 导入公共组件
import TabControl from "components/content/tabControl/TabControl";
import NavBar from "components/common/navbar/NavBar";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

// 导入子组件
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";

// 导入网络请求
import { getHomeMultidata, getHomeGoods } from "network/home";

// 导入utils
import { debounce } from "common/utils";
// 导入混入
import {imgListenerMixin} from 'common/mixin'

// 导入better-scroll
// import BSscroll from '@better-scroll/core'

// import Swiper from 'components/common/swiper/Swiper'
// import SwiperItem from 'components/common/swiper/SwiperItem'
// 导入轮播图

// import SwiperItem from '../../components/common/swiper/SwiperItem.vue'
// import SwiperItem from '../../components/common/swiper/SwiperItem.vue'
export default {
  name: "Home",
  components: {
    TabControl,
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      // 存储数据，函数中的变量被调用后会被回收  防止回收
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  mixins: [imgListenerMixin],
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  // 进来
  activated() {
    // scrollTo(x , y, time)
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    // console.log('进来');
  },
  // 离开
  deactivated() {
    // 记录Y值
    this.saveY = this.$refs.scroll.getScrollY()
    // console.log(this.saveY);
    // 取消全局事件的监听
    this.$bus.$off('itemImageLoad', this.imgLoadListener)
  },
  // createde里面一般不写具体的方法逻辑  写在methods
  created() {
    // 1.请求多个数据   必须写this
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 1.图片加载完成后的事件监听
    // 防抖动封装
    // let refresh = debounce(this.$refs.scroll.refresh, 200);
    // // 3.监听item中图片加载完成
    // this.$bus.$on("itemImageLoad", () => {
    //   // $refs.scroll在mouted里面监听
    //   // this.$refs.scroll.refresh()
    //   refresh();
    // });  
  },
  // 具体逻辑实现
  methods: {
    // 事件监听相关的方法
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
        default:
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      // console.log("回到顶部");   直接调用组件的方法
      this.$refs.scroll.scrollTo(0, 0, 500);
      // console.log("回到顶部");
    },
    // 监听位置  显示和隐藏backTop
    contentScroll(position) {
      // 1.判断backTop是否显示
      // console.log(position);
      this.isShowBackTop = -position.y > 1000;
      // 2.决定tabControl是否吸顶（position：fixed）
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    // 上啦加载更多
    loadMore() {
      // console.log('加载更多');
      this.getHomeGoods(this.currentType);
    },
    //
    swiperImageLoad() {
      // 2.获取tabControl的offsetTop
      // 所有的组件都有一个属性:$el
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      // console.log(this.$refs.tabControl.$el.offsetTop);
    },
    // 防抖函数封装
    // debounce(func, delay) {
    //   let timer = null

    //   return function (...args) {
    //     if (timer) clearInterval(timer)
    //     timer = setTimeout(() => {
    //       func.apply(this, args)
    //     }, delay)
    //   }
    // },
    // 1.网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        // created里面的this就是模块的this
        // this.result =res;
        // 直接获取数组对象
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        // res => pop钱30条数据  page=1
        // console.log(res);
        // 保存数据  将请求的数据添加到goodlist中    .push(...XXX)语法
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
  /* padding-top: 44px; */
}
.home-nav {
  background-color: rgb(225, 142, 250);
  color: #fff;
  /* 在使用浏览器原生滚动时为了让导航不跟随一起滚动，使用better-scroll后不适用 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.tab-control {
  position: relative;
  z-index: 9;
  /* top: 44px; */
}
.content {
  height: calc(100% - 93px);
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 50px;
  left: 0;
  right: 0;
  /* margin-top: 44px; */
}
/* .fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
} */
</style>
