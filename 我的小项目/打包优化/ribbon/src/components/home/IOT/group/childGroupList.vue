<template>
  <table-List
    :equcolumns1="equcolumns1"
    :tableData="tableData"
    ref="smallequlist"
    :deptid="deptid"
    @getDataList="getDataList"
  ></table-List>
</template>

<script>
// import { useaxios } from '@/assets/js/axios'
// import { url_api } from '@/assets/js/common'
import tableList from './childGroupListCom.vue'
export default {
  components: { tableList },
  data () {
    return {
      deptid: '',
      id: '',
      selectdeptid: '',
      equcolumns1: [
        {
          title: '分组名称',
          key: 'pgName',
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
                      // this.$router.push({
                      //   path: '/equipment/equinfor',
                      //   query: { pdid: params.row.pdid }
                      // })
                    }
                  }
                },
                params.row.pgName
              )
            ])
          }
        },
        {
          title: '分组ID',
          key: 'pgId',
          tooltip: true
        },
        {
          title: '添加时间',
          key: 'pgCreattime',
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
                      // console.log(params.row)
                      this.deleteItem(params.row.pgId)
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      tableData: []
    }
  },
  methods: {
    getParams: function () {
      // 取到路由带过来的参数
      this.id = this.$route.query.pgid
    },
    // 删除设备
    deleteItem (id) {
      let _this = this
      _this.$refs.smallequlist.delectId = id
      _this.$refs.smallequlist.delectModal = true
      _this.$refs.smallequlist.deletetype = 1
    },
    // 获取列表
    getDataList () {
      // const _this = this
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + '/iext/back/GroupController/groupSonList',
      //     {
      //       pgid: _this.id,
      //       pgname: _this.$refs.smallequlist.text,
      //       pageNum: _this.$refs.smallequlist.pageNum,
      //       pageSize: _this.$refs.smallequlist.pageSize,
      //     },
      //     'get'
      //   )
      //   .then(function (res) {
      //     if (res.data.success === 1) {
      //       let list = res.data.body.list
      //       let result = list.result
      //       if (result.length <= 0) {
      //         _this.tableData = []
      //       } else {
      //         _this.tableData = result
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
    // let _this = this
    // const usertype = _this.$store.state.user.type
    // if (usertype == 1024) {
    //   _this.selectdeptid = _this.$store.state.user.cpid
    //   _this.deptid = _this.$store.state.user.cpid
    // }
    this.getParams()
  },
  mounted () {
    this.getDataList()
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
