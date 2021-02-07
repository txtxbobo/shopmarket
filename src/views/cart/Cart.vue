<template>
  <div class="cart">
    <cart-nav-bar
      :goods-num="cartListLength"
      @deleteAll="deleteAll"
    ></cart-nav-bar>
    <scroll ref="scroll" class="content" :probe-type="3">
      <cart-goods-list
        v-for="(item, index) in cartList"
        :goods-item="item"
        :key="index"
        @good-selected="goodSelected"
      >
      </cart-goods-list>
    </scroll>
    <cart-commit
      class="commit"
      ref="commit"
      :total-price="totalPrice"
      @allSelected="allSelected"
      @commit="commitList"
    ></cart-commit>
  </div>
</template>

<script>
import Scroll from "../../components/common/scroll/Scroll.vue";
import CartNavBar from "./childComponents/CartNavBar.vue";
import CartGoodsList from "./childComponents/CartGoodsList.vue";
import CartCommit from "./childComponents/CartCommit.vue";

// import Vue from 'vue'
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import { Dialog, Toast } from "vant";
import Vue from 'vue'

Vue.use(Toast)
Vue.use(Dialog)


export default {
  components: { CartNavBar, Scroll, CartGoodsList, CartCommit },
  CartCommitname: "Cart",
  data() {
    return {
      price: 0
    };
  },
  // mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters(["cartList", "cartListLength"]),
    totalPrice() {
      return parseInt(
        this.cartList
          .filter(item => item.checked)
          .reduce((prev, item) => prev + item.price * item.count, 0)
          .toFixed(2) * 100
      );
    }
  },
  methods: {
    ...mapMutations(["clearCartList"]),
    deleteAll() {
      localStorage.clear();
      Toast("购物车以清空");
      this.$refs.commit.checked = false
      this.$store.commit("clearCartList");
    },
    goodSelected() {
      let isAllSelectedFlag = 1;
      this.cartList.forEach(item => {
        if (!item.checked) {
          isAllSelectedFlag = 0;
        }
      });
      if (isAllSelectedFlag === 0) {
        this.$refs.commit.checked = false;
      } else {
        this.$refs.commit.checked = true;
      }
    },
    allSelected() {
      this.cartList.forEach(item => {
        item.checked = !item.checked
      })
    },
    commitList() {
      Dialog.confirm({
        title:"温馨提示",
        message:"确定要提交订单吗"
      }).then(() => {
        this.$toast({
          type: "success",
          message: `支付成功，共计 ${this.totalPrice/100}元`,
          forbidClick: true,
          duration: 1500
        });
        setTimeout(() => {
          this.clearCartList()
          this.$refs.commit.checked = false
        }, 1500);
      }).catch(err => err)
    }
  },
  created() {
    let list = JSON.parse(localStorage.getItem("cartGoodsList")) || []
    if (list) {
      this.$store.commit("setCartGoodsList", list)
    }
  },

  activated() {
    this.$refs.scroll.refresh();
  }
};
</script>

<style scoped>
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 100px;
  left: 0px;
  right: 0px;
}
</style>
