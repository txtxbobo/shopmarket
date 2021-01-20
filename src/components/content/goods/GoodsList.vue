<template>
  <div>
    <p v-show="isRecommend" class="recommend">推荐商品</p>
    <div class="goods-list">
      <goods-list-item v-for="(item, index) in goods" 
      :key="index" :goods-item="item"/>
      <!-- {{ goods }} -->
    </div>
    <p v-show="isRecommend" class="end">你终于找到我的底线了~~~</p>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'
export default {
  name: 'GoodsList',
  data() {
       return {}
   },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    },
    isRecommend: {
      type: Boolean,
      default: false
    }
  },
   components: {GoodsListItem}
}
</script>

<style>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }
  .recommend {
    font-size: 18px;
    padding-top: 5px;
    margin: 15px 0;
    padding-left: 10px;
  }
  .end {
    text-align: center;
    padding-top: 20px;
    font-size: 15px;
  }
</style>
