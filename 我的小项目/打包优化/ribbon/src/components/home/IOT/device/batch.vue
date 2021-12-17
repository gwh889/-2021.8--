<template>
  <div>
    <div class="main-search">
      <div>
        <Button
          type="primary"
          @click="showequmodal('addequfrom')"
        >添加设备</Button>
        <Button
          class="white-btn"
          @click="equbatchequmodal = true"
        >批量添加</Button>
        <span class="downtip">您可按批次下载设备激活凭证(.xls),批量烧录到设备中。</span>
      </div>
    </div>
    <div class="main-table">
      <Table
        :columns="equcolumns1"
        :data="equdata1"
        @on-selection-change="selecttable"
      ></Table>
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
      v-model="equaddequmodal"
      title="添加设备"
      width="634"
      :mask-closable="false"
    >
      <Form
        :model="equformItem"
        :rules="equruleValidate"
        :label-width="130"
        ref="addequfrom"
      >
        <Alert
          type="warning"
          show-icon
        >
          <template slot="desc">
            特别说明：deviceName可以为空,当为空时,将会颁发全局唯一标识符作为deviceName。
          </template>
        </Alert>
        <FormItem
          label="所属物联网平台"
          prop="belong"
          v-if="!deptid"
        >
          <Select
            v-model="equformItem.belong"
            style="width: 280px;"
            filterable
          >
            <Option value="">请选择设备所属物联网平台</Option>
            <Option
              v-for="platlist in myplatlist"
              :value="platlist.deptid"
              :key="platlist.deptid"
            >{{platlist.deptname}}</Option>
          </Select>
        </FormItem>
        <FormItem
          label="产品"
          prop="ppid"
        >
          <Select
            v-model="equformItem.ppid"
            style="width: 280px;"
            filterable
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
          label="所属企业"
          prop="deptid"
        >
          <Select
            v-model="equformItem.deptid"
            style="width: 280px;"
          >
            <Option value="">请选择设备所属企业</Option>
            <Option
              v-for="deptlist in mydeptlist"
              :value="deptlist.deptid"
              :key="deptlist.deptid"
            >{{deptlist.deptname}}</Option>
          </Select>
        </FormItem>
        <FormItem
          label="DeviceName"
          prop="devicename"
        >
          <Input
            v-model="equformItem.devicename"
            type="text"
            placeholder="请输入"
            style="width: 280px;"
            
             
          ></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button
          @click="handleReset"
          class="white-btn"
        >取 消</Button>
        <Button
          type="primary"
          @click="handleSubmit('addequfrom')"
        >确 定</Button>
      </div>
    </Modal>

    <!-- 批量创建设备弹窗 -->
    <Modal
      v-model="equbatchequmodal"
      title="添加设备"
      :loading="true"
      width="634"
      :mask-closable="false"
    >
      <Form
        :model="equbatchformItem"
        :rules="equruleValidate2"
        :label-width="130"
        ref="addmoreequfrom"
      >
        <FormItem
          label="所属物联网平台"
          prop="belong"
          v-if="!deptid"
        >
          <Select
            v-model="equbatchformItem.belong"
            style="width: 280px;"
            filterable
          >
            <Option value="">请选择设备所属物联网平台</Option>
            <Option
              v-for="platlist in myplatlist"
              :value="platlist.deptid"
              :key="platlist.deptid"
            >{{platlist.deptname}}</Option>
          </Select>
        </FormItem>
        <FormItem
          label="产品"
          prop="ppid"
        >
          <Select
            v-model="equbatchformItem.ppid"
            style="width: 280px;"
            filterable
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
          label="所属企业"
          prop="deptid"
        >
          <Select
            v-model="equbatchformItem.deptid"
            style="width: 280px;"
          >
            <Option value="">请选择设备所属企业</Option>
            <Option
              v-for="deptlist in mydeptlist"
              :value="deptlist.deptid"
              :key="deptlist.deptid"
            >{{deptlist.deptname}}</Option>
          </Select>
        </FormItem>
        <FormItem
          label="上传文件："
          prop="filename"
        >
          <input
            type="file"
            @change="loadfile"
            ref="fileinput"
            style="display:none;"
            id="fileinput"
          >
          <label
            for="fileinput"
            class="upuplabel"
          >上传文件</label>
          <Poptip
            trigger="hover"
            content="单次最多添加1000台"
          >
            <img
              src="/static/images/tip.png"
              class="modal-tip"
            >
          </Poptip>
          <span>{{equbatchformItem.filename}}</span>
        </FormItem>
        <div class="filetip">单个文件不超过2M，一次最多包含1000条记录，<Button
            type="text"
            class="blue-text-btn file-btn"
            @click="downfile"
          >下载.xls模板</Button></div>
      </Form>
      <div slot="footer">
        <Button
          @click="closeallmodal"
          class="white-btn"
        >取 消</Button>
        <Button
          type="primary"
          @click="bathSubmit('addmoreequfrom')"
        >确 定</Button>
      </div>
    </Modal>
    <!-- 详情弹窗 -->
    <Modal
      v-model="detailmodal"
      title="批次详情"
      width="634"
      :mask-closable="false"
    >
      <div class="bath-content">
        <div class="bath-title">
          <span class="bath-tou">添加时间</span>
          <span>{{createTime}}</span>
        </div>
        <div class="bath-title">
          <span class="bath-tou">添加数量</span>
          <span>{{allNum}}</span>
          <i
            class="mintip"
            style="background:#52C41A;"
          ></i>
          <span class="bath-tou">已激活</span>
          <span>{{activeNum}}</span>
          <i
            class="mintip"
            style="background:rgba(0,0,0,0.25);"
          ></i>
          <span class="bath-tou">未激活</span>
          <span>{{notActiveNum}}</span>
        </div>
        <div class="bath-total">
          <div>
            <RadioGroup
              type="button"
              v-model="status"
            >
              <Radio label="">全部</Radio>
              <Radio :label="1">已激活</Radio>
              <Radio :label="2">未激活</Radio>
            </RadioGroup>
            <!-- <Button type="primary">下载CSV</Button> -->
          </div>
          <div>
            <Page
              :total="total1"
              show-elevator
              :page-size="pageSize1"
              :current="pageNum1"
              @on-page-size-change="pagesizechange1"
              @on-change="pagenumberchange1"
            />
          </div>
        </div>
        <Table
          :columns="columns2"
          :data="data2"
        ></Table>
      </div>
      <div slot="footer">
        <Button
          @click="detailmodal = false"
          class="white-btn"
        >关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
// import { useaxios } from "@/assets/js/axios";
// import { url_api, format_time } from "@/assets/js/common";
// import axios from "axios";

export default {
  data() {
    const valiequname = function(rule, value, callback) {
      if (value) {
        if (!/^[\u4e00-\u9fa5_a-zA-Z0-9_]{4,32}$/.test(value)) {
          return callback(
            new Error("设备名称：支持中文、英文字母、数字和下划线，4~32个字符")
          );
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      detailmodal: false,
      status: "",
      addmodalshow: 1,
      myprolist: [],
      mydeptlist: [],
      myplatlist: [], //运营商列表
      text: "",
      total: 0,
      pageNum: 1,
      pageSize: 10,
      total1: 0,
      pageNum1: 1,
      pageSize1: 10,
      createTime: "",
      allNum: 0,
      activeNum: 0,
      notActiveNum: 0,
      equaddequmodal: false, //单个添加设备弹窗
      equbatchequmodal: false, //批量添加设备弹窗
      equdelectmodal: false, //删除弹窗
      delectequid: "",
      deletetype: 1,
      deptid: "",
      selectdeptid: "",
      ppid: "",
      equcolumns1: [
        {
          title: "产品名称",
          key: "ppname",
          tooltip: true
        },
        {
          title: "ProductKey",
          key: "productkey",
          tooltip: true
        },
        {
          title: "添加时间",
          key: "createtime",
          tooltip: true
        },
        {
          title: "添加数量",
          key: "num",
          tooltip: true
        },
        {
          title: "操作",
          key: "id",
          minWidth: 100,
          render: (h, params) => {
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
                    padding: "0 8px"
                  },
                  on: {
                    click: () => {
                      this.pdbid = params.row.pdbid;
                      this.status = "";
                      this.showdetailmodal();
                    }
                  }
                },
                "查看详情"
              ),
              // h(
              //   "Button",
              //   {
              //     class: 'clickable',
              //     props: {
              //       type: "text"
              //     },
              //     style: {
              //       color: "#2980B9",
              //       padding: "0 8px"
              //     },
              //     on: {
              //       click: () => {
              //         this.removeequ(params.row.pdid);
              //       }
              //     }
              //   },
              //   "下载CSV"
              // )
            ]);
          }
        }
      ],
      equdata1: [],
      columns2: [
        {
          title: "ProductKey",
          key: "productKey",
          tooltip: true
        },
        {
          title: "DeviceName",
          key: "devicename",
          tooltip: true
        },
        {
          title: "DeviceSecret",
          key: "secret",
          tooltip: true
        },
        {
          title: "激活状态",
          key: "status",
          tooltip: true,
          render: (h, params) => {
            const row = params.row;
            const status = row.status;
            var color;
            var text1
            if (status === 1) {
              text1 = "在线";
              color = '#27AE60';
            } else if (status === 2) {
              text1 = "离线";
              color = '#c2c2c2';
            } else if (status === 3) {
              text1 = "未激活";
              color = '#c2c2c2';
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
          title: "激活时间",
          key: "activetime",
          tooltip: true
        }
      ],
      data2: [],
      equformItem: {
        ppid: "",
        belong: "",
        deptid: "",
        devicename: ""
      },
      equbatchformItem: {
        ppid: "",
        belong: "",
        deptid: "",
        file: "",
        filename: ""
      },
      equuploadList: [],
      equselectarr: [],
      equruleValidate: {
        ppid: [
          {
            required: true,
            message: "请选择产品名称",
            trigger: "change",
            type: "number"
          }
        ],
        deptid: [
          {
            required: true,
            message: "请选择所属企业",
            trigger: "change",
            type: "number"
          }
        ],
        devicename: [
          {
            validator: valiequname,
            trigger: "blur"
          }
        ]
      },
      equruleValidate2: {
        ppid: [
          {
            required: true,
            message: "请选择产品",
            trigger: "change",
            type: "number"
          }
        ],
        belong: [
          {
            required: true,
            message: "请选择所属物联网平台",
            trigger: "change",
            type: "number"
          }
        ],
        deptid: [
          {
            required: true,
            message: "请选择设备所属企业",
            trigger: "change",
            type: "number"
          }
        ],
        filename: [
          {
            required: true,
            message: "请上传文件",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    //获取运营商列表
    getplatlist() {
      // const _this = this;
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + "/iext/back/IotController/choosePlatformList",
      //     {},
      //     "get"
      //   )
      //   .then(function(res) {
      //     if (res.data.success === 1) {
      //       let list = res.data.body.list;
      //       _this.myplatlist = list;
      //     } else {
      //       _this.$Message.error(res.data.msg);
      //     }
      //   })
      //   .catch(function(error) {
      //     _this.$Message.error(error);
      //   });
    },
    //获取产品列表
    getprolist() {
      const _this = this;
      var deptid = "";
      if (_this.addmodalshow == 1) {
        if (
          _this.equformItem.belong == undefined ||
          _this.equformItem.belong == ""
        ) {
          _this.mydeptlist = [];
          return false;
        } else {
          deptid = _this.equformItem.belong;
        }
      } else {
        if (
          _this.equbatchformItem.belong == undefined ||
          _this.equbatchformItem.belong == ""
        ) {
          _this.mydeptlist = [];
          return false;
        } else {
          deptid = _this.equbatchformItem.belong;
        }
      }
      console.log(deptid);
      
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + "/iext/back/IotController/chooseProductList",
      //     { deptid: deptid },
      //     "get"
      //   )
      //   .then(function(res) {
      //     if (res.data.success === 1) {
      //       let list = res.data.body.productList;
      //       _this.myprolist = list;
      //     } else {
      //       _this.$Message.error(res.data.msg);
      //     }
      //   })
      //   .catch(function(error) {
      //     _this.$Message.error(error);
      //   });
    },
    //获取企业列表
    getdeptlist() {
      const _this = this;
      var deptid = "";
      if (_this.addmodalshow == 1) {
        if (
          _this.equformItem.belong == undefined ||
          _this.equformItem.belong == ""
        ) {
          _this.mydeptlist = [];
          return false;
        } else {
          deptid = _this.equformItem.belong;
        }
      } else {
        if (
          _this.equbatchformItem.belong == undefined ||
          _this.equbatchformItem.belong == ""
        ) {
          _this.mydeptlist = [];
          return false;
        } else {
          deptid = _this.equbatchformItem.belong;
        }
      }
      console.log(deptid);
      
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + "/iext/back/IotController/chooseDeptList",
      //     { deptid: deptid },
      //     "get"
      //   )
      //   .then(function(res) {
      //     if (res.data.success === 1) {
      //       let list = res.data.body.deptList;
      //       _this.mydeptlist = list;
      //     } else {
      //       _this.$Message.error(res.data.msg);
      //     }
      //   })
      //   .catch(function(error) {
      //     _this.$Message.error(error);
      //   });
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
    //修改每页条数
    pagesizechange1(pagesize) {
      this.pageSize1 = pagesize;
      this.pageNum = 1;
      this.showdetailmodal();
    },
    //修改页码
    pagenumberchange1(pagenum) {
      this.pageNum1 = pagenum;
      this.showdetailmodal();
    },
    //上传文件
    loadfile() {
      var fileinput = this.$refs.fileinput;
      console.log(fileinput.files[0]);
      if (
        fileinput.files[0].type != "application/vnd.ms-excel" &&
        fileinput.files[0].type != ""
      ) {
        this.$Message.error("请上传xls格式的文件");
        return false;
      }
      this.equbatchformItem.file = fileinput.files[0];
      this.equbatchformItem.filename = fileinput.files[0].name;
    },
    //选择表格
    selecttable(selection) {
      this.equselectarr = selection;
    },
    //确认添加
    handleSubmit(postdata) {
      console.log(postdata);
      
      // const _this = this;

      // _this.$refs[postdata].validate(valid => {
      //   if (valid) {
      //     let deptid = _this.equformItem.deptid;
         
      //     useaxios
      //       .axios(this.$api.baseUrl + "/iext/back/IotController/addDevice", {
      //         ppid: _this.equformItem.ppid,
      //         devicename: _this.equformItem.devicename,
      //         deptid: deptid
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
    //批量上传
    bathSubmit(postdata) {
      console.log(postdata);
      
      // const _this = this;
      // _this.$refs[postdata].validate(valid => {
      //   if (valid) {
      //     let deptid = _this.equbatchformItem.deptid;
      //     //添加设备
      //     let file = _this.equbatchformItem.file;
      //     let ppid = _this.equbatchformItem.ppid;
      //     let param = new FormData(); // 创建form对象
      //     param.append("file", file, file.name); // 通过append向form对象添加数据
      //     param.append("ppid", ppid); // 添加form表单中其他数据
      //     param.append("deptid", deptid); // 添加form表单中其他数据
      //     let config = {
      //       headers: { "Content-Type": "multipart/form-data" }
      //     };
      //     // 添加请求头
      //     axios
      //       .post(
      //         this.$api.baseUrl + "/iext/back/IotController/addDeviceList",
      //         param,
      //         config
      //       )
      //       .then(function(res) {
      //         if (res.data.success === 1) {
      //           _this.$Message.success("删除成功");
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
    //获取设备列表
    getlist() {
      // const _this = this;
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + "/iext/back/DeviceController/batchList",
      //     {
      //       pageNum: _this.pageNum,
      //       pageSize: _this.pageSize,
      //       ppid: _this.ppid,
      //       deptid : _this.selectdeptid
      //     },
      //     "get"
      //   )
      //   .then(function(res) {
      //     if (res.data.success === 1) {
      //       let list = res.data.body.list;
      //       let result = list.result;
      //       if (result.length <= 0) {
      //         _this.equdata1 = [];
      //       } else {
      //         _this.equdata1 = result.map(item => {
      //           item.createtime = format_time(item.createtime, 'time');
      //           return item;
      //         });
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
    //点击取消
    handleReset() {
      const _this = this;
      _this.equaddequmodal = false;
    },
    showequmodal(postdata) {
      const _this = this;
      _this.$refs[postdata].resetFields();
      _this.equaddequmodal = true;
    },
    //取消弹窗
    closeallmodal() {
      const _this = this;
      _this.equaddequmodal = false;
      _this.detailmodal = false;
      _this.equbatchequmodal = false;
    },
    //显示详情接口
    showdetailmodal() {
      // const _this = this;
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + "/iext/back/DeviceController/batchInfo",
      //     {
      //       pageNum: _this.pageNum1,
      //       pageSize: _this.pageSize1,
      //       pdbid: this.pdbid,
      //       type: this.status
      //     },
      //     "get"
      //   )
      //   .then(function(res) {
      //     if (res.data.success === 1) {
      //       let body = res.data.body;
      //       let list = res.data.body.list;
      //       let result = list.result;
      //       if (result.length <= 0) {
      //         _this.data2 = [];
      //       } else {
      //         _this.data2 = result;
      //       }
      //       _this.total1 = list.total;
      //       _this.pageNum1 = list.pageNum;
      //       _this.pageSize1 = list.pageSize;
      //       _this.createTime = format_time(body.createTime);
      //       _this.allNum = body.allNum;
      //       _this.activeNum = body.activeNum;
      //       _this.notActiveNum = body.notActiveNum;
      //       _this.detailmodal = true;
      //     } else {
      //       _this.$Message.error(res.data.msg);
      //     }
      //   })
      //   .catch(function(error) {
      //     _this.$Message.error(error);
      //   });
    },
    //下载文件
    downfile() {
      window.open('/static/Template.xls');
    }
  },
  created() {
    let _this = this;
    const usertype = _this.$store.state.user.type;
    if(usertype == 1024) {
      _this.selectdeptid = _this.$store.state.user.cpid;
      _this.deptid = _this.$store.state.user.cpid;
    }
    this.getplatlist();
    if (this.deptid != "") {
      this.getprolist();
    }
    if (this.deptid != "") {
      this.getdeptlist();
    }
  },
  mounted() {
    this.getlist();
  },
  watch: {
    newValue: {
      handler: function() {
        this.addmodalshow = 1;
        //获取企业列表
        this.getdeptlist();
        this.getprolist();
      },
      deep: true
    },
    newbathValue: {
      handler: function() {
        this.addmodalshow = 2;
        //获取企业列表
        this.getdeptlist();
        this.getprolist();
      },
      deep: true
    },
    status: {
      handler: function() {
        this.pageNum1 = 1;
        this.showdetailmodal();
      }
    }
  },
  computed: {
    newValue() {
      return this.equformItem.belong;
    },
    newbathValue() {
      return this.equbatchformItem.belong;
    }
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

.downtip {
  color: #7a8693;
  margin-left: 16px;
}
.bath-content {
  font-family: $main-fam-block;
  color: $main-font-color-block;
  .bath-title {
    margin-bottom: 16px;
    .bath-tou {
      margin-right: 16px;
    }
  }
  .mintip {
    width: 6px;
    height: 6px;
    border-radius: 3px;
    display: inline-block;
    position: relative;
    bottom: 1px;
    margin-right: 4px;
    margin-left: 56px;
  }
  .bath-total {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
  }
  // .ivu-page {
  //   & /deep/ .ivu-page-item-jump-next,
  //   & /deep/ .ivu-page-item,
  //   & /deep/ .ivu-page-item-jump-prev {
  //     display: none;
  //   }
  // }
}
.upuplabel {
  width: 108px;
  height: 36px;
  background: rgba(41, 128, 185, 1);
  box-shadow: 0px 1px 0px 0px rgba(22, 29, 37, 0.1);
  border-radius: 2px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  cursor: pointer;
}
.file-btn {
  padding: 0;
}
</style>

