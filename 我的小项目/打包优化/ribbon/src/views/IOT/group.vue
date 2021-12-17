<template>
  <div id="group">
    <Breadcrumb :style="{ margin: '16px 0' }">
      <BreadcrumbItem>IOT</BreadcrumbItem>
      <BreadcrumbItem>规则引擎</BreadcrumbItem>
    </Breadcrumb>
    <div class="mainbody">
      <div class="mainheader">分组列表</div>
      <group-list
        :columns1="columns1"
        :data1="data1"
        ref="smallprolist"
        @getGroupList="getGroupList"
        :deptid="deptid"
        depttype="1"
      ></group-list>
    </div>
  </div>
</template>

<script>
// import { useaxios } from '@/assets/js/axios'
// import { url_api, format_time } from '@/assets/js/common'
// import Axios from 'axios'

import groupList from "../../components/home/IOT/group/groupList";

export default {
  components: {
    groupList,
  },
  data() {
    return {
      deptid: "",
      selectdeptid: "",
      selectcolor: "#333333",
      detailtype: "1",
      selectplatlist: [],
      columns1: [
        {
          title: "分组名称",
          key: "pgname",
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
                      console.log(params);
                      this.$router.push({
                        path: "/group/equipDetail",
                        query: {
                          pgid: params.row.pgid,
                          name: params.row.pgname,
                        },
                      });
                    },
                  },
                },
                params.row.pgname
              ),
            ]);
          },
        },
        {
          title: "分组ID",
          key: "pggroupkey",
          tooltip: true,
        },
        {
          title: "添加时间",
          key: "pgcreatetime",
          tooltip: true,
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
                    console.log(params.row);
                    this.deleteItem(params.row.pgid);
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
          pgcreatetime: "Sep 20, 2019 3:34:32 PM",
          pggroupkey: "8fcf4e70-1b43-4d0b-a1d6-567c53830df8",
          pgid: 39,
          pgname: "批次一",
        },
      ],
      // 所属平台列表，用于筛选
      platList: [],
    };
  },
  methods: {
    // 获取分组列表
    getGroupList() {
      // const _this = this
      // Axios.get(this.$api.baseUrl + '/iext/back/GroupController/groupList', {
      //   params: {
      //     name: _this.$refs.smallprolist.text,
      //     pageNum: _this.$refs.smallprolist.pageNum,
      //     pageSize: _this.$refs.smallprolist.pageSize
      //   }
      // })
      //   .then(function (res) {
      //     if (res.data.success === 1) {
      //       let list = res.data.body.list
      //       let result = list.result
      //       if (result.length <= 0) {
      //         _this.data1 = []
      //       } else {
      //         _this.data1 = result.map(item => {
      //           // var time = format_time(item.createTime, 'time')
      //           item.pgcreatetime = format_time(item.pgcreatetime, 'time')
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
    // 删除分组
    deleteItem(id) {
      let _this = this;
      _this.$refs.smallprolist.delectId = id;
      _this.$refs.smallprolist.delectModal = true;
    },
  },
  watch: {
    selectdeptid(val) {
      this.getGroupList();
      if (val === "") {
        this.selectcolor = "#333333";
      } else {
        this.selectcolor = "#2980b9";
      }
    },
  },
  created() {
    let _this = this;
    const usertype = _this.$store.state.user.type;
    if (usertype == 1024) {
      _this.selectdeptid = _this.$store.state.user.cpid;
      _this.deptid = _this.$store.state.user.cpid;
    }
  },
  mounted() {
    this.getGroupList();
  },
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
