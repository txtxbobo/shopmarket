<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
    <!-- <slot name="item-icon"></slot> -->
  </div>
</template>

<script>
export default {
  name: "TabBarItem",  
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data() {
    return {
      // isActive: true
      // 判断是否活跃
    }
  },
  computed:{
    // 判断是否活跃
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    // 判断颜色
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      // 解决双击报错
      this.$router.push('/location').catch(err => {
        console.log(err);
      })
      this.$router.replace(this.path)
    }
  },
}
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    /* 一般tab-bar的高度49 */
    height: 49px;
    font-size: 14px;
    /* line-height: 49px; */
  }
  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  .active {
    color: red;
  }
</style>