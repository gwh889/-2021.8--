<template>
  <div>
    <div class="infor-box">
      <div class="info-table-header">
        <div class="tab-title">分组信息</div>
        <Button type="primary" class="edit-btn" @click="showModal('addForm')">编辑</Button>
      </div>

      <Row class="infor-row">
        <Col span="3" class="infor-col-title">分组名称</Col>
        <Col span="6" class="infor-col-content">{{ tableData.pgName }}</Col>
        <Col span="3" class="infor-col-title">分组层级</Col>
        <Col span="4" class="infor-col-content">{{ tableData.pgGroupgrade }}</Col>
        <Col span="3" class="infor-col-title">分组ID</Col>
        <Col span="5" class="infor-col-content">
          <div class="col-mycontent no-wrap">{{ tableData.pgId }}</div>
          <Button
            type="text"
            class="blue-text-btn"
            style="padding:0 8px"
            v-clipboard:copy="tableData.pgid"
            v-clipboard:success="onCopy"
          >复制</Button>
        </Col>
      </Row>
      <Row class="infor-row">
        <Col span="3" class="infor-col-title">设备总数</Col>
        <Col span="6" class="infor-col-content">{{map.allNum}}</Col>
        <Col span="3" class="infor-col-title">激活设备</Col>
        <Col span="4" class="infor-col-content">{{ map.activateNum }}</Col>
        <Col span="3" class="infor-col-title">当前在线</Col>
        <Col span="5" class="infor-col-content">
          <div class="col-mycontent no-wrap">{{ map.onlineNum }}</div>
        </Col>
      </Row>

      <Row class="infor-row">
        <Col span="3" class="infor-col-title">创建时间</Col>
        <Col span="21" class="infor-col-content">
          <div class="col-mycontent">{{ tableData.pgCreattime }}</div>
        </Col>
      </Row>

      <Row class="infor-row">
        <Col span="3" class="infor-col-title">分组描述</Col>
        <Col span="21" class="infor-col-content">
          <div class="col-mycontent">{{ tableData.pgDesc }}</div>
        </Col>
      </Row>

      <Row class="infor-row" style="height: 1px"></Row>
    </div>
    <!-- 创建分组弹窗 -->
    <Modal v-model="modalFlag" title="编辑分组" width="634" :mask-closable="false">
      <Form :model="formItem" :rules="ruleValidate" :label-width="130" ref="addForm">
        <FormItem label="父组">
          <Input v-model="formItem.parentGroup" disabled style="width: 280px;" class="pro-name"/>
        </FormItem>
        <FormItem label="分组名称">
          <Input v-model="formItem.groupName" disabled style="width: 280px;" class="pro-name"/>
        </FormItem>
        <FormItem label="分组描述" prop="groupDisc">
          <Input
            type="textarea"
            :rows="4"
            v-model="formItem.groupDisc"
            :maxlength=101
            style="width: 280px;"
            class="pro-name"
          />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="handleReset" class="white-btn">取 消</Button>
        <Button type="primary" @click="handleSubmit('addForm')">确 定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
// import { useaxios } from '@/assets/js/axios'
// import { url_api } from '@/assets/js/common'

export default {
  data () {
    return {
      pgid: '',
      map: {},
      tableData: {},
      editmodel: 2,
      show: false,
      modalFlag: false, // 添加产品弹窗
      delectmodal: false, // 删除弹窗
      defaultProps: {
        children: 'groups',
        label: 'pgname'
      },
      formItem: {
        parentGroup: '', // 父组
        groupName: '', // 分组名称
        groupDisc: '' // 分组描述
      },
      ruleValidate: {
        groupDisc: [
          {
            type: 'string',
            max: 100,
            message: '分组描述不能超过100字',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    getParams () {
      // 取到路由带过来的参数
      this.pgid = this.$route.query.pgid
    },
    // 获取详情
    getDetail () {
      // const _this = this
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + '/iext/back/GroupController/groupInfo',
      //     {
      //       pgid: this.pgid
      //     },
      //     'get'
      //   )
      //   .then(function (res) {
      //     if (res.data.success === 1) {
      //       let resultData = res.data.body
      //       _this.map = resultData
      //       _this.tableData = resultData.pubgroup
      //       //  弹框重赋值
      //       _this.formItem.parentGroup = resultData.pubgroup.pgId
      //       _this.formItem.groupName = resultData.pubgroup.pgName
      //       _this.formItem.groupDisc = resultData.pubgroup.pgDesc
      //     } else {
      //       _this.$Message.error(res.data.msg)
      //     }
      //   })
      //   .catch(function (error) {
      //     _this.$Message.error(error)
      //   })
    },
    // copy
    onCopy () {
      this.$Message.success('复制成功')
    },
    // 显示隐藏
    showmysercet () {
      const _this = this
      if (_this.map.showsercet === 1) {
        _this.map.showsercet = 2
      } else {
        _this.map.showsercet = 1
      }
    },
    // 编辑
    handleSubmit (postdata) {
      console.log(postdata);
      
      // const _this = this
      // _this.$refs[postdata].validate(valid => {
      //   if (valid) {
      //     useaxios
      //       .axios(
      //         this.$api.baseUrl + '/iext/back/GroupController/updateGroupDesc',
      //         {
      //           groupId: this.pgid,
      //           groupDesc: this.formItem.groupDisc
      //         },
      //         'get'
      //       )
      //       .then(res => {
      //         if (res.data.success === 1) {
      //           this.$Message.success('修改成功')
      //           this.getDetail()
      //           this.closeallmodal()
      //         } else {
      //           this.$Message.error(res.data.msg)
      //         }
      //       })
      //       .catch(error => {
      //         url_api.commonjs.checkError(error)
      //       })
      //   }
      // })
    },
    // 点击取消
    handleReset () {
      this.show = false
      const _this = this
      _this.modalFlag = false
    },
    showModal (postdata) {
      const _this = this
      _this.$refs[postdata].resetFields()
      _this.modalFlag = true
    },
    // 取消弹窗
    closeallmodal () {
      this.show = false
      const _this = this
      _this.modalFlag = false
      _this.delectmodal = false
    }
  },
  watch: {},
  created () {
    this.getParams()
    this.getDetail()
  },
  mounted () {}
}
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
$infor-row-height: 56px;

.infor-box {
  margin-top: 16px;
  .ivu-tabs .ivu-tabs-tabpane {
    background: #ffffff;
    padding: 1px 24px 1px 24px;
    font-family: PingFang-jian;
    color: #263849;
    font-size: 14px;
  }
  .info-table-header {
    width: 100%;
    height: 36px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    margin-bottom: 16px;
    .tab-title {
      height: 36px;
      line-height: 36px;
      text-align: center;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(38, 56, 73, 1);
    }
    .edit-btn {
      float: right;
    }
  }
  .infor-row {
    display: flex;
    justify-content: space-between;
    height: $infor-row-height; /*no*/
    box-shadow: 0px -1px 0px 0px rgba(223, 227, 232, 1);
    flex-wrap: wrap;
    .infor-col-title {
      background: rgba(247, 250, 255, 1);
      box-shadow: 0px -1px 0px 0px rgba(223, 227, 232, 1);
      font-family: $main-fam-block;
      color: $main-font-color-block;
      height: $infor-row-height; /*no*/
      display: inline-flex;
      align-items: center;
      padding-left: 24px;
    }
    .infor-col-content {
      padding-left: 24px;
      background: #fff;
      height: $infor-row-height; /*no*/
      display: inline-flex;
      align-items: center;
      flex: 1;
      overflow-y: auto;
      .col-mycontent {
        padding-top: 18px;
        height: inherit;
        overflow-y: auto;
      }
    }
  }
}
</style>
