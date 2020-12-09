<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <img slot="item-icon" src="~assets/img/firstpage.png" alt="">
      <img slot="item-icon-active" src="~/assets/img/firstpage1.png" alt="">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img slot="item-icon" src="~/assets/img/catecory.png" alt="">
      <img slot="item-icon-active" src="~/assets/img/category1.png" alt="">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img slot="item-icon" src="~/assets/img/goodscar1.png" alt="">
      <img slot="item-icon-active" src="~/assets/img/goodscar.png" alt="">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img slot="item-icon" src="~/assets/img/me.png" alt="">
      <img slot="item-icon-active" src="~/assets/img/me1.png" alt="">
      <div slot="item-text">我的</div>
    </tab-bar-item> 
  </tab-bar>
</template>

<script>
  // 导入tabbar
  import TabBar from '../common/tabbar/TabBar'
  import TabBarItem from '../common/tabbar/TabBarItem'
  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>