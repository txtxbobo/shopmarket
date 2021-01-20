<template>
  <div class="top-data">
    <div class="top-list-item" v-for="(item, index) in mainTopDataList" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <p>{{item.title}}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryTop',
  data() {
    return {
      
    }
  },
  props: {
    mainTopDataList: {
      type: Array,
      default() {

      }
    }
  },
  components: {}
}
</script>

<style scoped>
  .top-data {
    display: flex;
    /* background-color: aqua; */
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
  }
  .top-list-item {
    text-align: center;
    margin: 5px;
    width: 65px;
    height: 100px;
    align-items: center;
    flex-direction: column;
  }
  .top-list-item img {
    width: 65px;
    height: 65px;
  }
  .top-list-item p {
    font-size: 14px;
    margin-top: 5px;
  }
</style>