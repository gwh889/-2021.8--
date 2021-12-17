<template>
  <div class="maincontent">
    <div class="main-search">
      <div>
        <Button type="primary" @click="showModal('addForm')">+ 新建分组</Button>
        <Button @click="refresh">刷新</Button>
         <Input
          prefix="ios-search"
          placeholder="请输入分组名称"
          v-model="text"
          @on-enter="getList"
          @on-blur="getList"
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
    <!-- 创建分组弹窗 -->
    <Modal v-model="modalFlag" title="新建分组" width="634" :mask-closable="false">
      <Form :model="formItem" :rules="ruleValidate" :label-width="130" ref="addForm">
        <FormItem label="父组" prop="parentGroupName">
          <div class="div-ipt" @click="show = !show">
            {{ formItem.parentGroupName }}
            <i class="ipt-icon"></i>
          </div>
          <transition name="fade">
            <div v-if="show" class="div-select">
              <Input
                v-model="name"
                class="parent-group"
                placeholder="请输入..."
                icon="ios-search"
                @on-blur="getGroupList"
              ></Input>
              <div class="div-tree">
                <el-tree
                  :data="parentGrouplist"
                  :props="defaultProps"
                  @node-click="handleNodeClick"
                ></el-tree>
              </div>
            </div>
          </transition>
          <i class="form-tips"></i>
        </FormItem>
        <FormItem label="分组名称" prop="groupName">
          <Input
            v-model="formItem.groupName"
            placeholder="请输入分组名称"
            style="width: 280px;"
            class="pro-name"
          />
        </FormItem>
        <i class="form-tips"></i>
        <FormItem label="分组描述" prop="groupDisc">
          <Input
            type="textarea"
            placeholder="请输入描述(不超过100字)"
            v-model="formItem.groupDisc"
            style="width: 280px;"
            :maxlength=101
            :rows="4"
            class="pro-name"
          />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="handleReset" class="white-btn">取 消</Button>
        <Button type="primary" @click="handleSubmit('addForm')">确 定</Button>
      </div>
    </Modal>

    <!-- 确认删除弹窗 -->
    <Modal
      v-model="delectModal"
      title="删除分组"
      width="634"
      :mask-closable="false"
      @on-ok="deleteGroup"
    >
      <Alert type="warning" show-icon>
        <template slot="desc">删除分组将删除与该分组相关的数据，该操作无法撤销。</template>
      </Alert>
    </Modal>
  </div>
</template>

<script>
// import { useaxios } from '@/assets/js/axios'
// import { url_api } from '@/assets/js/common'

export default {
  name: 'groupList',
  data () {
    // const valiname = function(rule, value, callback) {
    //   if (!/^[\u4e00-\u9fa5_a-zA-Z0-9_]{4,32}$/.test(value)) {
    //     return callback(new Error("请输入正确的分组名称"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      show: false,
      name: '',
      text: '',
      total: 0,
      pageNum: 1,
      pageSize: 10,
      delectId: '',
      modalFlag: false, // 添加产品弹窗
      delectModal: false, // 删除弹窗
      parentGrouplist: [], // 设备父组树状表
      parentGroupId: '',
      defaultProps: {
        children: 'groups',
        label: 'pgname'
      },
      formItem: {
        parentGroupName: '',
        groupName: '', // 分组名称
        groupDisc: '' // 分组描述
      },
      ruleValidate: {
        parentGroupName: [
          {
            required: false,
            message: '请选择父组',
            trigger: 'blur'
          }
        ],
        groupName: [
          {
            required: true,
            message: '请填写分组名称',
            trigger: 'blur'
          }
        ],
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
  props: [ 'columns1', 'data1' ],
  methods: {
    handleNodeClick (data) {
      this.parentGroupId = data.pgid
      this.formItem.parentGroupName = data.pgname
    },
    // 列表刷新
    refresh () {
      const _this = this
      _this.$Message.success('刷新成功！')
      this.$router.push('/group')
    },
    // 获取设备分组列表 多级
    getGroupList () {
      // const _this = this
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + '/iext/back/GroupController/getGroupListByName',
      //     {
      //       text: this.name
      //     },
      //     'get'
      //   )
      //   .then(function (res) {
      //     if (res.data.success === 1) {
      //       let list = res.data.body.list
      //       _this.parentGrouplist = list
      //     } else {
      //       _this.$Message.error(res.data.msg)
      //     }
      //   })
      //   .catch(function (error) {
      //     _this.$Message.error(error)
      //   })
    },
    // 监测三级分组
    checkTreeNode (treeData) {
      for (let i in treeData) {
        let num = 0
        if (treeData[i].childNode) {
          num += 1
          return this.checkTreeNode(treeData.childNode)
        }
        console.log(num);
        
      }
    },
    // 添加分组
    addGroupList () {
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + '/iext/back/GroupController/createDeviceGroup',
      //     {
      //       groupParentId: this.parentGroupId,
      //       groupName: this.formItem.groupName,
      //       groupDesc: this.formItem.groupDisc
      //     },
      //     'get'
      //   )
      //   .then(res => {
      //     if (res.data.success === 1) {
      //       this.$Message.success('创建成功')
      //       this.pageNum = 1
      //       this.getList()
      //       this.closeallmodal()
      //     } else {
      //       this.$Message.error(res.data.msg)
      //     }
      //   })
      //   .catch(error => {
      //     url_api.commonjs.checkError(error)
      //   })
    },
    // 修改每页条数
    pagesizechange (pagesize) {
      this.pageSize = pagesize
      this.pageNum = 1
      this.getList()
    },
    // 修改页码
    pagenumberchange (pagenum) {
      this.pageNum = pagenum
      this.getList()
    },
    searchValue () {
      let str = this.text
      if (str.indexOf('_') != -1) {
        let arr = str.replace(/_/g, '')
        this.text = arr
      }
    },
    // 获取列表
    getList () {
      this.$emit('getGroupList')
    },
    // 确认添加
    handleSubmit (postdata) {
      console.log(postdata);
      
      // const _this = this
      // _this.$refs[postdata].validate(valid => {
      //   if (valid) {
      //     useaxios
      //       .axios(
      //         this.$api.baseUrl + '/iext/back/GroupController/createDeviceGroup',
      //         {
      //           groupParentId: this.parentGroupId,
      //           groupName: this.formItem.groupName,
      //           groupDesc: this.formItem.groupDisc
      //         },
      //         'get'
      //       )
      //       .then(res => {
      //         if (res.data.success === 1) {
      //           this.$Message.success('创建成功')
      //           this.pageNum = 1
      //           this.getList()
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
    // 确定删除
    deleteGroup () {
      // const _this = this
      // useaxios
      //   .axios(this.$api.baseUrl + '/iext/back/GroupController/deleteGroup', {
      //     pgid: _this.delectId
      //   },
      //   'get'
      //   )
      //   .then(function (res) {
      //     if (res.data.success === 1) {
      //       _this.$Message.success('删除成功')
      //       _this.pageNum = 1
      //       _this.getList()
      //       _this.closeallmodal()
      //     } else {
      //       _this.$Message.error(res.data.msg)
      //     }
      //   })
      //   .catch(function (error) {
      //     url_api.commonjs.checkError(error)
      //   })
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
      _this.delectModal = false
    }
    // 判断是否是本元素
    // handleNodeClick(e) {
    //   if (this.$refs.cursor.contains(e.target)) {
    //     return;
    //   } else {
    //     this.show = false;
    //   }
    // }
  },
  created () {
    this.getGroupList()
  },
  mounted () {
    // document.addEventListener("click", this.handleNodeClick);
  }
}
</script>

<style lang="scss" scoped>
.div-ipt {
  width: 280px;
  height: 36px;
  line-height: 36px;
  box-sizing: border-box;
  padding: 0 5px;
  font-weight: 400;
  color: rgba(33, 43, 5, 1);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(249, 250, 251, 1) 100%
  );
  box-shadow: 0px 1px 0px 0px rgba(22, 29, 37, 0.05);
  border-radius: 3px;
  border: 1px solid rgba(196, 205, 213, 1);
  position: relative;
  .ipt-icon {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 6px;
    // background: url("../../../static/images/public/Select.png") center center
    //   no-repeat;
  }
}
.div-select {
  width: 278px;
  height: 242px;
  position: absolute;
  top: 42px;
  left: 0;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 16px 0px rgba(33, 43, 54, 0.08),
    0px 0px 0px 1px rgba(6, 44, 82, 0.1);
  z-index: 9;
  .parent-group {
    width: 264px;
    height: 36px;
    background: rgba(255, 255, 255, 1);
    // box-shadow:0px 1px 2px 0px rgba(102,113,123,0.21),0px 0px 0px 1px rgba(102,113,123,0.25);
    border-radius: 2px;
    border: 1px solid rgba(196, 205, 213, 1);
    margin: 7px;
  }
  .div-tree {
    width: 100%;
    height: 190px;
    overflow: hidden;
    overflow-y: scroll;
    box-sizing: border-box;
    padding: 0 8px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: height 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  height: 242px;
}

.main-search {
  .ivu-btn-default {
    border: 1px solid #c4cdd5;
  }
  .ivu-form-item-content {
    position: relative;
    i {
      width: 28px;
      height: 28px;
      box-sizing: border-box;
      padding: 4px;
      position: absolute;
      top: 50%;
      left: 288px;
      transform: translateY(-50%);
    }
  }
}
.ivu-modal-body {
  .pro-name {
    .ivu-input {
      background: linear-gradient(180deg, white 0%, white 100%) !important;
    }
  }
}
</style>
