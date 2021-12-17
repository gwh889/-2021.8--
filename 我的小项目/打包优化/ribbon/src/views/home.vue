<template>
  <div id="home">
    <Header />
    <el-container>
      <Slider v-if="user!==''" />
      <el-main>
        <div class="main">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from "../components/index/header.vue";
import Slider from "../components/home/slider.vue";

export default {
  name: "home",
  components: {
    Header,
    Slider,
  },
  data(){
    return{
      user:''
    }
  },
  created(){
    if(JSON.parse(sessionStorage.getItem('user'))){
      this.user=JSON.parse(sessionStorage.getItem('user')).duId
    }
  }
};
</script>
<style lang="scss" scoped>
#home {
  .main {
    margin: 10px 40px 11px 20px;
  }
}
</style>
