<template>
  <div class="cart-nav-bar">
    <nav-bar class="cart-nav-bar" style="background-color: #ff8189" text-color="#fff">
      <div slot="center" class="center">
        <span>购物车({{goodsNum}})</span>
      </div>
      <div slot="right" class="right" @click="deleteAll">
        <span>清空</span>
      </div>
    </nav-bar>
  </div>
</template>

<script>

import NavBar from '../../../components/common/navbar/NavBar.vue';
export default {
  name: "CartNavBar",
  data() {
    return {
      
    };
  },
  props: {
    goodsNum: {
      type: Number,
      default: 0
    }
  },
  methods: {
    deleteAll() {
      this.$emit('deleteAll')
    }
  },
  components: {NavBar}
};
</script>

<style scoped>
  .cart-nav-bar {
    color: #fff;
  }
  .right {
    font-size: 14px;
    padding-right: 10px;
  }
</style>
