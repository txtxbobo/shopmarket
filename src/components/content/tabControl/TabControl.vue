<template>
   <div class="tab-control">
     <div v-for="(item, index) in titles" :key="index" 
        class="tab-control-item" 
        :class="{active: index === currentIndex}"
        @click="itemClick(index)">
       <span>{{ item }}</span>
     </div>
   </div>
</template>

<script>
export default {
   name: 'TabControl',
   props: {
     titles: {
       type: Array,
       default() {
         return []
       }
     }
   },
   data() {
       return {
         currentIndex: 0
       }
   },
   methods: {
     itemClick(index) {
       this.currentIndex = index;
      //  传给父组件点击事件
       this.$emit('tabClick', index)
     }
   },
  components: {}
}
</script>

<style>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    z-index: 99;
  }
  .tab-control-item {
    flex: 1;
  }
  .active {
    color: rgb(241, 65, 94);
  }
  .active span {
    padding: 5px;
    border-bottom: 3px solid rgb(241, 65, 94);
  }
</style>
