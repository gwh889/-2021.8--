<template>
<div id="equdetail">
   <Breadcrumb :style="{margin: '16px 0'}">
      <BreadcrumbItem>设备管理</BreadcrumbItem>
      <BreadcrumbItem to="/device/single">设备列表</BreadcrumbItem>
      <BreadcrumbItem v-if="detailtype == 1">设备信息</BreadcrumbItem>
      <BreadcrumbItem v-if="detailtype == 2">Topic列表</BreadcrumbItem>
      <BreadcrumbItem v-if="detailtype == 3">运行状态</BreadcrumbItem>
      <BreadcrumbItem v-if="detailtype == 4">事件管理</BreadcrumbItem>
      <BreadcrumbItem v-if="detailtype == 5">服务调用</BreadcrumbItem>
      <BreadcrumbItem v-if="detailtype == 6">子设备管理</BreadcrumbItem>
    </Breadcrumb>
    <div class="mainbody">
      <div class="main-detail-heard">
        <div class="main-mytitle">{{map.devicename}} <span
            class="equstatus"
            v-show="map.status == 1"
          >在线</span>
          <span
            class="equstatus"
            v-show="map.status == 2"
          >离线</span>
          <span
            class="equstatus"
            v-show="map.status == 3"
            style="background-color: #d3d3d3;"
          >未激活</span></div>
        <Tabs
          type="card"
          v-model="detailtype"
          :animated="false"
        >
          <TabPane
            label="设备信息"
            name="1"
          >
            <router-view v-if="detailtype == 1"></router-view>
          </TabPane>
          <TabPane
            label="Topic列表"
            name="2"
          >
            <router-view v-if="detailtype == 2"></router-view>
          </TabPane>
          <TabPane
            label="运行状态"
            name="3"
          >
            <router-view v-if="detailtype == 3"></router-view>
          </TabPane>
          <TabPane
            label="事件管理"
            name="4"
          >
            <router-view v-if="detailtype == 4"></router-view>
          </TabPane>
          <TabPane
            label="服务调用"
            name="5"
          >
            <router-view v-if="detailtype == 5"></router-view>
          </TabPane>
          <TabPane
            label="子设备管理"
            name="6"
            v-if="map.nodetype == 2"
          >
            <router-view v-if="detailtype == 6"></router-view>
          </TabPane>
        </Tabs>
      </div>
    </div>
</div>
</template>

<script>
// import { useaxios } from '@/assets/js/axios'
// import { url_api } from '@/assets/js/common'
export default {
  data () {
    return {
      detailtype: '1',
      pdid: '',
      map: {}
    }
  },
  methods: {
    getParams: function () {
      // 取到路由带过来的参数
      var pdid = this.$route.query.pdid
      // 将数据放在当前组件的数据内
      this.pdid = pdid
      // 取到路由带过来的参数
      var detailtype = this.$route.query.detailtype
      if (detailtype) {
        this.detailtype = detailtype.toString()
      }
    },
    getdetail () {
      const _this = this
      if (_this.detailtype == 1) {
        this.$router.replace({
          path: '/device/equinfor',
          query: { pdid: _this.pdid }
        })
      } else if (_this.detailtype == 2) {
        this.$router.replace({
          path: '/device/topiclist',
          query: { pdid: _this.pdid }
        })
      } else if (_this.detailtype == 3) {
        this.$router.replace({
          path: '/device/equstatus',
          query: { pdid: _this.pdid }
        })
      } else if (_this.detailtype == 4) {
        this.$router.replace({
          path: '/device/eventlist',
          query: { pdid: _this.pdid }
        })
      } else if (_this.detailtype == 5) {
        this.$router.replace({
          path: '/device/equservice',
          query: { pdid: _this.pdid }
        })
      } else if (_this.detailtype == 6) {
        this.$router.replace({
          path: '/device/equchild',
          query: { pdid: _this.pdid }
        })
      }
    },
    // 获取详情
    getequdetail () {
      // const _this = this
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + '/iext/back/DeviceController/deviceInfo',
      //     {
      //       pdid: this.pdid
      //     },
      //     'get'
      //   )
      //   .then(function (res) {
      //     if (res.data.success === 1) {
      //       let map = res.data.body.map
      //       _this.map = map
      //     } else {
      //       _this.$Message.error(res.data.msg)
      //     }
      //   })
      //   .catch(function (error) {
      //     _this.$Message.error(error)
      //   })
    }
  },
  watch: {
    detailtype () {
      const _this = this
      if (_this.detailtype == 1) {
        this.$router.replace({
          path: '/device/equinfor',
          query: { pdid: _this.pdid }
        })
      } else if (_this.detailtype == 2) {
        this.$router.replace({
          path: '/device/topiclist',
          query: { pdid: _this.pdid }
        })
      } else if (_this.detailtype == 3) {
        this.$router.replace({
          path: '/device/equstatus',
          query: { pdid: _this.pdid }
        })
      } else if (_this.detailtype == 4) {
        this.$router.replace({
          path: '/device/eventlist',
          query: { pdid: _this.pdid }
        })
      } else if (_this.detailtype == 5) {
        this.$router.replace({
          path: '/device/equservice',
          query: { pdid: _this.pdid }
        })
      } else if (_this.detailtype == 6) {
        this.$router.replace({
          path: '/device/equchild',
          query: { pdid: _this.pdid }
        })
      }
    }
  },
  created () {
    this.getParams()
    this.getequdetail()
  },
  mounted () {
    this.getdetail()
  }
}
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
    font-weight: 600;
  }
}
.infor-table {
  margin-top: 16px;
}
.equstatus {
  background: #bbe5b3;
  border: 2px solid #ffffff;
  display: inline-block;
  width: 68px;
  height: 20px;
  border-radius: 100px;
  text-align: center;
  line-height: 18px;
  font-size: 13px;
  font-family: $main-fam-jian;
  font-weight: 400;
  margin-left: 16px;
}
</style>
