<template>
  <table-List
    :equcolumns1="equcolumns1"
    :equdata1="equdata1"
    ref="smallequlist"
    :deptid="deptid"
    @getequlist="getequlist"
  ></table-List>
</template>

<script>
// import { useaxios } from '@/assets/js/axios'
// import { url_api, format_time } from '@/assets/js/common'
import tableList from './addEquipToGroup.vue'
export default {
  components: { tableList },
  data () {
    return {
      deptid: '',
      id: '',
      selectdeptid: '',
      equcolumns1: [
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
          title: '设备所属企业',
          key: 'deptname',
          tooltip: true
        },
        {
          title: '节点类型',
          key: 'nodetype',
          tooltip: true,
          render: (h, params) => {
            const row = params.row
            const nodetype = row.nodetype
            var text1
            if (nodetype === 1) {
              text1 = '设备'
            } else {
              text1 = '网关'
            }
            return h('div', [h('span', {}, text1)])
          }
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
        },
        {
          title: '操作',
          key: 'id',
          minWidth: 100,
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
                    color: '#2980B9',
                    padding: '0 8px'
                  },
                  on: {
                    click: () => {
                      this.removeequ(params.row.pdid)
                    }
                  }
                },
                '从分组中删除'
              )
            ])
          }
        }
      ],
      equdata1: []
    }
  },
  methods: {
    getParams: function () {
      // 取到路由带过来的参数
      this.id = this.$route.query.pgid
    },
    // 删除设备
    removeequ (pdid) {
      let _this = this
      _this.$refs.smallequlist.delectequid = pdid
      _this.$refs.smallequlist.equdelectmodal = true
      _this.$refs.smallequlist.deletetype = 1
    },
    // 获取设备列表
    getequlist () {
      // const _this = this
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + '/iext/back/GroupController/getGroupDeviceList',
      //     {
      //       groupId: _this.id,
      //       deviceName: _this.$refs.smallequlist.text,
      //       pageNum: _this.$refs.smallequlist.pageNum,
      //       pageSize: _this.$refs.smallequlist.pageSize
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
      //         _this.equdata1 = result.map(item => {
      //           if (item.lasttime) {
      //             item.lasttime = format_time(item.lasttime, 'time')
      //           } else {
      //             item.lasttime = '--'
      //           }
      //           return item
      //         })
      //       }
      //       _this.$refs.smallequlist.total = list.total
      //       _this.$refs.smallequlist.pageNum = list.pageNum
      //       _this.$refs.smallequlist.pageSize = list.pageSize
      //       // _this.$store.commit('showequnum', [res.data.body.allNum, res.data.body.activeNum, res.data.body.onlineNum])
      //     } else {
      //       _this.$Message.error(res.data.msg)
      //     }
      //   })
      //   .catch(function (error) {
      //     _this.$Message.error(error)
      //   })
    }
  },
  created () {
    let _this = this
    const usertype = _this.$store.state.user.type
    if (usertype == 1024) {
      _this.selectdeptid = _this.$store.state.user.cpid
      _this.deptid = _this.$store.state.user.cpid
    }
    this.getParams()
  },
  mounted () {
    this.getequlist()
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
</style>
