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
        <Button
          class="white-btn"
          @click="equdelectmodal = true; deletetype = 2;"
        >批量删除</Button>
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
          v-if="!qiyeid"
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
            placeholder="请输入DeviceName"
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
          v-if="!qiyeid"
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
              src="../../../../assets/images/tip.png"
              class="modal-tip"
              style="top: 0"
            >
          </Poptip>
          <span>{{equbatchformItem.filename}}</span>
        </FormItem>
        <div class="filetip">单个文件不超过2M，一次最多包含1000条记录，<a
            type="text"
            class="blue-text-btn file-btn"
            @click="downfile"
          >下载.xls模板</a></div>
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

    <!-- 确认删除弹窗 -->
    <Modal
      v-model="equdelectmodal"
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
  </div>
</template>

<script>
// import { useaxios } from '@/assets/js/axios'
// import { url_api } from '@/assets/js/common'
// import axios from 'axios'

export default {
  name: 'minequlist',
  props: ['equcolumns1', 'equdata1', 'deptid', 'qiyeid'],
  data () {
    const valiequname = function (rule, value, callback) {
      if (value) {
        if (!/^[\u4e00-\u9fa5_a-zA-Z0-9_]{4,32}$/.test(value)) {
          return callback(
            new Error('设备名称：支持中文、英文字母、数字和下划线，4~32个字符')
          )
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      addmodalshow: 1,
      myprolist: [],
      mydeptlist: [],
      myplatlist: [], // 运营商列表
      text: '',
      total: 31,
      pageNum: 1,
      pageSize: 31,
      equaddequmodal: false, // 单个添加设备弹窗
      equbatchequmodal: false, // 批量添加设备弹窗
      equdelectmodal: false, // 删除弹窗
      delectequid: '',
      deletetype: 1,

      equformItem: {
        ppid: '',
        belong: '',
        deptid: '',
        devicename: ''
      },
      equbatchformItem: {
        ppid: '',
        belong: '',
        deptid: '',
        file: '',
        filename: ''
      },
      equuploadList: [],
      equselectarr: [],
      equruleValidate: {
        ppid: [
          {
            required: true,
            message: '请选择产品名称',
            trigger: 'change',
            type: 'number'
          }
        ],
        deptid: [
          {
            required: true,
            message: '请选择所属企业',
            trigger: 'change',
            type: 'number'
          }
        ],
        devicename: [
          {
            validator: valiequname,
            trigger: 'blur'
          }
        ]
      },
      equruleValidate2: {
        ppid: [
          {
            required: true,
            message: '请选择产品',
            trigger: 'change',
            type: 'number'
          }
        ],
        belong: [
          {
            required: true,
            message: '请选择所属物联网平台',
            trigger: 'change',
            type: 'number'
          }
        ],
        deptid: [
          {
            required: true,
            message: '请选择设备所属企业',
            trigger: 'change',
            type: 'number'
          }
        ],
        filename: [
          {
            required: true,
            message: '请上传文件',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    searchValue () {
      let str = this.text
      if (str.indexOf('_') != -1) {
        let arr = str.replace(/_/g, '')
        this.text = arr
      }
    },
    // 获取运营商列表
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
      //       _this.myplatlist = list
      //     } else {
      //       _this.$Message.error(res.data.msg)
      //     }
      //   })
      //   .catch(function (error) {
      //     _this.$Message.error(error)
      //   })
    },
    // 获取产品列表
    getprolist () {
      const _this = this
      var deptid = ''
      if (_this.deptid == '') {
        if (_this.addmodalshow == 1) {
          if (
            _this.equformItem.belong == undefined ||
            _this.equformItem.belong == ''
          ) {
            _this.mydeptlist = []
            return false
          } else {
            deptid = _this.equformItem.belong
          }
        } else {
          if (
            _this.equbatchformItem.belong == undefined ||
            _this.equbatchformItem.belong == ''
          ) {
            _this.mydeptlist = []
            return false
          } else {
            deptid = _this.equbatchformItem.belong
          }
        }
      } else {
        deptid = _this.deptid
      }
      console.log(deptid);
      
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + '/iext/back/IotController/chooseProductList',
      //     { deptid: deptid },
      //     'get'
      //   )
      //   .then(function (res) {
      //     if (res.data.success === 1) {
      //       let list = res.data.body.productList
      //       _this.myprolist = list
      //     } else {
      //       _this.$Message.error(res.data.msg)
      //     }
      //   })
      //   .catch(function (error) {
      //     console.log(error)
      //   })
    },
    // 获取企业列表
    getdeptlist () {
      const _this = this
      var deptid = ''
      if (_this.deptid == '') {
        if (_this.addmodalshow == 1) {
          if (
            _this.equformItem.belong == undefined ||
            _this.equformItem.belong == ''
          ) {
            _this.mydeptlist = []
            return false
          } else {
            deptid = _this.equformItem.belong
          }
        } else {
          if (
            _this.equbatchformItem.belong == undefined ||
            _this.equbatchformItem.belong == ''
          ) {
            _this.mydeptlist = []
            return false
          } else {
            deptid = _this.equbatchformItem.belong
          }
        }
      } else {
        deptid = _this.deptid
      }
      console.log(deptid);
      
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + '/iext/back/IotController/chooseDeptList',
      //     { deptid: deptid },
      //     'get'
      //   )
      //   .then(function (res) {
      //     if (res.data.success === 1) {
      //       let list = res.data.body.deptList
      //       _this.mydeptlist = list
      //     } else {
      //       _this.$Message.error(res.data.msg)
      //     }
      //   })
      //   .catch(function (error) {
      //     console.log(error)
      //   })
    },
    // 获取列表
    getlist () {
      this.$emit('getequlist')
    },
    // 修改每页条数
    pagesizechange (pagesize) {
      this.pageSize = pagesize
      this.pageNum = 1
      this.getlist()
    },
    // 修改页码
    pagenumberchange (pagenum) {
      this.pageNum = pagenum
      this.getlist()
    },
    // 上传文件
    loadfile () {
      var fileinput = this.$refs.fileinput
      if (
        fileinput.files[0].type != 'application/vnd.ms-excel' &&
        fileinput.files[0].type != ''
      ) {
        this.$Message.error('请上传xls格式的文件')
        return false
      }
      this.equbatchformItem.file = fileinput.files[0]
      this.equbatchformItem.filename = fileinput.files[0].name
    },
    // 选择表格
    selecttable (selection) {
      this.equselectarr = selection
    },
    // 确认添加
    handleSubmit (postdata) {
      console.log(postdata);
      
      // const _this = this

      // _this.$refs[postdata].validate(valid => {
      //   if (valid) {
      //     var deptid = ''
      //     if (_this.qiyeid) {
      //       deptid = _this.qiyeid
      //     } else {
      //       deptid = _this.equformItem.deptid
      //     }
      //     useaxios
      //       .axios(this.$api.baseUrl + '/iext/back/IotController/addDevice', {
      //         ppid: _this.equformItem.ppid,
      //         devicename: _this.equformItem.devicename,
      //         deptid: deptid
      //       })
      //       .then(function (res) {
      //         if (res.data.success === 1) {
      //           _this.$Message.success('创建成功')
      //           _this.pageNum = 1
      //           _this.getlist()
      //           _this.closeallmodal()
      //         } else {
      //           _this.$Message.error(res.data.msg)
      //         }
      //       })
      //       .catch(function (error) {
      //         url_api.commonjs.checkError(error)
      //       })
      //   }
      // })
    },
    // 批量上传
    bathSubmit (postdata) {
      const _this = this
      _this.$refs[postdata].validate(valid => {
        if (valid) {
          var deptid = ''
          if (_this.qiyeid) {
            deptid = _this.qiyeid
          } else {
            deptid = _this.equbatchformItem.deptid
          }
          // 添加设备
          let file = _this.equbatchformItem.file
          let ppid = _this.equbatchformItem.ppid
          let param = new FormData() // 创建form对象
          param.append('file', file, file.name) // 通过append向form对象添加数据
          param.append('ppid', ppid) // 添加form表单中其他数据
          param.append('deptid', deptid) // 添加form表单中其他数据
          // let config = {
          //   headers: { 'Content-Type': 'multipart/form-data' }
          // }
          // 添加请求头
          // axios
          //   .post(
          //     this.$api.baseUrl + '/iext/back/IotController/addDeviceList',
          //     param,
          //     config
          //   )
          //   .then(function (res) {
          //     if (res.data.success === 1) {
          //       _this.$Message.success('上传成功')
          //       _this.pageNum = 1
          //       _this.getlist()
          //       _this.closeallmodal()
          //     } else {
          //       _this.$Message.error(res.data.msg)
          //     }
          //   })
          //   .catch(function (error) {
          //     url_api.commonjs.checkError(error)
          //   })
        }
      })
    },
    // 确定删除
    delectequ () {
      const _this = this
      if (_this.deletetype == 1) {
        // useaxios
        //   .axios(
        //     this.$api.baseUrl + '/iext/back/IotController/deleteDeviceList',
        //     {
        //       ids: _this.delectequid
        //     }
        //   )
        //   .then(function (res) {
        //     if (res.data.success === 1) {
        //       _this.$Message.success('删除成功')
        //       _this.pageNum = 1
        //       _this.getlist()
        //       _this.closeallmodal()
        //     } else {
        //       _this.$Message.error(res.data.msg)
        //     }
        //   })
        //   .catch(function (error) {
        //     url_api.commonjs.checkError(error)
        //   })
      } else {
        const equselectarr = _this.equselectarr
        let equidstr = ''
        if (equselectarr.length > 0) {
          for (let i = 0; i < equselectarr.length; i++) {
            if (i == 0) {
              equidstr += '?ids=' + equselectarr[i].pdid
            } else {
              equidstr += '&ids=' + equselectarr[i].pdid
            }
          }
        } else {
          _this.$Message.error('请选择要删除的设备')
          return false
        }
        console.log(equidstr);
        
        // useaxios
        //   .axios(
        //     this.$api.baseUrl +
        //       '/iext/back/IotController/deleteDeviceList' +
        //       equidstr,
        //     {}
        //   )
        //   .then(function (res) {
        //     if (res.data.success === 1) {
        //       _this.$Message.success('删除成功')
        //       _this.pageNum = 1
        //       _this.getlist()
        //       _this.closeallmodal()
        //     } else {
        //       _this.$Message.error(res.data.msg)
        //     }
        //   })
        //   .catch(function (error) {
        //     url_api.commonjs.checkError(error)
        //   })
      }
    },
    // 点击取消
    handleReset () {
      const _this = this
      _this.equaddequmodal = false
    },
    showequmodal (postdata) {
      const _this = this
      _this.$refs[postdata].resetFields()
      _this.equaddequmodal = true
    },
    // 取消弹窗
    closeallmodal () {
      const _this = this
      _this.equaddequmodal = false
      _this.equdelectmodal = false
      _this.equbatchequmodal = false
    },
    // 下载文件
    downfile () {
      window.open('/static/Template.xls')
    }
  },
  created () {
    this.getplatlist()
    if (this.deptid != '') {
      this.getprolist()
    }
    if (this.deptid != '') {
      this.getdeptlist()
    }
  },
  mounted () {},
  watch: {
    newValue: {
      handler: function () {
        this.addmodalshow = 1
        // 获取企业列表
        this.getdeptlist()
        this.getprolist()
      },
      deep: true
    },
    newbathValue: {
      handler: function () {
        this.addmodalshow = 2
        // 获取企业列表
        this.getdeptlist()
        this.getprolist()
      },
      deep: true
    }
  },
  computed: {
    newValue () {
      return this.equformItem.belong
    },
    newbathValue () {
      return this.equbatchformItem.belong
    }
  }
}
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
</style>
