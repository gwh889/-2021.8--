<template>
  <div>
    <div class="detail-search">
    </div>
    <div class="infor-table">
      <Table
        :columns="columns1"
        :data="data1"
      ></Table>
    </div>
    <div class="main-page">
      <Page
        :total="total"
        show-elevator 
        show-sizer
        show-total
        @on-page-size-change="pagesizechange"
        @on-change="pagenumberchange"
      />
    </div>
    <!-- 发布消息弹窗 -->
    <Modal
      v-model="addtopmodal"
      title="发布消息"
      :loading="true"
      width="634"
      :mask-closable="false"
    >
      <Alert
        type="warning"
        show-icon
      >
        <template slot="desc">
          注意：如果该Topic正在被应用使用，请谨慎操作，以防应用出现异常。
        </template>
      </Alert>
      <div class="message-basic"><span class="message-title">Topic：</span><span>{{formItem.url}}</span></div>
      <Form
        :model="formItem"
        :rules="ruleValidate"
        :label-width="130"
        ref="addtopform"
      >
        <FormItem
          label="消息内容"
          prop="content"
        >
          <Input
            v-model="formItem.content"
            type="textarea"
            :autosize="{minRows: 5,maxRows: 5}"
            placeholder="请输入消息内容"
            style="width: 280px;"
          ></Input>
        </FormItem>
        <FormItem
          label="Qos"
          prop="type"
          class="qos"
          style="display: flex; align-items: center;"
        >
          <RadioGroup v-model="formItem.type" style="margin-left: -130px; display: block">
            <Radio :label="1">读写</Radio>
            <Radio :label="2">只读</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button
          @click="closeallmodal"
          class="white-btn"
        >取 消</Button>
        <Button
          type="primary"
          @click="handleSubmit('addtopform')"
        >确 定</Button>
      </div>
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
      total: 0,
      pageNum: 1,
      pageSize: 10,
      addtopmodal: false,
      formItem: {
        type: 1,
        content: "",
        url: "",
        ptid: ""
      },
      ruleValidate: {
        type: [
          {
            required: true,
            message: "请选择节点类型",
            trigger: "change",
            type: "number"
          }
        ],
        content: [
          {
            required: true,
            message: "请输入消息内容",
            trigger: "blur"
          },
          {
            type: "string",
            max: 100,
            message: "描述不能超过100字",
            trigger: "blur"
          }
        ],
      },
      columns1: [
        {
          title: "设备的Topic",
          key: "url",
          tooltip: true,
          minWidth: 300
        },
        {
          title: "设备具有的权限",
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
          title: "发布消息数",
          key: "msgnum",
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
                      this.showtopmodal('addtopform');
                      this.formItem.ptid = params.row.ptid;
                      this.formItem.url = params.row.url;
                    }
                  }
                },
                "发布消息"
              )
            ]);
          }
        }
      ],
      data1: []
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
      this.gettoplist();
    },
    //修改页码
    pagenumberchange(pagenum) {
      this.pageNum = pagenum;
      this.gettoplist();
    },
    //显示弹窗
    showtopmodal(postdata) {
      //显示编辑弹窗
      const _this = this;
      _this.$refs[postdata].resetFields();
      _this.addtopmodal = true;
    },
    //确认添加
    handleSubmit(postdata) {
      console.log(postdata);
      
      // const _this = this;
      // _this.$refs[postdata].validate(valid => {
      //   if (valid) {
      //     useaxios
      //       .axios(
      //         this.$api.baseUrl + "/iext/back/DeviceController/publishMsg",
      //         {
      //           url: _this.formItem.url,
      //           content: _this.formItem.content,
      //           type: _this.formItem.type,
      //           ptid: _this.formItem.ptid
      //         }
      //       )
      //       .then(function(res) {
      //         if (res.data.success === 1) {
      //           _this.$Message.success("发送消息成功");
      //           _this.pageNum = 1;
      //           _this.gettoplist();
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
    //获取消息列表
    gettoplist() {
      // const _this = this;
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + "/iext/back/DeviceController/topicList",
      //     {
      //       pdid: _this.pdid,
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
      //       } else {
      //         _this.data1 = result;
      //         _this.total = list.total;
      //         _this.pageNum = list.pageNum;
      //         _this.pageSize = list.pageSize;
      //       }
      //     } else {
      //       _this.$Message.error(res.data.msg);
      //     }
      //   })
      //   .catch(function(error) {
      //     _this.$Message.error(error);
      //   });
    },
    //取消弹窗
    closeallmodal() {
      const _this = this;
      _this.addtopmodal = false;
    }
  },
  watch: {},
  created() {
    this.getParams();
  },
  mounted() {
    this.gettoplist();
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

</style>

