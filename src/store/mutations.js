import {
  ADD_COUNTER,
  ADD_CART,
  SET_LOADING,
  CLEAR_CART_LIST,
  SET_CART_GOODS_LIST,
  DELETE_GOOD,
  SUB_COUNTER
} from './types'

import Vue from 'vue';
import {Toast} from 'vant';

Vue.use(Toast)
  // mutations唯一的目的修改state中的状态
  // mutations的每一个方法尽可能完成的事情比较单一
export default {
  [SET_LOADING](state, bol) {
    state.loading = bol
  },
  [ADD_COUNTER](state, payload) {
    payload.count++;
    Toast({
      type: 'success',
      message: `当前商品数量为${payload.count}`,
      // 弹框的时候禁止点击
      forbidClick: true,
      duration: 1500
    });
    localStorage.setItem('cartGoodsList',JSON.stringify(state.cartList))
  },
  [ADD_CART](state, payload) {
    state.cartList.push(payload),
    payload.checked = false,
    payload.count = 1,
    // 将变量state.cartlist存储到cartGoodsList字段
    localStorage.setItem('cartGoodsList',JSON.stringify(state.cartList))
  },
  [CLEAR_CART_LIST](state) {
    localStorage.removeItem('cartGoodsList')
    state.cartList = []
  },
  [SET_CART_GOODS_LIST](state, payload) {
    state.cartList = payload;
  },
  [DELETE_GOOD] (state, payload) {
    let index = state.cartList.findIndex(item => {
      if (item.id === payload.id) {
        return true
      }
    })
    state.cartList.splice(index, 1)
    if (state.cartList.length === 0) {
      localStorage.removeItem("cartGoodsList")
    }
  },
  [SUB_COUNTER] (state, payload) {
    payload.count--
    localStorage.setItem('cartGoodsList', JSON.stringify(state.cartList))
  }
}
