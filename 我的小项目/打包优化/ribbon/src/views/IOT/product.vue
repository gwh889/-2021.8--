<template>
  <div id="product">
    <Breadcrumb :style="{ margin: '16px 0' }">
      <BreadcrumbItem>IOT</BreadcrumbItem>
      <BreadcrumbItem>产品管理</BreadcrumbItem>
    </Breadcrumb>
    <div class="mainbody">
      <div class="mainheader">产品管理</div>
      <minprolist
        :columns1="columns1"
        :data1="data1"
        ref="smallprolist"
        @getprolist="getprolist"
        :deptid="deptid"
        depttype="1"
      ></minprolist>
    </div>
  </div>
</template>

<script>
// import { useaxios } from '@/assets/js/axios'
// import { url_api, format_time } from '@/assets/js/common'

import minprolist from "../../components/home/IOT/product/minprolist.vue";

export default {
  components: { minprolist },
  data() {
    const _this = this;
    return {
      deptid: "",
      selectdeptid: "",
      selectcolor: "#333333",
      detailtype: "1",
      selectplatlist: [],
      columns1: [
        {
          title: "产品名称",
          key: "name",
          tooltip: true,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  class: "clickable",
                  props: {
                    type: "text",
                  },
                  style: {
                    color: "#0366D6",
                    padding: "0",
                    width: "100%",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    textAlign: "left",
                  },
                  on: {
                    click: () => {
                      // this.$router.push({
                      //   path: "/product/proinfor",
                      //   query: { ppid: params.row.ppid },
                      // });
                    },
                  },
                },
                params.row.name
              ),
            ]);
          },
        },
        {
          title: "ProductKey",
          key: "productkey",
          tooltip: true,
        },
        {
          title: "节点类型",
          key: "nodetype",
          tooltip: true,
          render: (h, params) => {
            const row = params.row;
            const nodetype = row.nodetype;
            var text1;
            if (nodetype === 1) {
              text1 = "ZJ23--63";
            } else {
              text1 = "ZJ23--63";
            }
            return h("div", [h("span", {}, text1)]);
          },
        },
        {
          title: "设备数",
          key: "devicenum",
          tooltip: true,
        },
        {
          title: "添加时间",
          key: "createtime",
          tooltip: true,
        },
        {
          key: "deptname",
          tooltip: true,
          renderHeader: (h) => {
            const arr = _this.selectplatlist;
            const usertype = _this.$store.state.user.type;
            if (usertype == 2048) {
              return h("div", [
                h("span", {}, "所属平台"),
                h(
                  "Dropdown",
                  {
                    props: {
                      transfer: true,
                    },
                    on: {
                      "on-click": (name) => {
                        _this.selectdeptid = name;
                      },
                    },
                  },
                  [
                    h("Icon", {
                      props: {
                        type: "ios-funnel",
                      },
                      attrs: {
                        style: "margin-left:8px;cursor:pointer;",
                      },
                      style: {
                        color: _this.selectcolor,
                      },
                    }),
                    h("DropdownMenu", { slot: "list" }, [
                      h(
                        "DropdownItem",
                        {
                          props: {
                            name: "",
                          },
                        },
                        "全部"
                      ),
                      arr.map(function(item) {
                        return h(
                          "DropdownItem",
                          {
                            props: {
                              name: item.deptid,
                              selected: item.deptid == _this.selectdeptid,
                            },
                          },
                          item.deptname
                        );
                      }),
                    ]),
                  ]
                ),
              ]);
            } else {
              return h("div", [h("span", {}, "所属平台")]);
            }
          },
        },
        {
          title: "操作",
          key: "id",
          render: (h, params) => {
            return h(
              "Button",
              {
                class: "clickable",
                props: {
                  type: "text",
                },
                style: {
                  color: "#2980B9",
                  padding: "0",
                },
                on: {
                  click: () => {
                    this.removepro(params.row.ppid);
                  },
                },
              },
              "删除"
            );
          },
        },
      ],
      data1: [
        {
          devicenum: 21,
          createtime: "七月 19, 2019",
          nodetype: 2,
          name: "普通织机",
          deptid: 12589,
          productkey: "20e30d293b794be1b3cd0fd4b4804336",
          ppid: 79,
          deptname: "织造行业工业互联网平台",
        },
      ],
      // 所属平台列表，用于筛选
      platList: [],
    };
  },
  methods: {
  //   // 获取产品列表
    getprolist () {
      // const _this = this
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + '/iext/back/ProductController/productList',
      //     {
      //       text: _this.$refs.smallprolist.text,
      //       pageNum: _this.$refs.smallprolist.pageNum,
      //       pageSize: _this.$refs.smallprolist.pageSize,
      //       deptid: _this.selectdeptid
      //     },
      //     'get'
      //   )
      //   .then(function (res) {
      //     if (res.data.success === 1) {
      //       let list = res.data.body.list
      //       let result = list.result
      //       if (result.length <= 0) {
      //         _this.data1 = []
      //       } else {
      //         _this.data1 = result.map(item => {
      //           item.createtime = format_time(item.createtime)
      //           return item
      //         })
      //       }
      //       _this.$refs.smallprolist.total = list.total
      //       _this.$refs.smallprolist.pageNum = list.pageNum
      //       _this.$refs.smallprolist.pageSize = list.pageSize
      //     } else {
      //       _this.$Message.error(res.data.msg)
      //     }
      //   })
      //   .catch(function (error) {
      //     _this.$Message.error(error)
      //   })
    },
  //   // 删除产品
    removepro (ppid) {
      let _this = this
      _this.$refs.smallprolist.delectproid = ppid
      _this.$refs.smallprolist.delectmodal = true
    },
  //   // 获取运营商列表
    getplatlist () {
      // const _this = this
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + '/iext/back/IotController/choosePlatformList',
      //     {},
      //     'get'
      //   )
      //   .then(function (res) {
      //     if (res.data.success === 1) {
      //       let list = res.data.body.list
      //       _this.selectplatlist = list
      //     } else {
      //       _this.$Message.error(res.data.msg)
      //     }
      //   })
      //   .catch(function (error) {
      //     _this.$Message.error(error)
      //   })
    }
  },
  // watch: {
  //   selectdeptid (val) {
  //     this.getprolist()
  //     if (val == '') {
  //       this.selectcolor = '#333333'
  //     } else {
  //       this.selectcolor = '#2980b9'
  //     }
  //   }
  // },
  // created () {
  //   let _this = this
  //   const usertype = _this.$store.state.user.type
  //   if (usertype == 1024) {
  //     _this.selectdeptid = _this.$store.state.user.cpid
  //     _this.deptid = _this.$store.state.user.cpid
  //   }
  //   this.getplatlist()
  // },
  mounted () {
    this.getprolist()
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
#product {
  text-align: left;
}
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
</style>
