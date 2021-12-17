<template>
  <div class="maincontent">
    <div class="main-search">
      <div>
        <Button type="primary" @click="showpromodal('addprofrom')"
          >+ 创建产品</Button
        >
        <Input
          prefix="ios-search"
          placeholder="搜索"
          v-model="text"
          @on-enter="getlist"
          @on-blur="getlist"
          @keyup.native="searchValue"
        />
      </div>
    </div>
    <div class="main-table">
      <Table :columns="columns1" :data="data1"></Table>
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
    <!-- 创建产品弹窗 -->
    <Modal
      v-model="addpromodal"
      title="创建产品"
      width="634"
      :mask-closable="false"
    >
      <Form
        :model="formItem"
        :rules="ruleValidate"
        :label-width="130"
        ref="addprofrom"
      >
        <div class="add-title">
          <span>产品信息</span>
          <div></div>
        </div>
        <FormItem label="产品名称" prop="name">
          <Input
            v-model="formItem.name"
            placeholder="请输入产品名称"
            style="width: 280px;"
            class="pro-name"
          />
        </FormItem>
        <FormItem label="所属物联网平台" prop="deptid" v-if="!deptid">
          <Select v-model="formItem.deptid" style="width: 280px;" filterable>
            <Option value disabled style="color: #7A8693"
              >请选择产品所物联网平台</Option
            >
            <Option
              v-for="platlist in myplatlist"
              :value="platlist.deptid"
              :key="platlist.deptid"
              >{{ platlist.deptname }}</Option
            >
          </Select>
        </FormItem>
        <div class="add-title">
          <span>节点类型</span>
          <div></div>
        </div>
        <FormItem
          label="节点类型"
          prop="nodetype"
          style="display: flex;align-items:center"
          class="ml-none"
        >
          <RadioGroup
            v-model="formItem.nodetype"
            style="margin-left: -130px;display: block"
          >
            <Radio :label="1">设备</Radio>
            <Radio :label="2">网关</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          label="是否接入网关"
          prop="isjoin"
          v-if="formItem.nodetype == 1"
          style="display: flex;align-items:center"
          class="ml-none"
        >
          <RadioGroup v-model="formItem.isjoin" style="margin-left: -130px">
            <Radio :label="1">是</Radio>
            <Radio :label="2">否</Radio>
          </RadioGroup>
        </FormItem>
        <div class="add-title">
          <span>联网与数据</span>
          <div></div>
        </div>
        <FormItem
          label="接入网关协议"
          prop="protocol"
          v-if="formItem.isjoin == 1 && formItem.nodetype == 1"
        >
          <Select v-model="formItem.protocol" style="width: 280px;">
            <Option value>请选择网关协议</Option>
            <Option :value="1">Modbus</Option>
          </Select>
        </FormItem>
        <FormItem
          label="联网方式"
          prop="connectway"
          v-if="
            (formItem.isjoin == 2 && formItem.nodetype == 1) ||
              formItem.nodetype == 2
          "
        >
          <Select v-model="formItem.connectway" style="width: 280px;">
            <Option value>请选择联网方式</Option>
            <Option :value="1">wifi联网</Option>
            <Option :value="2">以太网</Option>
            <Option :value="3">蜂窝</Option>
          </Select>
        </FormItem>
        <FormItem label="数据格式" prop="dataformat">
          <Select v-model="formItem.dataformat" style="width: 280px;">
            <Option value>请选择数据格式</Option>
            <Option :value="1">Json</Option>
          </Select>
        </FormItem>
        <div class="add-title">
          <span>更多信息</span>
          <div></div>
        </div>
        <FormItem label="产品描述" prop="describe">
          <Input
            v-model="formItem.describe"
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 5 }"
            placeholder="请输入产品描述"
            style="width: 280px;"
          ></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="handleReset" class="white-btn">取 消</Button>
        <Button type="primary" @click="handleSubmit('addprofrom')"
          >确 定</Button
        >
      </div>
    </Modal>

    <!-- 确认删除弹窗 -->
    <Modal
      v-model="delectmodal"
      title="删除产品"
      width="634"
      :mask-closable="false"
      @on-ok="deletepro"
    >
      <Alert type="warning" show-icon>
        <template slot="desc"
          >删除产品将删除与该产品相关的数据，该操作无法撤销。</template
        >
      </Alert>
    </Modal>
  </div>
</template>

<script>
// import { useaxios } from '@/assets/js/axios'
// import { url_api } from '@/assets/js/common'

export default {
  name: "minprolist",
  data() {
    const valiname = function(rule, value, callback) {
      if (!/^[\u4e00-\u9fa5_a-zA-Z0-9_]{4,32}$/.test(value)) {
        return callback(new Error("请正确输入产品名称"));
      } else {
        callback();
      }
    };
    return {
      text: "",
      total: 0,
      pageNum: 1,
      pageSize: 10,
      addpromodal: false, // 添加产品弹窗
      delectmodal: false, // 删除弹窗
      myplatlist: [], // 运营商列表
      formItem: {
        name: "",
        deptid: "",
        nodetype: 1,
        isjoin: 1,
        protocol: 1,
        dataformat: 1,
        describe: "",
        connectway: "",
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "产品名称不能为空",
            trigger: "blur",
          },
          {
            validator: valiname,
            trigger: "blur",
          },
        ],
        deptid: [
          {
            required: true,
            message: "请选择所属物联网平台",
            trigger: "change",
            type: "number",
          },
        ],
        nodetype: [
          {
            required: true,
            message: "请选择节点类型",
            trigger: "change",
            type: "number",
          },
        ],
        isjoin: [
          {
            required: true,
            message: "请选择是否接入网关",
            trigger: "change",
            type: "number",
          },
        ],
        protocol: [
          {
            required: true,
            message: "请选择网关协议",
            trigger: "change",
            type: "number",
          },
        ],
        dataformat: [
          {
            required: true,
            message: "请选择数据格式",
            trigger: "change",
            type: "number",
          },
        ],
        connectway: [
          {
            required: true,
            message: "请选择联网方式",
            trigger: "change",
            type: "number",
          },
        ],
        describe: [
          {
            type: "string",
            max: 100,
            message: "产品描述不能超过100字",
            trigger: "blur",
          },
        ],
      },
    };
  },
  props: ["columns1", "data1", "deptid", "depttype"],
  methods: {
  //   // 获取运营商列表
  //   getplatlist () {
  //     const _this = this
  //     useaxios
  //       .axios(
  //         this.$api.baseUrl + '/iext/back/IotController/choosePlatformList',
  //         {},
  //         'get'
  //       )
  //       .then(function (res) {
  //         if (res.data.success === 1) {
  //           let list = res.data.body.list
  //           _this.myplatlist = list
  //         } else {
  //           _this.$Message.error(res.data.msg)
  //         }
  //       })
  //       .catch(function (error) {
  //         _this.$Message.error(error)
  //       })
  //   },
  //   // 修改每页条数
    pagesizechange (pagesize) {
      this.pageSize = pagesize
      this.pageNum = 1
      this.getlist()
    },
  //   // 修改页码
    pagenumberchange (pagenum) {
      this.pageNum = pagenum
      this.getlist()
    },
  //   searchValue () {
  //     let str = this.text
  //     if (str.indexOf('_') != -1) {
  //       let arr = str.replace(/_/g, '')
  //       this.text = arr
  //     }
  //   },
  //   // 获取列表
    getlist () {
      this.$emit('getprolist')
    },
  //   // 确认添加
  //   handleSubmit (postdata) {
  //     const _this = this
  //     _this.$refs[postdata].validate(valid => {
  //       if (valid) {
  //         var deptid = ''
  //         if (_this.deptid) {
  //           deptid = _this.deptid
  //         } else {
  //           deptid = _this.formItem.deptid
  //         }
  //         var connectway = ''
  //         var isjoin = ''
  //         var protocol = ''
  //         if (_this.formItem.nodetype == 2) {
  //           connectway = _this.formItem.connectway
  //         } else if (
  //           _this.formItem.nodetype == 1 &&
  //           _this.formItem.isjoin == 2
  //         ) {
  //           isjoin = _this.formItem.isjoin
  //           connectway = _this.formItem.connectway
  //         } else {
  //           isjoin = _this.formItem.isjoin
  //           protocol = _this.formItem.protocol
  //         }
  //         useaxios
  //           .axios(this.$api.baseUrl + '/iext/back/IotController/addProduct', {
  //             name: _this.formItem.name,
  //             nodetype: _this.formItem.nodetype,
  //             isjoin: isjoin,
  //             protocol: protocol,
  //             dataformat: _this.formItem.dataformat,
  //             describe: _this.formItem.describe,
  //             deptid: deptid,
  //             connectway: connectway
  //           })
  //           .then(function (res) {
  //             if (res.data.success === 1) {
  //               _this.$Message.success('创建成功')
  //               _this.pageNum = 1
  //               _this.getlist()
  //               _this.closeallmodal()
  //             } else {
  //               _this.$Message.error(res.data.msg)
  //             }
  //           })
  //           .catch(function (error) {
  //             url_api.commonjs.checkError(error)
  //           })
  //       }
  //     })
  //   },
  //   // 确定删除
    deletepro () {
      // const _this = this
      // if (_this.delectproid) {
      //   useaxios
      //     .axios(this.$api.baseUrl + '/iext/back/IotController/deleteProduct', {
      //       ppid: _this.delectproid,
      //       type: _this.depttype
      //     })
      //     .then(function (res) {
      //       if (res.data.success === 1) {
      //         _this.$Message.success('删除成功')
      //         _this.pageNum = 1
      //         _this.getlist()
      //         _this.closeallmodal()
      //       } else {
      //         _this.$Message.error(res.data.msg)
      //       }
      //     })
      //     .catch(function (error) {
      //       url_api.commonjs.checkError(error)
      //     })
      // }
    },
  //   // 点击取消
    handleReset () {
      const _this = this
      _this.addpromodal = false
    },
    showpromodal (postdata) {
      const _this = this
      _this.$refs[postdata].resetFields()
      _this.addpromodal = true
    },
  //   // 取消弹窗
    closeallmodal () {
      const _this = this
      _this.addpromodal = false
      _this.delectmodal = false
    }
  },
  // created () {
  //   this.getplatlist()
  // }
};
</script>

<style lang="scss" scoped>
.ivu-modal-body {
  .pro-name {
    .ivu-input {
      background: linear-gradient(180deg, white 0%, white 100%) !important;
    }
  }
}
</style>
