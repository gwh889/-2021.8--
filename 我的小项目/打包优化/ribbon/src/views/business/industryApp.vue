<template>
  <div id="industryApp">
    <!-- <div class="search">
      <el-input v-model="search" placeholder="请输入企业名称搜索"></el-input>
      <el-button type="primary">搜索</el-button>
    </div> -->

    <div class="app">
      <div v-for="item in appList" :key="item.daId">
        <div class="app_title">{{ item.daName }}</div>
        <ul>
          <li v-for="i in item.sonApp" :key="i.daId">
            <router-link
              :to="{
                name: 'app',
                params: { url: i.daUrl },
              }"
            >
              <div class="iconImg">
                <!-- <div :class="i.daCron"></div> -->
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="i.daIcon"></use>
                </svg>
              </div>
              <div class="name">{{ i.daName }}</div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: "",
      appList: [],
    };
  },
  created() {
    this.getApp();
  },
  methods: {
    getApp() {
      this.axios({
        method: "get",
        url: "/dtsum/app/appController/getAppList",
      })
        .then((res) => {
          if (res.data.success === 1) {
            console.log(res);
            
            var user = JSON.parse(sessionStorage.getItem("user"));
            this.appList = res.data.body.appList;
            for (let i = 0; i < this.appList.length; i++) {
              for (let j = 0; j < this.appList[i].sonApp.length; j++) {
                this.appList[i].sonApp[j].daUrl =
                  user.duHost + this.appList[i].sonApp[j].daUrl;
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
#industryApp {
  font-family: Source Han Sans CN;
  text-align: left;
  .search {
    width: 712px;
    border-bottom: 1px solid #dcdada;
    padding-bottom: 31px;
    .el-input {
      width: 510px;
      margin-right: 30px;
    }
  }
  .app {
    .app_title {
      margin: 20px 0px;
      font-size: 16px;
      font-weight: 500;
      color: #333333;
    }
    li {
      display: inline-block;
      margin-right: 60px;
      .iconImg {
        width: 64px;
        height: 64px;
        line-height: 64px;
        background: #ffffff;
        box-shadow: 0px 5px 10px rgba(124, 124, 124, 0.16);
        border-radius: 50%;
        text-align: center;
        div {
          width: 100%;
          height: 100%;
        }
      }
      .name {
        margin-top: 14px;
        font-size: 14px;
        color: #333333;
        text-align: center;
      }
    }
  }
}
</style>
