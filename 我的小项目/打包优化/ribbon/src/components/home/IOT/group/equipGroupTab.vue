<template>
<div id="equipGroupTab">
   <Breadcrumb :style="{margin: '16px 0'}">
      <BreadcrumbItem>设备管理</BreadcrumbItem>
      <BreadcrumbItem>分组管理</BreadcrumbItem>
      <BreadcrumbItem v-if="detailtype == 1">设备信息</BreadcrumbItem>
      <BreadcrumbItem v-if="detailtype == 2">设备列表</BreadcrumbItem>
      <BreadcrumbItem v-if="detailtype == 3">子分组列表</BreadcrumbItem>
    </Breadcrumb>
    <div class="mainbody">
      <div class="main-detail-heard">
        <div class="main-mytitle">{{ tableData.pgName }}</div>
        <div class="group-header">
          <div class="group-header-box">
            <div class="group-header-num">
              <div class="g-title">
                <span class="g-subtitle">设备总数:</span>
                <span class="g-num">{{ map.allNum }}</span>
                <!-- <img src="/static/images/tip.png" class="modal-tip" style="top: 0"> -->
              </div>
            </div>
            <div class="group-header-num">
              <div class="g-title">
                <i style="background:#28BEE5;"></i>
                <span class="g-subtitle">激活设备:</span>
                <span class="g-num">{{ map.activateNum }}</span>
                <!-- <img src="/static/images/tip.png" class="modal-tip" style="top: 0"> -->
              </div>
            </div>
            <div class="group-header-num">
              <div class="g-title">
                <i style="background:#52C41A;"></i>
                <span class="g-subtitle">当前在线:</span>
                <span class="g-num">{{ map.onlineNum }}</span>
                <!-- <img src="/static/images/tip.png" class="modal-tip" style="top: 0"> -->
              </div>
            </div>
          </div>
        </div>
        <Tabs
          type="card"
          v-model="detailtype"
          @on-click="getTabIndex(detailtype)"
          :animated="false"
        >
          <TabPane label="设备信息" name="1">
            <router-view v-if="detailtype == 1"></router-view>
          </TabPane>
          <TabPane label="设备列表" name="2">
            <router-view v-if="detailtype == 2"></router-view>
          </TabPane>
          <TabPane label="子分组列表" name="3">
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
      detailtype: "1",
      pgid: "",
      name: "",
      map: {},
      tableData: {}
    };
  },
  methods: {
    getParams: function() {
      // 取到路由带过来的参数
      this.pgid = this.$route.query.pgid;
      this.name = this.$route.query.name;
    },
    getTabIndex(index) {
      window.sessionStorage.setItem("detailType", index);
      console.log(window.sessionStorage.getItem("detailType"));
    },
    getHeaderData() {
      // const _this = this;
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + "/iext/back/GroupController/groupInfo",
      //     {
      //       pgid: _this.pgid
      //     },
      //     "get"
      //   )
      //   .then(function(res) {
      //     if (res.data.success === 1) {
      //       let resultData = res.data.body;
      //       _this.map = resultData;
      //       _this.tableData = resultData.pubgroup;
      //     } else {
      //       _this.$Message.error(res.data.msg);
      //     }
      //   })
      //   .catch(function(error) {
      //     _this.$Message.error(error);
      //   });
    },
    getdetail() {
      const _this = this;
      if (_this.detailtype === "1") {
        this.$router.replace({
          path: "/group/equipDetail",
          query: { pgid: _this.pgid }
        });
      } else if (_this.detailtype === "2") {
        this.$router.replace({
          path: "/group/equipmentList",
          query: {
            pgid: _this.pgid,
            name: _this.name
          }
        });
      } else if (_this.detailtype === "3") {
        this.$router.replace({
          path: "/group/childGroupList",
          query: { pgid: _this.pgid }
        });
      }
    }
  },
  watch: {
    detailtype() {
      const _this = this;
      if (_this.detailtype === "1") {
        this.$router.replace({
          path: "/group/equipDetail",
          query: { pgid: _this.pgid }
        });
      } else if (_this.detailtype === "2") {
        this.$router.replace({
          path: "/group/equipmentList",
          query: {
            pgid: _this.pgid,
            name: _this.name
          }
        });
      } else if (_this.detailtype === "3") {
        this.$router.replace({
          path: "/group/childGroupList",
          query: { pgid: _this.pgid }
        });
      }
    }
  },
  created() {
    this.getParams();
    this.getHeaderData();
    if (!window.sessionStorage.getItem("detailType")) {
      this.detailtype = "1";
    } else {
      this.detailtype = window.sessionStorage.getItem("detailType");
    }
  },
  mounted() {},
  destroyed() {
    window.sessionStorage.removeItem('detailType')
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

.main-mytitle {
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(49, 69, 88, 1);
}
.group-header {
  .group-header-box {
    box-sizing: border-box;
    padding: 0 16px;
    display: flex;
    margin-bottom: 33px;
    .group-header-num {
      margin-right: 86px;
      .g-title {
        display: flex;
        align-items: center;
        i {
          width: 6px;
          height: 6px;
          border-radius: 3px;
          background: rgba(40, 190, 229, 1);
          margin-right: 10px;
        }
        .g-subtitle {
          font-size: 18px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(49, 69, 88, 1);
        }
        .g-num {
          font-size: 18px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.85);
        }
      }
    }
  }
}

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
