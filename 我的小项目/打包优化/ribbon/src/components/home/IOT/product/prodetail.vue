<template>
<div id="prodetail">
  <Breadcrumb :style="{margin: '16px 0'}">
      <BreadcrumbItem>设备管理</BreadcrumbItem>
      <BreadcrumbItem to="/product">产品管理</BreadcrumbItem>
      <BreadcrumbItem v-if="detailtype == 1">产品信息</BreadcrumbItem>
      <BreadcrumbItem v-if="detailtype == 2">消息通讯</BreadcrumbItem>
      <BreadcrumbItem v-if="detailtype == 3">功能定义</BreadcrumbItem>
    </Breadcrumb>
    <div class="mainbody">
      <div class="main-detail-heard">
        <div class="main-mytitle">{{map.name}}</div>
        <Tabs type="card" v-model="detailtype" :animated="false">
          <TabPane label="产品信息" name="1">
            <router-view v-if="detailtype == 1"></router-view>
          </TabPane>
          <TabPane label="消息通讯" name="2">
            <router-view v-if="detailtype == 2"></router-view>
          </TabPane>
          <TabPane label="功能定义" name="3">
            <router-view v-if="detailtype == 3"></router-view>
          </TabPane>
        </Tabs>
      </div>
    </div>
</div>
</template>

<script>
// import { useaxios } from "@/assets/js/axios";
// import { url_api } from "@/assets/js/common";

export default {
  data() {
    return {
      detailtype: '1',
      ppid: '',
      map: {}
    }
  },
  methods: {
    getParams: function() {
      // 取到路由带过来的参数
      var ppid = this.$route.query.ppid;
      // 将数据放在当前组件的数据内
      this.ppid = ppid;
    },
    getdetail() {
      const _this = this;
      if(_this.detailtype == 1){
        this.$router.replace({ path: '/product/proinfor', query: { ppid: _this.ppid}})
      }else if(_this.detailtype == 2){
        this.$router.replace({ path: '/product/promessage', query: { ppid: _this.ppid} })
      }else if(_this.detailtype == 3){
        this.$router.replace({ path: '/product/fundefin', query: { ppid: _this.ppid} })
      }
    },
    //获取详情
    getprodetail() {
      // const _this = this;
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + "/iext/back/ProductController/productInfo",
      //     {
      //       ppid: this.ppid
      //     },
      //     "get"
      //   )
      //   .then(function(res) {
      //     if (res.data.success === 1) {
      //       let map = res.data.body.map;
      //       _this.map = map;
      //     } else {
      //       _this.$Message.error(res.data.msg);
      //     }
      //   })
      //   .catch(function(error) {
      //     _this.$Message.error(error);
      //   });
    },
  },
  watch: {
    detailtype(val) {
      console.log(val);
      const _this = this;
      if(_this.detailtype == 1){
        this.$router.replace({ path: '/product/proinfor', query: { ppid: _this.ppid} })
      }else if(_this.detailtype == 2){
        this.$router.replace({ path: '/product/promessage', query: { ppid: _this.ppid} })
      }else if(_this.detailtype == 3){
        this.$router.replace({ path: '/product/fundefin', query: { ppid: _this.ppid} })
      }
    }
  },
  created() {
    this.getParams();
    this.getprodetail();
  },
  mounted() {
    this.getdetail();
  }
};
</script>

<style lang="scss">
$main-fam-jian: PingFang-jian;
$main-fam-block: PingFang-block;
$main-fam-bold: PingFang-bold;
$main-back: #f1f4f6; //背景颜色
$main-font-color: #263849; //字体颜色
$main-font-color-block: #333333;
$main-font-size: 14px; //字体大小
$infor-row-height: 56px;
$infor-blue-text: #2980b9;

.detail-search {
  display: flex;
  justify-content: space-between;
  .detail-title {
    padding: 0 24px;
    font-family: $main-fam-bold;
  }
}
.infor-table {
  margin-top: 16px;
}
</style>

