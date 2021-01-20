import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './registerServiceWorker'

Vue.config.productionTip = false
// 事件总线   bus 将GoodsListItem.vue中的事件传入到Home.vue中

Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
