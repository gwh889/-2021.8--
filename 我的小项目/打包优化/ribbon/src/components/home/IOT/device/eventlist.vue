<template>
  <div>
    <div class="detail-search">
      <div class="search-body">
        <Input
          prefix="ios-search"
          placeholder="请输入事件标识符"
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
      <Table :columns="columns1" :data="data1" @on-sort-change="sortEvents">
        <template slot-scope="{ row }" slot="header">{{row.pfname}}</template>
      </Table>
    </div>
    <div class="main-page" v-show="showPage">
      <Page
        :total="total"
        show-sizer
        show-elevator
        show-total
        @on-change="pagenumberchange"
        @on-page-size-change="pagesizechange"
      />
    </div>
  </div>
</template>

<script>
// import { useaxios } from "@/assets/js/axios.js";
// import { url_api, format_time } from "@/assets/js/common";

export default {
  data() {
    const _this = this;
    return {
      showPage: false,
      time: 1,
      twotime: "",
      total: 0,
      pageNum: 1,
      pageSize: 10,
      columns1: [
        {
          title: "时间",
          key: "createTime",
          tooltip: true,
          sortable: true
        },
        {
          title: "标识符",
          key: "tag",
          tooltip: true
        },
        {
          title: "事件名称",
          key: "pfname",
          tooltip: true
        },
        {
          title: "事件类型",
          key: "status",
          tooltip: true,
          renderHeader: (h) => {
            const arr = [
              {
                label: "信息",
                value: 1
              },
              {
                label: "告警",
                value: 2
              },
              {
                label: "故障",
                value: 3
              }
            ];
            return h("div", [
              h("span", {}, "事件类型"),
              h(
                "Dropdown",
                {
                  props: {
                    transfer: true
                  },
                  on: {
                    "on-click": name => {
                      _this.eventType = name;
                    }
                  }
                },
                [
                  h("Icon", {
                    props: {
                      type: "ios-funnel"
                    },
                    attrs: {
                      style: "margin-left:8px;cursor:pointer;"
                    },
                    style: {
                      color: _this.selectcolor
                    }
                  }),
                  h("DropdownMenu", { slot: "list" }, [
                    h(
                      "DropdownItem",
                      {
                        props: {
                          name: ""
                        }
                      },
                      "全部"
                    ),
                    arr.map(function(item) {
                      return h(
                        "DropdownItem",
                        {
                          props: {
                            name: item.value,
                            selected: item.value == _this.eventType
                          }
                        },
                        item.label
                      );
                    })
                  ])
                ]
              )
            ]);
          },
          render: (h, params) => {
            const status = params.row.status;
            var text1
            if (status === 1) {
              text1 = "信息";
            } else if (status === 2) {
              text1 = "告警";
            } else if (status === 2) {
              text1 = "故障";
            }
            return h("div", [h("span", {}, text1)]);
          }
        },
        {
          title: "输出参数",
          key: "dataformat",
          tooltip: true
        }
      ],
      data1: [
        /* {
          createTime: "2018-2-12",
          paratype: 1,
          pfname: "灯泡温度过高",
          dataformat: "一段参数"，
          tag: '标识符'
        }*/
      ],
      minTime: null,
      maxTime: null,
      pdid: null,
      tag: null,
      eventType: null,
      sort: null,
      type: null,
      selectcolor: "#333333"
    };
  },
  methods: {
    getParams: function() {
      // 取到路由带过来的参数
      var pdid = this.$route.query.pdid;
      // 将数据放在当前组件的数据内
      this.pdid = pdid;
    },
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
    },
    changeTime(val) {
      if (val != 4) {
        this.type = val;
        this.minTime = "";
        this.maxTime = "";
        this.getevenlist();
      }
    },
    searchTags() {
      this.getevenlist();
    },
    //自定义时间
    selectDate() {
      this.minTime = this.twotime[0];
      this.maxTime = this.twotime[1];
      this.type = 4;
      this.getevenlist();
    },
    //刷新
    refresh() {},
    sortEvents(e) {
      this.sort = e.order == "asc" ? 1 : 2;
      this.getevenlist();
    },
    //获取事件列表
    getevenlist() {
      // var params = {
      //   tag: this.tag,
      //   pdid: this.pdid,
      //   type: this.type,
      //   sort: this.sort,
      //   minTime: this.minTime,
      //   maxTime: this.maxTime,
      //   eventType: this.eventType,
      //   functionType: 3
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
      //           if (item.createTime) {
      //             var time = format_time(item.createTime, "time");
      //             item.createTime = time;
      //           } else {
      //             //返参无更新时间显示短线
      //             item.createTime = "--";
      //           }
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
    }
  },
  watch: {
    eventType(val) {
      this.getevenlist();
      if (val == "") {
        this.selectcolor = "#333333";
      } else {
        this.selectcolor = "#2980b9";
      }
    }
  },
  created() {
    this.getParams();
  },
  mounted() {
    this.getevenlist();
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

