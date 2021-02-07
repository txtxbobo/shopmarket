<template>
  <div class="profile">
    <nav-bar class="profile-bav-bar" style="background-color: #ff8189; color: #fff">
      <p slot="center">品购</p>
    </nav-bar>
    <login-state/>
    <info-list/>
    <profile-list/>
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar.vue'
import InfoList from './childComps/InfoList.vue'
import LoginState from './childComps/LoginState.vue'
import ProfileList from './childComps/ProfileList.vue'
  export default {
    name: "Profile",
    components: {
      NavBar,
      LoginState,
        ProfileList,
        InfoList
    }
  }
</script>

<style scoped>
  
</style>