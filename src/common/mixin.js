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