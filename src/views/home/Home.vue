<template>
  <div id="home">
    <!-- 指定替换插槽 name -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"/>
    <home-recommend-view :recommends="recommends"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView.vue'

// 导入网络请求
import {getHomeMultidata} from 'network/home'


// import Swiper from 'components/common/swiper/Swiper'
// import SwiperItem from 'components/common/swiper/SwiperItem'
// 导入轮播图

// import SwiperItem from '../../components/common/swiper/SwiperItem.vue'
// import SwiperItem from '../../components/common/swiper/SwiperItem.vue'
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView
  },
  data() {
    return {
      // 存储数据，函数中的变量被调用后会被回收  防止回收
      banners: [],
      recommends: []
    }
  },
  created() {
    // 1.请求多个数据
    getHomeMultidata().then(res => {
      console.log(res);
      // created里面的this就是模块的this
      // this.result =res;
      // 直接获取数组对象
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
  },
}
</script>

<style scoped>
  .home-nav {
    background-color: rgb(225, 142, 250);
    color: #fff;
  }
</style>