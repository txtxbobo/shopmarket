<template>
  <div class="detail-info" v-if="Object.keys(detailInfo).length !== 0">
    <div class="info-desc">
      <div class="start"></div>
      <div class="center">{{ detailInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">
      {{ detailInfo.detailImage[0].key}}
    </div>
    <div class="info-list">
      <img v-for="(item, index) in detailInfo.detailImage[0].list" 
      :src="item" :key="index" alt="" @load="imgLoad">
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailGoodsInfo',
  data() {
    return {
      counter: 0,
      imagelength: 0
    }
  },
  props:{
    detailInfo: {
      type: Object
    }
  },
  methods: {
    imgLoad() {
      // 判断所有图片都加载完了，再进行一次回调
      if (++this.counter === this.imagelength) {
        this.$emit('imgLoaded')
      }
    }
  },
  // watch函数监某个属性的变化
  watch: {
    detailInfo() {
      // 获取图片个数
      this.imagelength = this.detailInfo.detailImage[0].list.length;
    }
  },
  components: {}
}
</script>

<style scoped>
  .detail-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-desc {
    padding: 0 15px;
  }
  .info-desc .start,
  .info-desc .end {
    position: relative;
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
  }
  .info-desc .start {
    float: left;
  }
  .info-desc .end {
    float: right;
  }
  .info-desc .start::before,
  .info-desc .end::after{
    position: absolute;
    bottom: 0;
    content: "";
    width: 5px;
    height: 5px;
    background-color: #a3a3a3;
  }
  .info-desc .end::after {
    right: 0;
  }
  .info-desc .center {
    font-size: 14px;
    padding: 15px 0;
  }
  .detail-info .info-key {
    font-size: 15px;
    margin: 10px 0px 10px 15px;
    color: #333333;
  }
  .detail-info .info-list img{
    width: 100%;
    padding: 10px;
  }

</style>
