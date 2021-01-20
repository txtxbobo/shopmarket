<template>
  <swiper class="swiper-image">
    <swiper-item v-for="item in topImages" :key="item.index">
      <img :src="item" alt="" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "DetailSwiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  components: {
    SwiperItem,
    Swiper
  }
};
</script>

<style scoped>
  .swiper-image {
    height: 300px;
    /* overflow: hidden; */
  }
</style>
