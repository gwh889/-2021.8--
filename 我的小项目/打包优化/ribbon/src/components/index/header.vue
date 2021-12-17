<template>
  <div id="header">
    <router-link :to="{ name: 'index' }">
      <div class="title">
        <img src="../../assets/images/icon/logo.png" alt="" />
        <span>线带纺织⾏业⼯业互联⽹平台</span>
      </div>
    </router-link>
    <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
      <!-- <el-menu-item :index="index1">IOT平台</el-menu-item>
      <el-menu-item :index="index2">应用中心</el-menu-item> -->
      <el-menu-item index="/platformTroduce">织造数字车间管控系统</a></el-menu-item>
      <el-tooltip
        content="研发中，敬请期待"
        placement="bottom"
        popper-class="atooltip"
      >
        <el-menu-item index="4" disabled> 采购平台</el-menu-item>
      </el-tooltip>
      <el-tooltip
        content="研发中，敬请期待"
        placement="bottom"
        popper-class="atooltip"
      >
        <el-menu-item index="5" disabled>电商平台</el-menu-item>
      </el-tooltip>
      <el-tooltip
        content="研发中，敬请期待"
        placement="bottom"
        popper-class="atooltip"
      >
        <el-menu-item index="6" disabled>共享制造</el-menu-item>
      </el-tooltip>
      <el-submenu index="7">
        <template slot="title">开发者中心</template>
        <el-menu-item><a target="blank" href="http://fzxd.dtsum.com/resource/IoT开发者文档.pdf">开发者文档</a></el-menu-item>
        <!-- <el-menu-item index="7-2">移动端开发平台</el-menu-item> -->
      </el-submenu>
      <el-submenu v-if="user" class="username" index="8">
        <template slot="title"><span :title="user.duName">{{ user.duName }}</span></template>
         <el-menu-item v-if="user&&user.duType===2" @click="toBusiness">控制台</a></el-menu-item>
         <el-menu-item v-if="user&&user.duType===1" index="/manage/manageCockpit">控制台</el-menu-item>
      <el-menu-item v-if="!user">控制台</el-menu-item>
        <el-menu-item @click="loginout">退出</el-menu-item>
      </el-submenu>
      <el-menu-item v-else index="8">
        <router-link :to="{ name: 'login' }">
          <el-button type="primary">登 录</el-button>
        </router-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "header",
  data() {
    return {
      activeIndex: "1",
      user: {},
      index1:"",
      index2:"",
      index3:""
    };
  },
  created() {
    this.getUserMessage();
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    getUserMessage() {
      this.user = JSON.parse(sessionStorage.getItem("user"));
      if(this.user!==null){
        this.index1="/product";
        this.index2="/cloudMes";
        if(this.user.duType===2){
          this.index3=this.user.doHost+'/index'
        }else{
          this.index3="/manage/manageCockpit";
        }
      }else{
        this.index1="/login";
        this.index2="/login";
        this.index3="/login";
      }
    },
    loginout() {
      sessionStorage.clear();
      if (this.$route.path === "/index") {
        window.location.reload();
        // this.$message.warning('正在退出')
      } else {
        this.$router.push({ path: "/" });
      }
    },
    toBusiness(){
      window.open('_blank').location=this.user.duHost+'/index';
    }
  },
};
</script>
<style lang="scss" scoped>
#header {
  display: flex;
  justify-content: space-between;
  height: 64px;
  line-height: 64px;
  box-shadow: 0px 5px 10px rgba(124, 124, 124, 0.1);
  .title {
    font-size: 24px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #2165ed;
    margin-left: 30px;
    letter-spacing: 2px;
    img {
      margin-right: 12px;
      transform: translateY(-2px);
    }
  }
  .el-menu-demo {
    margin-right: 30px;
    vertical-align: bottom;
    .el-menu-item{
      &:nth-child(4):hover{
        color:#999999;
      }
       &:nth-child(5):hover{
        color:#999999;
      }
       &:nth-child(6):hover{
        color:#999999;
      }
    }
  }
  .el-menu.el-menu--horizontal {
    border: none;
  }
}
</style>
<style lang="scss">
#header {
  .el-menu--horizontal > .el-submenu .el-submenu__title {
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #333333;
    opacity: 1;
  }
  .el-menu--horizontal > .el-submenu .el-submenu__title:hover {
    color: #1e90ff;
  }
  .el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
    border: none;
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #1e90ff;
    opacity: 1;
  }

  .el-menu--horizontal > .el-menu-item {
    border: none;
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #333333;
    opacity: 1;
  }
  .el-menu--horizontal .el-menu-item:hover {
    color: #1e90ff;
  }
  .el-menu--horizontal > .el-menu-item.is-active {
    border: none;
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #1e90ff;
    opacity: 1;
  }
  .username {
    .el-submenu__title {
      max-width: 150px;
      color: #1e90ff !important;
      text-overflow:ellipsis;
      overflow:hidden;
    }
  }
}
</style>
