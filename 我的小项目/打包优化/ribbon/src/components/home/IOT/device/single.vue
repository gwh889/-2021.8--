<template>
  <minequlist
    :equcolumns1="equcolumns1"
    :equdata1="equdata1"
    ref="smallequlist"
    :deptid="deptid"
    @getequlist="getequlist"
  ></minequlist>
</template>

<script>
// import { useaxios } from '@/assets/js/axios'
// import { url_api } from '@/assets/js/common'
import minequlist from "./minequlist";
export default {
  components: { minequlist },
  data() {
    return {
      deptid: "",
      ppid: "",
      selectdeptid: "",
      equcolumns1: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "DeviceName",
          key: "devicename",
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
                      //   path: "/device/equinfor",
                      //   query: { deptid: params.row.deptid },
                      // });
                    },
                  },
                },
                params.row.devicename
              ),
            ]);
          },
        },
        {
          title: "设备所属产品",
          key: "productname",
          tooltip: true,
        },
        {
          title: "设备所属企业",
          key: "deptname",
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
              text1 = "网关";
            }
            return h("div", [h("span", {}, text1)]);
          },
        },
        {
          title: "状态/启用状态",
          key: "status",
          tooltip: true,
          render: (h, params) => {
            const row = params.row;
            const status = row.status;
            var color;
            var text1;
            if (status === 1) {
              text1 = "启用";
            } else if (status === 2) {
              text1 = "停用";
            } else if (status === 3) {
              text1 = "未激活";
              color = "#c2c2c2";
            }
            return h("div", [
              h(
                "i",
                {
                  style: {
                    background: color,
                    width: "6px",
                    height: "6px",
                    borderRadius: "3px",
                    display: "inline-block",
                    position: "relative",
                    bottom: "1px",
                    marginRight: "4px",
                  },
                  class: {
                    mintip: true,
                  },
                },
                ""
              ),
              h("span", {}, text1),
            ]);
          },
        },
        {
          title: "最后上线时间",
          key: "lasttime",
          tooltip: true,
        },
        {
          title: "操作",
          key: "id",
          minWidth: 100,
          render: (h, params) => {
            const sonnum = params.row.sonnum;
            const nodetype = params.row.nodetype;
            if (nodetype === 1) {
              return h("div", [
                h(
                  "Button",
                  {
                    class: "clickable",
                    props: {
                      type: "text",
                    },
                    style: {
                      color: "#2980B9",
                      padding: "0 8px",
                    },
                    on: {
                      click: () => {
                        // this.$router.push({
                        //   path: "/device/equinfor",
                        //   query: { deptid: params.row.deptid },
                        // });
                      },
                    },
                  },
                  "查看"
                ),
                h(
                  "Button",
                  {
                    class: "clickable",
                    props: {
                      type: "text",
                    },
                    style: {
                      color: "#2980B9",
                      padding: "0 8px",
                    },
                    on: {
                      click: () => {
                        this.removeequ(params.row.pdid);
                      },
                    },
                  },
                  "删除"
                ),
              ]);
            } else {
              return h("div", [
                h(
                  "Button",
                  {
                    class: "clickable",
                    props: {
                      type: "text",
                    },
                    style: {
                      color: "#2980B9",
                      padding: "0 8px",
                    },
                    on: {
                      click: () => {
                        this.$router.push({
                          path: "/device/equchild",
                          query: { pdid: params.row.pdid, detailtype: 6 },
                        });
                      },
                    },
                  },
                  `子设备(${sonnum})`
                ),
                // h(
                //   "Button",
                //   {
                //     props: {
                //       type: "text"
                //     },
                //     style: {
                //       color: "#2980B9",
                //       padding: "0 8px"
                //     },
                //     on: {
                //       click: () => {
                //         this.remove(params.index);
                //       }
                //     }
                //   },
                //   "配置下发"
                // ),
                h(
                  "Button",
                  {
                    class: "clickable",
                    props: {
                      type: "text",
                    },
                    style: {
                      color: "#2980B9",
                      padding: "0 8px",
                    },
                    on: {
                      click: () => {
                        this.removeequ(params.row.pdid);
                      },
                    },
                  },
                  "删除"
                ),
              ]);
            }
          },
        },
      ],
      equdata1: [
        {
          deptid: 12835,
          deptname: "产品测试企业",
          devicename: "TL101",
          lasttime: "六月 15, 2020",
          nodetype: 2,
          pdid: 318,
          ppid: 79,
          productname: "天力弹簧",
          sonnum: 1,
          status: 2,
        },
      ],
    };
  },
  methods: {
    getList(){
      this.axios({
        url:'/IOT.json',
        method:'get'
      }).then(res=>{
        if(res.data.success===1){
          this.equdata1=res.data.body.equdata1
        }else{
          this.$message.error(res.data.msg)
        }
      }).catch(error=>console.log(error))
    },
    getParams: function() {
      // 取到路由带过来的参数
      var ppid = this.$route.query.ppid;
      if (ppid) {
        // 将数据放在当前组件的数据内
        this.ppid = ppid;
      }
    },
    // 删除设备
    removeequ(pdid) {
      let _this = this;
      _this.$refs.smallequlist.delectequid = pdid;
      _this.$refs.smallequlist.equdelectmodal = true;
      _this.$refs.smallequlist.deletetype = 1;
    },
    // 获取设备列表
    getequlist() {
      // const _this = this
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + '/iext/back/DeviceController/deviceList',
      //     {
      //       text: _this.$refs.smallequlist.text,
      //       pageNum: _this.$refs.smallequlist.pageNum,
      //       pageSize: _this.$refs.smallequlist.pageSize,
      //       ppid: _this.ppid,
      //       deptid: _this.selectdeptid
      //     },
      //     'get'
      //   )
      //   .then(function (res) {
      //     if (res.data.success === 1) {
      //       let list = res.data.body.list
      //       let result = list.result
      //       if (result.length <= 0) {
      //         _this.equdata1 = []
      //       } else {
      //         _this.equdata1 = result
      //       }
      //       _this.$refs.smallequlist.total = list.total
      //       _this.$refs.smallequlist.pageNum = list.pageNum
      //       _this.$refs.smallequlist.pageSize = list.pageSize
      //       _this.$store.commit('showequnum', [res.data.body.allNum, res.data.body.activeNum, res.data.body.onlineNum])
      //     } else {
      //       _this.$Message.error(res.data.msg)
      //     }
      //   })
      //   .catch(function (error) {
      //     _this.$Message.error(error)
      //   })
    },
  },
  created() {
    let _this = this;
    const usertype = _this.$store.state.user.type;
    if (usertype == 1024) {
      _this.selectdeptid = _this.$store.state.user.cpid;
      _this.deptid = _this.$store.state.user.cpid;
    }
    this.getParams();
  },
  mounted() {
    // this.getequlist();
    this.getList();
    console.log(this.equdata1)
  },
};
</script>

<style lang="scss" scoped>
.ivu-tabs .ivu-tabs-tabpane {
  padding: 0 24px;
}
.filetip {
  color: rgba(122, 134, 147, 1);
  margin-left: 86px;
}
.file-btn {
  padding: 0;
}
</style>
