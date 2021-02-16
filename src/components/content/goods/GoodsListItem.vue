<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad"/>
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ '￥' + goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  data() {
    return {};
  },
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.img || this.goodsItem.show.img
    }
  },
  methods: {
    imageLoad() {
      this.$bus.$emit('itemImageLoad')
      // console.log('imageLoad');
      // if (this.$route.path.indexOf('/home') != -1) {
      //   this.$bus.$emit('homeItemImageLoad')
      // } else if(this.$route.path.indexOf('/detail') != -1) {
      //   this.$bus.$emit('detailItemImageLoad')
      // }
    },
    itemClick() {
      // console.log('跳转到详情页');
      // 1.动态路由
      this.$router.push('/detail/' + this.goodsItem.iid)
      // 2.query  方式
      // this.$router.push({
      //   path: '/detail',
      //   query: {
      //     iid: this.goodsItem.iid
      //   }
      // })
    }
  },
  components: {}
};
</script>

<style>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0px;
  right: 0px;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  /* display: block; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: rgb(218, 24, 176);
  margin-left: 10px;
}

.goods-info .collect {
  position: relative;
  /* display: block; */
  left: 15px;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -14px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
