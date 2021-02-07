import {
  SET_CART_DATA,
  DELETE_GOOD_DATA,
} from './types'




export default {
  [SET_CART_DATA] ({state,commit}, payload) {
    let cartList = JSON.parse(localStorage.getItem('cartGoodsList')) || []

    if (cartList) {
      state.cartList = cartList
      // 查找购物车列表是否以含有当前数据
      let findGoods = state.cartList.find(item => item.id === payload.id)
      if (findGoods) {
        // 如果已有数据，则执行addCounter
        commit('addCounter', findGoods)
      } else {
        // 如果没有数据，则执行addCart
        commit('addCart', payload)
      }
    } else {
      commit('addCart', payload)
    }
  },
  [DELETE_GOOD_DATA] ({state, commit}, payload) {
    // 查找购物车中是否有当前数据
    let findGoods = {}
    state.cartList.forEach(item => {
      if (item.id === payload.id) {
        findGoods = item
      }
    })
    if (findGoods.count > 1) {
      commit('subCounter', findGoods)
    } else {
      commit('deleteGood', findGoods)
    }
  }
};
