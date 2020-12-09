<template>
   <div class="">
     <swiper>
      <swiper-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </swiper-item>
    </swiper>
   </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper/index.js'
  export default {
    name: 'HomeSwiper',
    data() {
      return {}
    },
    props: {
      banners: {
        // 类型
        type: Array,
        // 默认值  必须是函数
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    }
}
</script>

<style>
</style>
