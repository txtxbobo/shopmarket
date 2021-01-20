<template>
  <div class="">
    <swiper>
      <swiper-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index.js";
export default {
  name: "HomeSwiper",
  data() {
    return {
      iaLoad: false
    };
  },
  props: {
    banners: {
      // 类型
      type: Array,
      // 默认值  必须是函数
      default() {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        // console.log('-----');
        this.$emit("swiperImageLoad");
        //  设置为true下次进来的时候就不进行调用了   只调用一次
        this.isLoad = true
      }
    }
  }
};
</script>

<style scoped>

</style>
