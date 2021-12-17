<template>
  <div>
    <div
      class="main-search"
      style="padding-top:0;"
    >
      <div>
        <Button
          type="primary"
          @click="showaddequmodal"
        >添加子设备</Button>
        <Button class="white-btn" @click="replacelist">刷新</Button>
        <Input
          prefix="ios-search"
          placeholder="请输入请输入Devicename"
          style="width:240px"
          v-model="text"
          @on-enter="getlist"
          @on-blur="getlist"
        />
      </div>
    </div>
    <div class="main-table">
      <Table
        :columns="columns1"
        :data="data1"
        @on-selection-change="selecttable"
      ></Table>
    </div>
    <div class="child-bottom">
      <Button
        class="white-btn"
        @click="showmoredelect"
        :disabled="arrstatus"
      >批量删除</Button>
      <!-- <Button
        class="white-btn"
        @click="forbiddenmodal = true"
        :disabled="arrstatus"
      >批量禁用</Button>
      <Button
        class="white-btn"
        @click="startmodal = true"
        :disabled="arrstatus"
      >批量启用</Button> -->
    </div>
    <div class="main-page">
      <Page
        :total="total"
        show-sizer
        show-elevator
        show-total
        :page-size="pageSize"
        :current="pageNum"
        @on-page-size-change="pagesizechange"
        @on-change="pagenumberchange"
      />
    </div>
    <!-- 单个创建设备弹窗 -->
    <Modal
      v-model="addequmodal"
      title="添加子设备"
      :loading="true"
      width="634"
      :mask-closable="false"
    >
      <Form
        :model="formItem"
        :rules="ruleValidate"
        :label-width="130"
        ref="addchildfrom"
      >
        <FormItem
          label="产品"
          prop="ppid"
        >
          <Select
            v-model="formItem.ppid"
            style="width: 280px;"
          >
            <Option value="">请选择产品</Option>
            <Option
              v-for="prolist in myprolist"
              :value="prolist.ppid"
              :key="prolist.ppid"
            >{{prolist.name}}</Option>
          </Select>
        </FormItem>
        <FormItem
          label="设备名"
          prop="pdid"
        >
          <Select
            v-model="formItem.pdid"
            style="width: 280px;"
          >
            <Option value="">请选择设备</Option>
            <Option
              v-for="equlist in myequlist"
              :value="equlist.pdid"
              :key="equlist.pdid"
            >{{equlist.devicename}}</Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button
          @click="closeallmodal"
          class="white-btn"
        >取 消</Button>
        <Button
          type="primary"
          @click="handleSubmit('addchildfrom')"
        >确 定</Button>
      </div>
    </Modal>

    <!-- 确认删除弹窗 -->
    <Modal
      v-model="delectmodal"
      title="删除设备"
      width="634"
      :mask-closable="false"
      @on-ok="delectequ"
    >
      <Alert
        type="warning"
        show-icon
      >
        <template slot="desc">
          删除设备将删除与该设备相关的数据，该操作无法撤销。
        </template>
      </Alert>
    </Modal>

    <!-- 确认禁用弹窗 -->
    <Modal
      v-model="forbiddenmodal"
      title="批量禁用"
      width="634"
      :mask-closable="false"
      @on-ok="delectequ"
    >
      <Alert
        type="warning"
        show-icon
      >
        <template slot="desc">
          禁用设备将禁用与该设备相关的数据，该操作无法撤销。
        </template>
      </Alert>
    </Modal>

    <!-- 确认启用弹窗 -->
    <Modal
      v-model="startmodal"
      title="批量启用"
      width="634"
      :mask-closable="false"
      @on-ok="delectequ"
    >
      <Alert
        type="warning"
        show-icon
      >
        <template slot="desc">
          启用设备将启用与该设备相关的数据，该操作无法撤销。
        </template>
      </Alert>
    </Modal>
  </div>
</template>

<script>
// import { useaxios } from "@/assets/js/axios";
// import { url_api } from "@/assets/js/common";

export default {
  data() {
    return {
      pdid: '',
      text: '',
      total: 0,
      pageNum: 1,
      pageSize: 10,
      addequmodal: false, //单个添加设备弹窗
      delectmodal: false, //删除弹窗
      startmodal:false,//启用弹窗
      forbiddenmodal: false,//禁用弹窗
      arrstatus: true,
      delectequid: "",
      deletetype: 1,
      myequlist: [],
      myprolist:[],
      formItem: {
        ppid: "",
        pdid: "",
      },
      uploadList: [],
      ruleValidate: {
        ppid: [
          {
            required: true,
            message: "请选择产品",
            trigger: "change",
            type: "number"
          }
        ],
        pdid: [
          {
            required: true,
            message: "请选择设备",
            trigger: "change",
            type: "number"
          }
        ],
      },
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
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
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "#0366D6",
                    padding: "0"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "/equipment/equinfor",
                        query: { pdid: params.row.pdid }
                      });
                    }
                  }
                },
                params.row.devicename
              )
            ]);
          }
        },
        {
          title: "设备所属产品",
          key: "productname",
          tooltip: true
        },
        {
          title: "节点类型",
          key: "nodetype",
          tooltip: true,
          render: (h, params) => {
            const row = params.row;
            const type = row.nodetype;
            var text1
            if (type === 1) {
              text1 = "设备";
            } else {
              text1 = "网关";
            }
            return h("div", [h("span", {}, text1)]);
          }
        },
        {
          title: "状态/启用状态",
          key: "status",
          tooltip: true,
          render: (h, params) => {
            const row = params.row;
            const status = row.status;
            var text1
            var bgColor
            if (status === 1) {
              text1 = "在线";
              bgColor = '#27AE60';
            } else if (status === 2) {
              text1 = "未激活";
              bgColor = '#d3d3d3';
            } else if (status === 3) {
              text1 = "离线";
              bgColor = '#c2c2c2'
            }
            return h("div", [
              h(
                "i",
                {
                  style: {
                    background: bgColor,
                    width: "6px",
                    height: "6px",
                    borderRadius: "3px",
                    display: "inline-block",
                    position: "relative",
                    bottom: "1px",
                    marginRight: "4px"
                  },
                  class: {
                    mintip: true
                  }
                },
                ""
              ),
              h("span", {}, text1)
            ]);
          }
        },
        {
          title: "最后上线时间",
          key: "lasttime",
          tooltip: true
        },
        {
          title: "操作",
          key: "id",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "#2980B9",
                    padding: "0 8px"
                  },
                  on: {
                    click: () => {
                      this.removechild(params.row.pdid);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      equselectarr: [],
      data1: []
    };
  },
  methods: {
    //获取产品列表
    getprolist() {
      // const _this = this;
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + "/iext/back/DeviceController/chooseProductList",
      //     {},
      //     "get"
      //   )
      //   .then(function(res) {
      //     if (res.data.success === 1) {
      //       let list = res.data.body.list;
      //       _this.myprolist = list;
      //     } else {
      //       _this.$Message.error(res.data.msg);
      //     }
      //   })
      //   .catch(function(error) {
      //     _this.$Message.error(error);
      //   });
    },
    //获取产品列表
    getequlist() {
      // const _this = this;
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + "/iext/back/DeviceController/fatherDeviceList",
      //     { ppid: _this.formItem.ppid },
      //     "get"
      //   )
      //   .then(function(res) {
      //     if (res.data.success === 1) {
      //       let list = res.data.body.list;
      //       _this.myequlist = list;
      //     } else {
      //       _this.$Message.error(res.data.msg);
      //     }
      //   })
      //   .catch(function(error) {
      //     _this.$Message.error(error);
      //   });
    },
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
      this.getlist();
    },
    //修改页码
    pagenumberchange(pagenum) {
      this.pageNum = pagenum;
      this.getlist();
    },
    getlist() {
      // const _this = this;
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + "/iext/back/DeviceController/sonDeviceList",
      //     {
      //       pdid: _this.pdid,
      //       pageNum: _this.pageNum,
      //       pageSize: _this.pageSize,
      //       text: _this.text
      //     },
      //     "get"
      //   )
      //   .then(function(res) {
      //     if (res.data.success === 1) {
      //       let list = res.data.body.list;
      //       let result = list.result;
      //       if (result.length <= 0) {
      //         _this.data1 = [];
      //       } else {
      //         _this.data1 = result;
      //       }
      //       _this.total = list.total;
      //       _this.pageNum = list.pageNum;
      //       _this.pageSize = list.pageSize;
      //     } else {
      //       _this.$Message.error(res.data.msg);
      //     }
      //   })
      //   .catch(function(error) {
      //     _this.$Message.error(error);
      //   });
    },
    replacelist() {
      this.text = "";
      this.pageNum = 1;
      this.getlist();
    },
    //选择表格
    selecttable(selection) {
      this.equselectarr = selection;
    },
    //删除设备
    removechild(pdid) {
      let _this = this;
      _this.delectequid = pdid;
      _this.delectmodal = true;
      _this.deletetype = 1;
    },
    showmoredelect() {
      let _this = this;
      _this.delectequid = "";
      _this.delectmodal = true;
      _this.deletetype = 2;
    },
    //确定删除
    delectequ() {
      const _this = this;
      if (_this.deletetype == 1) {
        // useaxios
        //   .axios(
        //     this.$api.baseUrl + "/iext/back/DeviceController/deleteSonDeviceList",
        //     {
        //       ids: _this.delectequid
        //     }
        //   )
        //   .then(function(res) {
        //     if (res.data.success === 1) {
        //       _this.$Message.success("删除成功");
        //       _this.pageNum = 1;
        //       _this.getlist();
        //       _this.closeallmodal();
        //     } else {
        //       _this.$Message.error(res.data.msg);
        //     }
        //   })
        //   .catch(function(error) {
        //     url_api.commonjs.checkError(error);
        //   });
      } else {
        const equselectarr = _this.equselectarr;
        let equidstr = "";
        if (equselectarr.length > 0) {
          for (let i = 0; i < equselectarr.length; i++) {
            if (i == 0) {
              equidstr += "?ids=" + equselectarr[i].pdid;
            } else {
              equidstr += "&ids=" + equselectarr[i].pdid;
            }
          }
        } else {
          _this.$Message.error("请选择要删除的设备");
          return false;
        }
        console.log(equidstr);
        
        // useaxios
        //   .axios(
        //     this.$api.baseUrl +
        //       "/iext/back/DeviceController/deleteSonDeviceList" + equidstr,
        //     {}
        //   )
        //   .then(function(res) {
        //     if (res.data.success === 1) {
        //       _this.$Message.success("删除成功");
        //       _this.pageNum = 1;
        //       _this.getlist();
        //       _this.closeallmodal();
        //     } else {
        //       _this.$Message.error(res.data.msg);
        //     }
        //   })
        //   .catch(function(error) {
        //     url_api.commonjs.checkError(error);
        //   });
      }
    },
    closeallmodal() {
      this.addequmodal = false;
    },
    //确认添加
    handleSubmit(postdata) {
      // const _this = this;
      console.log(postdata);
      
      // _this.$refs[postdata].validate(valid => {
      //   if (valid) {
      //     useaxios
      //       .axios(this.$api.baseUrl + "/iext/back/DeviceController/addSonDevice", {
      //         sonpdid: _this.formItem.pdid,
      //         fatherpdid: _this.pdid,
      //       })
      //       .then(function(res) {
      //         if (res.data.success === 1) {
      //           _this.$Message.success("创建成功");
      //           _this.pageNum = 1;
      //           _this.getlist();
      //           _this.closeallmodal();
      //         } else {
      //           _this.$Message.error(res.data.msg);
      //         }
      //       })
      //       .catch(function(error) {
      //         url_api.commonjs.checkError(error);
      //       });
      //   }
      // });
    },
    //显示添加弹窗
    showaddequmodal() {
      const _this = this;
      _this.$refs['addchildfrom'].resetFields();
      _this.addequmodal = true;
    }
  },
  watch: {
    equselectarr(val) {
      if(val.length > 0){
        this.arrstatus = false;
      }else{
        this.arrstatus = true;
      }
    },
    newValue(val) {
      if(val != ""){
        this.getequlist();
      }
    }
  },
  computed: {
    newValue() {
      return this.formItem.ppid;
    },
  },
  created() {
    this.getParams();
    this.getprolist();
  },
  mounted() {
    this.getlist();
  }
};
</script>

<style lang="scss" scoped>
.filetip {
  color: rgba(122, 134, 147, 1);
  margin-left: 86px;
}
.file-btn {
  padding: 0;
}
.child-bottom {
  margin-top: 24px;
}
</style>

