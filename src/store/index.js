import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 使用插件
Vue.use(Vuex)

const state = {
  cartList: [],
  loading: true
}
export default new Vuex.Store({
  state,  
  mutations,
  actions,
  getters,
  modules: {
  }
})
  // mutations:{
  //   // mutations唯一的目的修改state中的状态
  //   // mutations的每一个方法尽可能完成的事情比较单一
  //   addCounter(state, payload) {
  //     payload.count ++
  //   },
  //   addCart(state, payload) {
  //     state.cartList.push(payload)
  //   }
  // },
  // actions: 
  // {
  //   // actions的第一个参数是context
  //   addCart(context, payload) {
  //     // state.cartList.push(payload)
  //     // 查找之前数组中是否有该商品   find函数
  //     let oldProduct = context.state.cartList.find(item => item.id === payload.id )
  //     if (oldProduct) {
  //       // oldProduct.count += 1
  //       context.commit('addCounter', oldProduct)
  //     } else {
  //       payload.count = 1
  //       // context.state.cartList.push(payload)
  //       context.commit('addCart', payload)
  //     }
  //   }
  // },
  

