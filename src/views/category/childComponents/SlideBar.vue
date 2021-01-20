<template>
  <div class="category-slide">
    <scroll class="slide-bar-scroll" ref="scroll" @mousemove="load">
      <ul>
        <li class="datalist" v-for="(item,index) in dataList.list" :key="index"
          :class="{active:index === currentIndex}"
          @click="liClick(index)">
          {{ item.title }}
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import Scroll from '../../../components/common/scroll/Scroll.vue'
export default {
  name: 'SlideBar',
  data() {
     return {
       currentIndex: 0
     }
  },
  props: {
    dataList: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    liClick(index) {
      this.currentIndex = index;
      // console.log(this.dataList.list.length);
      const obj = {
        index,
        maitKey: this.dataList.list[index].maitKey
      }
      this.$emit('slideBarClick', obj)
    },
    load() {
      if (++currentIndex == this.dataList.list.length) {
        // console.log(scroll);
        this.$refs.scroll.refresh()
      }
    }
  },
  components: {Scroll}
}
</script>

<style scoped>
  .category-slide {
    height: 100%;
    /* background-color: red; */
  }
  .slide-bar-scroll {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 50px;
    left: 0;
    right: 70vw;
    background-color: #f6f6f6;
    color: #666666;
    /* background-color: aqua; */
  }
  .datalist {
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .active {
    background-color: #fff;
    color: var(--color-high-text);
    border-left: 3px solid var(--color-tint);
  }
</style>