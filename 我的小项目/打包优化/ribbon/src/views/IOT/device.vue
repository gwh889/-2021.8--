<template>
<div id="device">
   <Breadcrumb :style="{margin: '16px 0'}">
      <BreadcrumbItem>IOT</BreadcrumbItem>
      <BreadcrumbItem>设备管理</BreadcrumbItem>
    </Breadcrumb>
    <div class="mainbody">
      <div class="equheader">
        <div class="equheader-box">
          <div class="equheader-body">
            <div>
              <div class="equheader-title">设备管理</div>
              <Select v-model="myppid" filterable style="width:280px;">
                <Option value>请选择产品</Option>
                <Option
                  v-for="item in firstprolist"
                  :value="item.ppid"
                  :key="item.ppid"
                >{{ item.name }}</Option>
              </Select>
            </div>
            <div class="equheared-num">
              <div class="eq-title">
                设备总数
                <Poptip trigger="hover" content="当前产品的设备总数">
                  <!-- <img src="/static/images/tip.png" class="modal-tip" style="top: 0"> -->
                </Poptip>
              </div>
              <div class="eq-num">{{pronum.allNum}}</div>
            </div>
            <div class="equheared-num">
              <div class="eq-title">
                <i style="background:#28BEE5;"></i>激活设备
                <Poptip trigger="hover" content="当前已激活的设备总数">
                  <!-- <img src="/static/images/tip.png" class="modal-tip" style="top: 0"> -->
                </Poptip>
              </div>
              <div class="eq-num">{{pronum.activeNum}}</div>
            </div>
            <div class="equheared-num">
              <div class="eq-title">
                <i style="background:#52C41A;"></i>当前在线
                <Poptip trigger="hover" content="当前在线的设备总数">
                  <!-- <img src="/static/images/tip.png" class="modal-tip" style="top: 0"> -->
                </Poptip>
              </div>
              <div class="eq-num">{{pronum.onlineNum}}</div>
            </div>
          </div>
          <Button class="refurbish" @click="replcelist">刷新</Button>
        </div>
        <div>
          <Tabs type="card" v-model="detailtype" :animated="false">
            <TabPane label="设备列表" name="1">
              <router-view v-if="detailtype == 1" ref="singlechild"></router-view>
            </TabPane>
            <TabPane label="批次管理" name="2">
              <router-view v-if="detailtype == 2"></router-view>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
</div>
</template>

<script>
// import { useaxios } from "@/assets/js/axios";
// import { url_api } from "@/assets/js/common";
import { mapState } from "vuex";

export default {
  data() {
    return {
      detailtype: "1",
      firstprolist: [],
      selectdeptid: "",
      myppid: "",
      allNum: this.$store.state.pronum.allNum,
      activeNum: this.$store.state.pronum.activeNum,
      onlineNum: this.$store.state.pronum.onlineNum
    };
  },
  methods: {
    getParams: function() {
      // 取到路由带过来的参数
      var ppid = this.$route.query.ppid;
      if (ppid) {
        // 将数据放在当前组件的数据内
        this.myppid = ppid;
      }
    },
    getdetail() {
      const _this = this;
      if (_this.detailtype == 1) {
        this.$router.replace({
          path: "/device/single",
          query: { ppid: this.myppid }
        });
      } else if (_this.detailtype == 2) {
        this.$router.replace({ path: "/device/batch" });
      }
    },
    getmyprolist() {
      // const _this = this;
      // useaxios
      //   .axios(
      //     this.$api.baseUrl +
      //       "/iext/back/IotController/chooseProductListAnaysis",
      //     {
      //       deptid: _this.selectdeptid
      //     },
      //     "get"
      //   )
      //   .then(function(res) {
      //     if (res.data.success === 1) {
      //       let list = res.data.body.list;
      //       _this.firstprolist = list;
      //     } else {
      //       _this.$Message.error(res.data.msg);
      //     }
      //   })
      //   .catch(function(error) {
      //     _this.$Message.error(error);
      //   });
    },
    // 刷新
    replcelist() {
      this.$refs.singlechild.getequlist();
    }
  },
  created() {
    this.getParams();
    let _this = this;
    const usertype = _this.$store.state.user.type;
    if (usertype == 1024) {
      _this.selectdeptid = _this.$store.state.user.cpid;
    }
    this.getmyprolist();
  },
  mounted() {
    this.getdetail();
  },
  watch: {
    myppid(value) {
      this.$refs.singlechild.ppid = value;
      this.$refs.singlechild.getequlist();
    },
    detailtype() {
      const _this = this;
      if (_this.detailtype == 1) {
        this.$router.replace({ path: "/device/single" });
      } else if (_this.detailtype == 2) {
        this.$router.replace({ path: "/device/batch" });
      }
    }
  },
  computed: mapState(["pronum"])
};
</script>

<style lang="scss" scoped>
$main-fam-jian: PingFang-jian;
$main-fam-block: PingFang-block;
$main-fam-bold: PingFang-bold;
$main-back: #f1f4f6; //背景颜色
$main-font-color: #263849; //字体颜色
$main-font-color-block: #304150;
$main-font-size: 14px; //字体大小
$menu-width: 200px; //目录宽度
$heard-height: 50px; //头部高度
$bread-color: #9fa9c4; //面包屑字体颜色
$content-header-back: #e4ebf1; //内容头部背景颜色
$content-header-height: 52px; //内容头部背景高度
$content-header-color: #314558; //内容头部颜色
$btn-blue-back: #2980b9; //蓝色按钮背景颜色
$btn-blue-color: #ffffff; //蓝色按钮背景颜色
$btn-blue-hover-color: #236fa1; //蓝色按钮经过背景颜色
$control-height: 36px; //控件高度
$table-header-back: #f7faff; //表格头部背景颜色
$table-tr-height: 56px; //表格tr高度
$table-tr-border: #dfe3e8; //表格tr border

.ivu-modal-body {
  .add-title {
    color: #7a8693;
    font-family: $main-fam-jian;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px; /*no*/
    div {
      flex: 1;
      height: 1px; /*no*/
      background: #d4d9dd;
      padding-left: 8px; /*no*/
    }
  }
}
.equheader {
  background: rgba(228, 235, 241, 1);
  border-radius: 2px 2px 0px 0px;
  padding-top: 16px;
  color: $content-header-color;
}
.equheader-box {
  display: flex;
  justify-content: space-between;
  padding: 0 24px 24px 16px;
  .equheader-body {
    display: flex;
  }
  refurbish {
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(249, 250, 251, 1) 100%
    );
    box-shadow: 0px 1px 0px 0px rgba(22, 29, 37, 0.05);
  }
}
.equheared-num {
  margin-left: 56px;
  border-left: 1px solid rgba(0, 0, 0, 0.15); /*no*/
  padding-left: 16px;
  .eq-title {
    font-size: 18px;
    img {
      width: 20px; /*no*/
      height: 20px; /*no*/
    }
    i {
      width: 6px;
      height: 6px;
      display: inline-block;
      border-radius: 3px;
      margin-right: 4px;
      position: relative;
      top: -2px;
    }
  }
  .eq-num {
    font-size: 20px;
    font-family: $main-fam-block;
    color: $main-font-color-block;
    font-weight: 500;
  }
}
.equheader-title {
  margin-bottom: 8px;
}
</style>
