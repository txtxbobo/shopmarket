<template>
  <div class="commont-info" v-if="Object.keys(commontInfo).length !== 0">
    <div class="commont-info-top">
      <span class="commont-info-title">用户评价</span>
      <span class="commont-info-more">更多 ></span>
    </div>
    <div class="commont-info-main">
      <div class="main-top">
        <div class="user-logo">
          <img :src="commontInfo.user.avatar" alt="">
          <span class="shop-name">{{ commontInfo.user.uname}}</span>
        </div>
      </div>
      <div class="main-middle">
        <div class="main-middle-content">
          <span>{{ commontInfo.content}}</span>
        </div>
        <div class="main-middle-other">
          <span>{{commontInfo.created | showDate}}</span>
          <span>{{commontInfo.style}}</span>
        </div>
      </div>
      <div class="main-bottom">
        <img v-for="(item,index) in commontInfo.images" :src="item" :key="index" alt="">
      </div>
    </div>
  </div>
</template>

<script>
// 导入时间格式化函数
import {formatDate} from '../../../common/utils'

export default {
  name: 'DetailCommontInfo',
  data() {
    return {}
  },
  props: {
    commontInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {},
  filters: {
    showDate(value) {
      const date = new Date(value * 1000)
      return formatDate(date,'yyy-MM-dd hh:mm:ss')
    }
  }
}
</script>

<style scoped>
  .commont-info {
    padding-left: 15px;
    color: #333333;
  }
  .commont-info-top {
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }
  .commont-info-title {
    font-size: 15px;
    float: left;
  }
  .commont-info-more {
    float: right;
    margin-right: 15px;
    font-size: 13px;
  }
  .user-logo {
    display: flex;
    align-items: center;
    line-height: 42px;
    padding-top: 10px;
    padding-bottom: 5px;
    text-align: center;
  }
  .user-logo img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }
  .user-logo span {
    margin-left: 10px;
    color: #333333;
  }
  .main-middle {
    padding-top: 5px;
    padding-bottom: 10px;
    /* justify-content: space-around; */
  }
  .main-middle-content span {
    color: #777777;
    font-size: 14px;
    line-height: 1.5;
  }
  .main-bottom {
    padding-bottom: 10px;
  }

  .main-bottom img {
    width: 70px;
    height: 70px;
    padding-right: 5px;
  }
  .main-middle-other {
    padding-top: 5px;
  }

  .main-middle-other span {
    margin-right: 5px;
    color: #999999;
    font-size: 12px;
  }

</style>
