<template>
  <div class="detail-nav-bar"> 
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles" :key="index" 
          class="title-item" :class="{active: index == currentIndex}"
          @click="titleClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
export default {
  name: 'DetailNavBar',
  data() {
     return {
       titles: ['商品', '参数', '评论', '推介'],
       currentIndex: 0
     }
  },
  components: {
    NavBar
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit('titleClick', index)
    },
    backClick() {
      this.$router.go(-1)
      // this.$router.back()
    }
  },
}
</script>

<style scoped>
  .detail-nav-bar {
    position: fixed;
    z-index: 1000;
    background-color: #fff;
    width: 100%;
  }
  .title {
    display: flex;
  }
  .title-item {
    flex: 1;
    font-size: 13px;
  }
  .active {
    color: rgb(221, 30, 30);
  }
  .back img{
    margin-top: 11px;
  }
</style>
