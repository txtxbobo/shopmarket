import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
const Home = () => import('../views/home/Home')
const Cart = () => import('../views/cart/Cart')
const Category = () => import('../views/category/Category')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')
// 使用router
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    // 默认路径
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      showTab: true
    }
  },
  {
    path: '/category',
    component: Category,
    meta: {
      showTab: true
    }
  },
  {
    path: '/cart',
    component: Cart,
    meta: {
      showTab: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      showTab: true
    }
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
