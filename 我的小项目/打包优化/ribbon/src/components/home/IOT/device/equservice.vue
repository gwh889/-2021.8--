<template>
  <div>
    <div class="detail-search">
      <div class="search-body">
        <Input
          prefix="ios-search"
          placeholder="请输入服务标识符"
          style="width:240px"
          v-model="tag"
          @on-enter="searchTags"
          @on-blur="searchTags"
        />
        <Select v-model="time" style="width:108px" @on-change="changeTime">
          <Option :value="1">1小时</Option>
          <Option :value="2">24小时</Option>
          <Option :value="3">7天</Option>
          <Option :value="4">自定义</Option>
        </Select>
        <el-date-picker
          v-show="time == 4"
          v-model="twotime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="selectDate"
        ></el-date-picker>
      </div>
      <div>
        <Button class="white-btn" @click="refresh">刷新</Button>
      </div>
    </div>
    <div class="infor-table">
      <Table :columns="columns1" :data="data1"></Table>
    </div>
    <div class="main-page" v-show="showPage">
      <Page
        :total="total"
        show-sizer
        show-elevator
        show-total
        v-model="showPage"
        @on-change="pagenumberchange"
        @on-page-size-change="pagesizechange"
      />
    </div>
    <!-- 发布消息弹窗 -->
    <Modal
      v-model="messagemodal"
      title="服务设置"
      :loading="true"
      width="634"
      :mask-closable="false"
      @on-ok="handleSubmit('formValidate')"
    >
      <Checkbox v-model="single" style="color: #333; font-size: 14px;">设备告警并发送消息给管理员。</Checkbox>
    </Modal>
  </div>
</template>

<script>
// import { useaxios } from "@/assets/js/axios.js";
// import { url_api } from "@/assets/js/common";
// import { format_time } from "@/assets/js/common.js";

export default {
  data() {
    return {
      single: false,
      time: 1,
      twotime: "",
      messagemodal: false, //删除弹窗
      columns1: [
        {
          title: "时间",
          key: "createTime",
          tooltip: true,
          width: 250,
          minWidth: 250
        },
        {
          title: "标识符",
          key: "tag",
          tooltip: true,
          width: 250,
          minWidth: 250
        },
        {
          title: "服务名称",
          key: "pfname",
          tooltip: true
        },
        {
          title: "输入参数",
          key: "pmin",
          tooltip: true
        },
        {
          title: "输出参数",
          key: "pmax",
          tooltip: true
        },
        {
          title: "操作",
          key: "id",
          render: (h) => {
            return h("div", [
              h(
                "Button",
                {
                  class: 'clickable',
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "#2980B9",
                    padding: "0",
                    margin: "0 24px 0 0"
                  },
                  on: {
                    click: () => {
                      this.messagemodal = true;
                    }
                  }
                },
                "设置"
              )
            ]);
          }
        }
      ],
      data1: [
        /* {
          createTime: 2017 - 1 - 12,
          tag:
            "/sys/a1u3TKJkoJt/${deviceName}/thing/event/property/post",
          pfname: "温度过高，发送通知",
          pmin: 1,
          pmax: 2,
          id: 1
        } */
      ],
      tag: "",
      pdid: "",
      type: null,
      minTime: "",
      maxTime: "",
      total: 0,
      showPage: false,
      pageNum: 1,
      pageSize: 10
    };
  },
  methods: {
    getParams: function() {
      var pdid = this.$route.query.pdid;
      this.pdid = pdid;
    },
    selectDate() {
      this.minTime = this.twotime[0];
      this.maxTime = this.twotime[1];
      this.type = 4;
      this.getServicelist();
    },
    searchTags() {
      this.getServicelist();
    },
    changeTime() {
      if (this.time != 4) {
        this.type = this.time;
        this.minTime = "";
        this.maxTime = "";
        this.getServicelist();
      }
    },
    //获取事件列表
    getServicelist() {
      // var params = {
      //   tag: this.tag,
      //   pdid: this.pdid,
      //   type: this.type,
      //   minTime: this.minTime,
      //   maxTime: this.maxTime,
      //   functionType: 2
      // };
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + "/iext/back/DeviceController/functionList",
      //     params,
      //     "get"
      //   )
      //   .then(res => {
      //     if (res.data.success == 1) {
      //       var list = res.data.body.list;
      //       this.total = list.total;
      //       this.pageNum = list.pageNum;
      //       this.pageSize = list.pageSize;
      //       var result = list.result;
      //       if (result.length > 0) {
      //         this.data1 = result.map(item => {
      //           var time = format_time(item.createTime, "time");
      //           item.createTime = time;
      //           return item;
      //         });
      //         this.showPage = true;
      //       } else {
      //         this.data1 = [];
      //         this.showPage = false;
      //       }
      //     } else {
      //       this.$Message.error(res.data.msg);
      //     }
      //   });
    },
    //刷新
    refresh() {},
    //修改每页条数
    pagesizechange(pagesize) {
      this.pageSize = pagesize;
      this.pageNum = 1;
      // this.getevenlist();
    },
    //修改页码
    pagenumberchange(pagenum) {
      this.pageNum = pagenum;
      // this.getevenlist();
    }
  },
  created() {
    this.getParams();
  },
  mounted() {
    this.getServicelist({
      pdid: this.pdid,
      functionType: 2
    });
  }
};
</script>

<style lang="scss" scoped>
$main-fam-jian: PingFang-jian;
$main-fam-block: PingFang-block;
$main-fam-bold: PingFang-bold;
$main-back: #f1f4f6; //背景颜色
$main-font-color: #263849; //字体颜色
$main-font-color-block: #333333;
$main-font-size: 14px; //字体大小
$main-font-height: 20px; //字体高度
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
$tip-color: #7a8693;
$infor-blue-text: #2980b9;
$input-disable-back: #f9fafb;

.message-basic {
  margin: 14px 0 24px 0;
  font-weight: 500;
  font-family: $main-fam-block;
  color: $main-font-color-block;
  .message-title {
    margin-right: 16px;
  }
}
.el-range-editor.el-input__inner {
  height: $control-height; /*no*/
}
.search-body {
  display: flex;
  align-items: center;
  width: 100%;
  & > div,
  & > button {
    margin-right: 8px;
  }
}
</style>

