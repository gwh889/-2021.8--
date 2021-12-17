<template>
  <div>
    <div class="main-search">
      <div>
        <Button type="primary" @click="showModal=true">添加设备到分组</Button>
        <Button class="white-btn">刷新</Button>
        <Button class="white-btn" @click="equdelectmodal = true; deletetype = 2">批量删除</Button>
        <Input
          prefix="ios-search"
          placeholder="请输入 Devicename"
          v-model="text"
          @on-enter="getlist"
          @on-blur="getlist"
          @keyup.native="searchValue(text)"
        />
      </div>
    </div>
    <div class="main-table">
      <Table :columns="equcolumns1" :data="equdata1" @on-selection-change="selecttable"></Table>
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
    <!-- 添加设备到分组 -->
    <Modal v-model="showModal" title="添加设备到分组" width="735" @on-ok="addDeviceToGroup">
      <div class="main-search">
        <div>
          <i-select
            style="width: 240px"
            placeholder="全部产品"
            @on-change="selectFilt"
            clearable>
            <Input
              style="width: 210px"
              v-model="noAddName"
              class="parent-group"
              placeholder="产品名称"
              icon="ios-search"
            ></Input>
            <i-option v-for="(item, index) in modalTableData" :value="item.ppid" :key="index">{{ item.productname }}</i-option>
          </i-select>
          <Input
            prefix="ios-search"
            placeholder="请输入 Devicename"
            v-model="deviceName"
            @on-enter="getNoAddDeviceList"
            @on-blur="getNoAddDeviceList"
            @keyup.native="searchValue(deviceName)"
          />
          <Button :class="{ 'white-btn':!status, 'primary-btn':status }" @click="checkoutTable(true)">全部</Button>
          <Button :class="{ 'white-btn':status, 'primary-btn':!status }" @click="checkoutTable(false)">已选</Button>
        </div>
      </div>
      <div class="main-table">
        <Table :columns="modalTableHead" :data="modalTableData" @on-selection-change="selectModalTable"></Table>
      </div>
      <div class="main-page">
        <Page
          :total="modalTableParams.total"
          show-sizer
          show-elevator
          show-total
          :page-size="modalTableParams.pageSize"
          :current="modalTableParams.pageNum"
          @on-page-size-change="modalPageSizeChange"
          @on-change="modalPageNumChange"
        />
      </div>
    </Modal>

    <!-- 确认删除弹窗 -->
    <Modal
      v-model="equdelectmodal"
      title="删除设备"
      width="634"
      :mask-closable="false"
      @on-ok="delectDevice"
    >
      <Alert type="warning" show-icon>
        <template slot="desc">删除设备将删除与该设备相关的数据，该操作无法撤销。</template>
      </Alert>
    </Modal>
  </div>
</template>

<script>
// import { useaxios } from '@/assets/js/axios'
// import { url_api } from '@/assets/js/common'

export default {
  name: 'addEquipToGroup',
  props: ['equcolumns1', 'equdata1'],
  data () {
    return {
      id: 0,
      text: '',
      noAddName: '',
      total: 0,
      pageNum: 1,
      pageSize: 10,
      status: true,
      showModal: false, // 单个添加设备弹窗
      equdelectmodal: false, // 删除弹窗
      delectequid: 0,
      delectequidArr: [],
      selectTableData: [],
      deletetype: 1,
      pdIdArr: [],
      ppid: null,
      deviceName: '',
      // 弹框表格分页参数
      modalTableParams: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      },
      // 弹框表格 添加设备到分组
      modalTableHead: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: 'DeviceName',
          key: 'devicename',
          tooltip: true,
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  class: 'clickable',
                  props: {
                    type: 'text'
                  },
                  style: {
                    color: '#0366D6',
                    padding: '0',
                    width: '100%',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    textAlign: 'left'
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: '/equipment/equinfor',
                        query: { pdid: params.row.pdid }
                      })
                    }
                  }
                },
                params.row.devicename
              )
            ])
          }
        },
        {
          title: '设备所属产品',
          key: 'productname',
          tooltip: true
        },
        {
          title: '状态/启用状态',
          key: 'status',
          tooltip: true,
          render: (h, params) => {
            const row = params.row
            const status = row.status
            var color
            var text1
            if (status === 1) {
              text1 = '在线'
            } else if (status === 2) {
              text1 = '离线'
            } else if (status === 3) {
             text1 = '未激活'
              color = '#c2c2c2'
            }
            return h('div', [
              h(
                'i',
                {
                  style: {
                    background: color,
                    width: '6px',
                    height: '6px',
                    borderRadius: '3px',
                    display: 'inline-block',
                    position: 'relative',
                    bottom: '1px',
                    marginRight: '4px'
                  },
                  class: {
                    mintip: true
                  }
                },
                ''
              ),
              h('span', {}, text1)
            ])
          }
        },
        {
          title: '最后上线时间',
          key: 'lasttime',
          tooltip: true
        }
      ],
      // 弹框 table 数据
      modalTableData: []
    }
  },
  methods: {
    selectFilt (value) {
      this.ppid = value
      this.getNoAddDeviceList()
    },
    searchValue (input) {
      // let str = this.text
      let str = input
      if (str.indexOf('_') != -1) {
        let arr = str.replace(/_/g, '')
        this.text = arr
      }
    },
    // 获取路由参数
    getParams () {
      this.id = this.$route.query.pgid
    },
    // 获取列表
    getlist () {
      this.$emit('getequlist')
    },
    // 获取未分组的列表
    getNoAddDeviceList () {
      // const _this = this
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + '/iext/back/GroupController/getNoAddDeviceList',
      //     {
      //       groupId: _this.id,
      //       deviceName: this.deviceName,
      //       productId: this.ppid,
      //       pageNum: _this.modalTableParams.pageNum,
      //       pageSize: _this.modalTableParams.pageSize
      //     },
      //     'get'
      //   )
      //   .then(function (res) {
      //     if (res.data.success === 1) {
      //       let list = res.data.body.list
      //       let result = list.result
      //       if (result.length <= 0) {
      //         _this.modalTableData = []
      //       } else {
      //         // _this.modalTableData = result
      //         _this.modalTableData = result.map(item => {
      //           if (item.lasttime) {
      //             item.lasttime = format_time(item.lasttime, 'time')
      //           } else {
      //             item.lasttime = '--'
      //           }
      //           return item
      //         })
      //       }
      //       _this.modalTableParams.total = list.total
      //       _this.modalTableParams.pageNum = list.pageNum
      //       _this.modalTableParams.pageSize = list.pageSize
      //     } else {
      //       _this.$Message.error(res.data.msg)
      //     }
      //   })
      //   .catch(function (error) {
      //     _this.$Message.error(error)
      //   })
    },
    // 修改每页条数
    pagesizechange (pagesize) {
      this.pageSize = pagesize
      this.pageNum = 1
      this.getlist()
    },
    modalPageSizeChange (pagesize) {
      this.modalTableParams.pageSize = pagesize
      this.modalTableParams.pageNum = 1
      this.getNoAddDeviceList()
    },
    // 修改页码
    pagenumberchange (pagenum) {
      this.pageNum = pagenum
      this.getlist()
    },
    modalPageNumChange (pagenum) {
      this.modalTableParams.pageNum = pagenum
      this.getNoAddDeviceList()
    },
    // 选择表格
    selecttable (selection) {
      this.delectequidArr = selection
    },
    selectModalTable (selection) {
      this.pdIdArr = selection
      // this.selectTableData = selection
    },
    // 确认添加
    addDeviceToGroup () {
      const _this = this
      const pdIdArr = _this.pdIdArr
      let equidstr = ''
      if (pdIdArr.length > 0) {
        for (let i = 0; i < pdIdArr.length; i++) {
          if (i === 0) {
            equidstr += '?deviceIds=' + pdIdArr[i].pdid
          } else {
            equidstr += '&deviceIds=' + pdIdArr[i].pdid
          }
        }
      } else {
        _this.$Message.error('未选择设备！')
        return false
      }
      console.log(equidstr);
      
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + '/iext/back/GroupController/addDeviceToGroup' + equidstr,
      //     {
      //       groupId: _this.id
      //     },
      //     'get'
      //   )
      //   .then(function (res) {
      //     if (res.data.success === 1) {
      //       _this.$Message.success('添加成功')
      //       _this.pageNum = 1
      //       _this.getlist()
      //       _this.closeallmodal()
      //     } else {
      //       _this.$Message.error(res.data.msg)
      //     }
      //   })
      //   .catch(function (error) {
      //     debugger
      //     url_api.commonjs.checkError(error)
      //   })
    },
    delectDevice () {
      const _this = this
      if (this.deletetype === 1) {
        // useaxios
        //   .axios(
        //     this.$api.baseUrl + '/iext/back/GroupController/deleteOneGroupDevice',
        //     {
        //       pgid: _this.id,
        //       pdid: _this.delectequid
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
        const delectequidArr = _this.delectequidArr
        let equidstr = ''
        if (delectequidArr.length > 0) {
          for (let i = 0; i < delectequidArr.length; i++) {
            if (i === 0) {
              equidstr += '?pdids=' + delectequidArr[i].pdid
            } else {
              equidstr += '&pdids=' + delectequidArr[i].pdid
            }
          }
        } else {
          _this.$Message.error('请选择要删除的设备')
          return false
        }
        console.log(equidstr);
        
        // useaxios
        //   .axios(
        //     this.$api.baseUrl + '/iext/back/GroupController/deleteGroupDeviceList' + equidstr,
        //     {
        //       pgid: _this.id
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
      }
    },
    // 点击取消
    handleReset () {
      const _this = this
      _this.showModal = false
    },
    // 取消弹窗
    closeallmodal () {
      this.showModal = false
      this.equdelectmodal = false
    },
    // 全部 已选切换
    checkoutTable (flag) {
      this.status = flag
      if (this.status) {
        this.getNoAddDeviceList()
      } else {
        this.modalTableData = this.pdIdArr
      }
    }
  },
  created () {
    this.getNoAddDeviceList()
    this.getParams()
  },
  mounted () {

  },
  watch: {

  },
  computed: {

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
