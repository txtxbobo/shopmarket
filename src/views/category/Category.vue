<template>
  <div id="category">
    <nav-bar class="category-nav">
      <p slot="center">商品分类</p>
    </nav-bar>
    <slide-bar class="slide-bar" :data-list="slideBarData" @slideBarClick="slideBarClick($event)"></slide-bar>
    <scroll class="category-scroll" ref="scroll" :probe-type="3">
      <category-top class="main-category" :main-top-data-list="topDataList"></category-top>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick(currentIndex, $event)" ref="tab"></tab-control>
      <goods-list :goods="goods"></goods-list>
    </scroll>
  </div>
</template>

<script>
// 组件
import NavBar from '../../components/common/navbar/NavBar.vue'
import SlideBar from './childComponents/SlideBar.vue'
import Scroll from '../../components/common/scroll/Scroll.vue'
import CategoryTop from './childComponents/CategoryTop.vue'
import TabControl from '../../components/content/tabControl/TabControl.vue'
import GoodsList from '../../components/content/goods/GoodsList.vue'
// 数据请求
import {getSlideBarData, getMainTopData, getMainMoreData} from '../../network/cstegroy'

  export default {
    name: "Category",
    components: { NavBar, SlideBar, Scroll, CategoryTop, TabControl, GoodsList },
    data() {
      return {
        slideBarData: {},
        topDataList: [],
        currentIndex: 0,
        goods: []
      }
    },
    // 组件创建完后调用created
    created() {
      this.getSlideBarData()
    },
    // 创建组件完成后调用
    mounted() {
    },
    methods: {
      slideBarClick(obj) {  
        if (this.currentIndex === obj.index) return
        this.currentIndex = obj.index
        this.getMainTopData(obj.maitKey)
        this.getMainMoreData(this.slideBarData.list[this.currentIndex].miniWallkey, 'pop')
      },
      getSlideBarData() {
        getSlideBarData().then(res => {
          this.slideBarData = res.data.category
          this.$nextTick(() => {
            this.getMainTopData(this.slideBarData.list[0].maitKey)
            this.getMainMoreData(this.slideBarData.list[0].miniWallkey, 'pop')
          })
        })
      },
      tabClick(miniWallkey, index) {
        const typeList = ['pop', 'new', 'sell']
        this.getMainMoreData(this.slideBarData.list[this.currentIndex].miniWallkey, typeList[index])
      },
      getMainTopData(value) {
        getMainTopData(value).then(res => {
          // console.log(res);
          this.topDataList = [...res.data.list]
        })
      },
      getMainMoreData(miniWallkey, type) {
        getMainMoreData(miniWallkey, type).then(res => {
          // console.log(res);
          this.goods = [...res]
        })
      }
    },
  }
</script>

<style scoped>
  #category {
    height: calc(100vh - 50px)
  }
  .category-nav {
    background-color: #ff8189;
    color: #fff;
  }
  .category-scroll {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 50px;
    left: 30vw;
    right: 0;
    color: #666666;
  }
</style>