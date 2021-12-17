<template>
  <div>
    <div class="main-search">
      <div>
        <Button type="primary" @click="showequmodal('addequfrom')">新建分组</Button>
        <Button class="white-btn">刷新</Button>
        <Input
          width="280"
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
      <Table :columns="equcolumns1" :data="tableData"></Table>
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
    <Modal v-model="modalFlag" title="新建分组" width="634" :mask-closable="false">
      <Form :model="formItem" :rules="ruleValidate" :label-width="130" ref="addForm">
        <FormItem label="父组">
          <Input
            v-model="formItem.parentGroupName"
            class="parent-group div-ipt"
            disabled
            icon="md-arrow-dropdown"
            style="width: 280px;"
          ></Input>
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
            placeholder="请输入描述"
            v-model="formItem.groupDisc"
            style="width: 280px;"
            :rows="4"
            class="pro-name"
          />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="handleReset" class="white-btn">取 消</Button>
        <Button type="primary" @click="addGroupList">确 定</Button>
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
// import { useaxios } from "@/assets/js/axios";
// import { url_api } from "@/assets/js/common";

export default {
  name: "minequlist",
  props: ["equcolumns1", "tableData"],
  data() {
    return {
      addmodalshow: 1,
      text: "",
      total: 0,
      id: 0,
      show: false,
      pageNum: 1,
      pageSize: 10,
      modalFlag: false, // 新增弹窗
      delectModal: false, // 删除弹窗
      delectId: "",
      deletetype: 1,
      formItem: {
        parentGroupName: "",
        groupName: "", // 分组名称
        groupDisc: "" // 分组描述
      },
      ruleValidate: {}
    };
  },
  methods: {
    getParams () {
      this.id = this.$route.query.pgid;
      this.formItem.parentGroupName = this.id
    },
    searchValue() {
      let str = this.text;
      if (str.indexOf("_") != -1) {
        let arr = str.replace(/_/g, "");
        this.text = arr;
      }
    },
    // 获取列表
    getList() {
      this.$emit("getDataList");
    },
    // 修改每页条数
    pagesizechange(pagesize) {
      this.pageSize = pagesize;
      this.pageNum = 1;
      this.getList();
    },
    // 修改页码
    pagenumberchange(pagenum) {
      this.pageNum = pagenum;
      this.getList();
    },
    addGroupList() {
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + "/iext/back/GroupController/createDeviceGroup",
      //     {
      //       groupParentId: this.id,
      //       groupName: this.formItem.groupName,
      //       groupDesc: this.formItem.groupDisc
      //     },
      //     "get"
      //   )
      //   .then(res => {
      //     if (res.data.success === 1) {
      //       this.$Message.success("创建成功");
      //       this.pageNum = 1;
      //       this.getList();
      //       this.closeallmodal();
      //     } else {
      //       this.$Message.error(res.data.msg);
      //     }
      //   })
      //   .catch(error => {
      //     url_api.commonjs.checkError(error);
      //   });
    },
    // 确定删除
    deleteGroup() {
      // const _this = this;
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + "/iext/back/GroupController/deleteGroup",
      //     {
      //       pgid: _this.delectId
      //     },
      //     "get"
      //   )
      //   .then(function(res) {
      //     if (res.data.success === 1) {
      //       _this.$Message.success("删除成功");
      //       _this.pageNum = 1;
      //       _this.getList();
      //       _this.closeallmodal();
      //     } else {
      //       _this.$Message.error(res.data.msg);
      //     }
      //   })
      //   .catch(function(error) {
      //     url_api.commonjs.checkError(error);
      //   });
    },
    // 点击取消
    handleReset() {
      const _this = this;
      _this.modalFlag = false;
    },
    showequmodal(postdata) {
      console.log(postdata);
      
      const _this = this;
      _this.modalFlag = true;
    },
    // 取消弹窗
    closeallmodal() {
      const _this = this;
      _this.modalFlag = false;
      _this.delectModal = false;
    },
  },
  created() {
    this.getParams();
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.div-ipt {
  width: 280px;
  box-sizing: border-box;
  box-shadow: 0px 1px 0px 0px rgba(22, 29, 37, 0.05);
  border-radius: 3px;
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
