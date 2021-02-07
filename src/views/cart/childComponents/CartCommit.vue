<template>
  <div class="cart-commit">
    <van-submit-bar
      :price="totalPrice"
      button-text="立即支付"
      class="van-submit"
      button-color="#ff8189"
      @submit="onSubmit"
      :disabled="!(totalPrice > 0)"
    >
      <van-checkbox v-model="checked" checked-color="#ff8189" @click="allSelected">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import Vue from "vue";
import { SubmitBar } from "vant";
import { mapGetters } from "vuex";
Vue.use(SubmitBar);
export default {
  name: "CartCommit",
  data() {
    return {
      checked: false
    };
  },
  props: {
    totalPrice: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters(["cartList"])
  },
  methods: {
    onSubmit() {
      this.$emit('commit')
    },
    allSelected() {
      this.$emit('allSelected')
    }
  },
  components: {}
};
</script>

<style scoped>
  .cart-commit {
    position: fixed;
    bottom: -50px;
  }
  .van-submit {
    position: absolute !important;
    bottom: 100px;
    width: 100vw;
  }
</style>
