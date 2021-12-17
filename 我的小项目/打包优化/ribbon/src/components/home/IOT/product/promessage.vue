<template>
  <div>
    <div class="detail-search">
      <div>
        <span class="detail-title">Topic类列表</span>
        <Button type="primary" @click="showmsgmodal('addmsgfrom')">定义Topic类</Button>
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
        :page-size="pageSize"
        :current="pageNum"
        @on-page-size-change="pagesizechange"
        @on-change="pagenumberchange"
      />
    </div>

    <!-- 创建Topic类弹窗 -->
    <Modal
      v-model="messagemodal"
      title="定义Topic类"
      :loading="true"
      width="634"
      :mask-closable="false"
    >
      <Form :model="formItem" :rules="ruleValidate" :label-width="130" ref="addmsgfrom">
        <FormItem label="设备操作权限" prop="permission">
          <Select v-model="formItem.permission" style="width: 280px;">
            <Option :value="1">发布</Option>
            <Option :value="2">订阅</Option>
          </Select>
        </FormItem>
        <FormItem label="Topic类" prop="url">
          <div class="topic-header">{{formItem.topicLei}}</div>
          <Input v-model="formItem.url" placeholder="请输入Topic类" style="width: 280px;"/>
        </FormItem>

        <FormItem label="描述" prop="describe">
          <Input
            v-model="formItem.describe"
            type="textarea"
            :autosize="{minRows: 5,maxRows: 5}"
            placeholder="请输入描述"
            style="width: 280px;"
          ></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="closeallmodal" class="white-btn">取 消</Button>
        <Button type="primary" @click="handleSubmit('addmsgfrom')">确 定</Button>
      </div>
    </Modal>

    <!-- 确认删除弹窗 -->
    <Modal
      v-model="delectmodal"
      title="删除Topic"
      width="634"
      :mask-closable="false"
      @on-ok="deletemsg"
    >
      <Alert type="warning" show-icon>
        <template slot="desc">删除Topic将删除与该Topic相关的数据，该操作无法撤销。</template>
      </Alert>
    </Modal>
  </div>
</template>

<script>
// import { useaxios } from "@/assets/js/axios";
// import { url_api, format_time } from "@/assets/js/common";

export default {
  data() {
    const valitopurl = function(rule, value, callback) {
      if (!/^[/_a-zA-Z0-9_]{1,64}$/.test(value)) {
        return callback(
          new Error("Topic类名用/分割，支持英文字母、数字、下划线，长度限制64")
        );
      } else {
        callback();
      }
    };
    return {
      ppid: "",
      ptid: "",
      deleteptid: "",
      total: 0,
      pageNum: 1,
      pageSize: 10,
      messagemodal: false,
      delectmodal: false,
      showPage: false,
      formItem: {
        topicLei: "",
        url: "",
        permission: 1,
        describe: ""
      },
      ruleValidate: {
        permission: [
          {
            required: true,
            message: "请选择设备操作权限",
            trigger: "change",
            type: "number"
          }
        ],
        url: [
          {
            required: true,
            message: "Topic类不能为空",
            trigger: "blur"
          },
          {
            validator: valitopurl,
            trigger: "blur"
          }
        ],
        describe: [
          {
            type: "string",
            max: 100,
            message: "描述不能超过100字",
            trigger: "blur"
          }
        ]
      },
      columns1: [
        {
          title: "Topic 类",
          key: "url",
          tooltip: true
        },
        {
          title: "操作权限",
          key: "permission",
          tooltip: true,
          render: (h, params) => {
            const row = params.row;
            const type = row.permission;
            var text1
            if (type === 1) {
              text1 = "发布";
            } else {
              text1 = "订阅";
            }
            return h("div", [h("span", {}, text1)]);
          }
        },
        {
          title: "描述",
          key: "describes",
          tooltip: true
        },
        {
          title: "添加时间",
          key: "createtime",
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
                      this.editmsgmodal(params.row.ptid);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  class: 'clickable',
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "#2980B9",
                    padding: "0"
                  },
                  on: {
                    click: () => {
                      this.showdeletemsg(params.row.ptid);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data1: [],
      map: {}
    };
  },
  methods: {
    //获取详情
    getequdetail() {
      // const _this = this;
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + "/iext/back/ProductController/productInfo",
      //     {
      //       ppid: this.ppid
      //     },
      //     "get"
      //   )
      //   .then(function(res) {
      //     if (res.data.success === 1) {
      //       let map = res.data.body.map;
      //       _this.map = map;
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
      var ppid = this.$route.query.ppid;
      // 将数据放在当前组件的数据内
      this.ppid = ppid;
    },
    //修改每页条数
    pagesizechange(pagesize) {
      this.pageSize = pagesize;
      this.pageNum = 1;
      this.getmsglist();
    },
    //修改页码
    pagenumberchange(pagenum) {
      this.pageNum = pagenum;
      this.getmsglist();
    },
    //获取消息列表
    getmsglist() {
      // const _this = this;
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + "/iext/back/ProductController/topicList",
      //     {
      //       ppid: _this.ppid,
      //       pageNum: _this.pageNum,
      //       pageSize: _this.pageSize
      //     },
      //     "get"
      //   )
      //   .then(function(res) {
      //     if (res.data.success === 1) {
      //       let list = res.data.body.list;
      //       let result = list.result;
      //       if (result.length <= 0) {
      //         _this.data1 = [];
      //         _this.showPage = false;
      //       } else {
      //         _this.data1 = result.map(item => {
      //           if (item.createtime) {
      //             var time = format_time(item.createtime, "time");
      //             item.createtime = time;
      //           } else {
      //             //返参无更新时间显示短线
      //             item.createtime = "--";
      //           }
      //           return item;
      //         });
      //         _this.showPage = true;
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
    //确认添加
    handleSubmit(postdata) {
      console.log(postdata);
      
      // const _this = this;
      // _this.$refs[postdata].validate(valid => {
      //   if (valid) {
      //     useaxios
      //       .axios(
      //         this.$api.baseUrl + "/iext/back/ProductController/saveTopic",
      //         {
      //           permission: _this.formItem.permission,
      //           url: _this.formItem.topicLei + _this.formItem.url,
      //           describe: _this.formItem.describe,
      //           ppid: _this.ppid,
      //           ptid: _this.ptid
      //         }
      //       )
      //       .then(function(res) {
      //         if (res.data.success === 1) {
      //           _this.$Message.success("创建成功");
      //           _this.pageNum = 1;
      //           _this.getmsglist();
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
    //显示删除弹窗
    showdeletemsg(ptid) {
      const _this = this;
      _this.deleteptid = ptid;
      _this.delectmodal = true;
    },
    //确定删除
    deletemsg() {
      // const _this = this;
      // useaxios
      //   .axios(this.$api.baseUrl + "/iext/back/ProductController/delTopic", {
      //     ptid: _this.deleteptid
      //   })
      //   .then(function(res) {
      //     if (res.data.success === 1) {
      //       _this.$Message.success("删除成功");
      //       _this.pageNum = 1;
      //       _this.getmsglist();
      //       _this.closeallmodal();
      //     } else {
      //       _this.$Message.error(res.data.msg);
      //     }
      //   })
      //   .catch(function(error) {
      //     url_api.commonjs.checkError(error);
      //   });
    },
    //显示编辑弹窗
    editmsgmodal(ptid) {
      console.log(ptid);
      
      // const _this = this;
      // _this.ptid = ptid;
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + "/iext/back/ProductController/topicInfo",
      //     {
      //       ptid: _this.ptid
      //     },
      //     "get"
      //   )
      //   .then(function(res) {
      //     if (res.data.success === 1) {
      //       let map = res.data.body.map;
      //       _this.formItem = {
      //         topicLei: map.topicLei,
      //         url: map.url,
      //         permission: map.permission,
      //         describe: map.describes
      //       };
      //       _this.messagemodal = true;
      //     } else {
      //       _this.$Message.error(res.data.msg);
      //     }
      //   })
      //   .catch(function(error) {
      //     _this.$Message.error(error);
      //   });
      // _this.messagemodal = true;
    },
    showmsgmodal(postdata) {
      const _this = this;
      let proname = _this.map.productKey;
      let deviceName = '${deviceName}';
      _this.formItem.topicLei = `/${proname}/${deviceName}/user/`;
      _this.$refs[postdata].resetFields();
      _this.ptid = "";
      _this.messagemodal = true;
    },
    //取消弹窗
    closeallmodal() {
      const _this = this;
      _this.messagemodal = false;
      _this.delectmodal = false;
    }
  },
  watch: {},
  created() {
    this.getParams();
  },
  mounted() {
    this.getmsglist();
    this.getequdetail();
  }
};
</script>

<style>
</style>
