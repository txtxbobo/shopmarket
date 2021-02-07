import {debounce} from './utils';

export const imgListenerMixin = {
  data() {
    return {
      imgLoadListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 100)
    this.imgLoadListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.imgLoadListener)
    // console.log('我是混入的内容');
  },
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      // console.log("回到顶部");   直接调用组件的方法
      this.$refs.scroll.scrollTo(0, 0, 500);
      // console.log("回到顶部");
    },
  },
}