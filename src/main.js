import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './registerServiceWorker'
// 图片懒加载
import lazyload from "vue-lazyload";
import fastclick from "fastclick";

import {Toast} from "vant";
Vue.use(Toast)
Vue.config.productionTip = false
// loading: 占位图
Vue.use(lazyload, {
  loading: require("./assets/img/common/placeholder.png")
});
// 事件总线   bus 将GoodsListItem.vue中的事件传入到Home.vue中
Vue.prototype.$bus = new Vue()
// 解决移动端300毫秒延迟的问题
fastclick.attach(document.body);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
