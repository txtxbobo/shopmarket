<template>
  <div class="cart-list">
    <div class="item-check">
      <van-checkbox v-model="goodsItem.checked" icon-size="24px" checked-color="#ee0a24" @click="checkBoxClick"></van-checkbox>
    </div>
    <!-- 商品卡片 -->
    <div class="cart-item">
      <van-swipe-cell>
        <van-card
          :num="goodsItem.count"
          :price="goodsItem.price"
          :desc="goodsItem.desc"
          :title="goodsItem.title"
          class="goods-card"
          :thumb="goodsItem.image"
        />
        <template #left>
          <van-button
            square
            text="-"
            type="danger"
            class="delete-button"
            color="#ff8198"
            @click="subClick"
          />
        </template>
        <template #right>
          <van-button
            square
            text="+"
            type="danger"
            class="delete-button"
            color="#ff8198"
            @click="addClick"
          />
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Checkbox, CheckboxGroup, Toast, SwipeCell, Button, Card } from "vant";
import { mapMutations } from 'vuex';
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(SwipeCell);
Vue.use(Toast);
Vue.use(Button);
Vue.use(Card);
export default {
  name: "CartGoodsList",
  data() {
    return {};
  },
  props: {
    goodsItem: {
      type: Object,
      default() {
        return []
      }
    }
  },
  components: {},
  methods: {
    ...mapMutations(['deleteGood', 'addCounter']),
    addClick() {
      this.addCounter(this.goodsItem)
    },
    subClick() {
      if (this.goodsItem.count === 1) {
        Toast('删除成功')
      }
      this.$store.dispatch('deleteGoodData', this.goodsItem)
    },
    checkBoxClick() {
      this.$emit('goodSelected')
    }
  },
};
</script>

<style scoped>
  .cart-list {
    display: flex;
    padding-left: 15px;
    padding-top: 5px;
    margin-bottom: 5px;
    border-bottom:2px solid rgba(100, 100, 100, 0.1) ;
  }
  .goods-card {
    margin: 0;
    background-color: #ffffff;
    width: 88vw;
  }
  .delete-button {
    height: 100%;
  }
  .cart-list:last-child {
    border-bottom: 0px;
  }
  .item-check {
    display: flex;
    text-align: center;
    padding-right: 10px;
  }

</style>
