<template>
  <div class="home">
    <iframe
      :src="iframeUrl"
      frameborder="0"
      width="800"
      height="600"
      allowtransparency
    ></iframe>
    <div class="filter">
      <div class="filterItem">
        <Button @click="customSetting = !customSetting"
          >自定义筛选
          <i class="icon1 iconicon-xia" v-if="!customSetting"></i>
          <i class="icon1 iconicon-shang" v-if="customSetting"></i>
        </Button>
      </div>
    </div>
    <!-- 自定义筛选选择 -->
    <div class="custom" v-if="customSetting">
      <div class="triangle"></div>
      <div class="check" v-if="!alreadySetting">
        <Checkbox
          :indeterminate="indeterminate"
          :value="checkAll"
          @click.prevent.native="handleCheckAll"
          >全选</Checkbox
        >
        <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
          <Checkbox
            v-for="item in checkList"
            :key="item.index"
            :label="item.label"
          ></Checkbox>
        </CheckboxGroup>
        <div class="btn">
          <Button @click="cancelSetting">取消</Button>
          <Button type="primary" @click="confirmSetting">确定</Button>
        </div>
      </div>
      <!-- 自定义筛选确认后 -->
      <div class="searchSetting" v-if="alreadySetting">
        <div class="settingFilter">
          <div class="filterItem" v-for="item in selectedCheck" :key="item">
            <div style="margin-right:10px">{{ item }}</div>
            <Input placeholder="请输入搜索内容" style="width: 212px" />
          </div>
        </div>
        <div class="settingBtn">
          <div class="border"></div>
          <div class="changebtn" @click="changeSetting">增减筛选条件</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var jwt = require("jsonwebtoken");
export default {
  data() {
    return {
      METABASE_SITE_URL: "http://192.168.31.109:3000",
      METABASE_SECRET_KEY:
        "03b1856771a8fe25082d27878a754fa9c11b7df5de7fba64c86c845bb072704a",
      payload: {
        resource: { dashboard: 1 },
        params: {},
        exp: Math.round(Date.now() / 1000) + 10 * 60 // 10 minute expiration
      },
      token: jwt.sign(this.payload, this.METABASE_SECRET_KEY),
      iframeUrl:
        this.METABASE_SITE_URL +
        "/embed/dashboard/" +
        token +
        "#bordered=true&titled=true",

      customSetting: false,
      alreadySetting: false,
      indeterminate: false,
      checkAll: false,
      checkAllGroup: [],
      selectedCheck: [],
      checkList: [
        {
          index: 1,
          label: "单位名称"
        },
        {
          index: 2,
          label: "担当"
        },
        {
          index: 3,
          label: "应付单号"
        },
        {
          index: 4,
          label: "品名"
        }
      ]
    };
  },
  methods: {
    handleCheckAll() {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;
      if (this.checkAll) {
        this.checkAllGroup = this.checkList.map(function(item) {
          return item.label;
        });
      } else {
        this.checkAllGroup = [];
      }
    },
    checkAllGroupChange(data) {
      if (data.length === this.checkList.length) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length > 0) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
    },
    // 取消自定义筛选
    cancelSetting() {
      if (this.selectedCheck.length === 0) {
        this.checkAllGroup = [];
        this.indeterminate = false;
        this.checkAll = false;
        this.customSetting = !this.customSetting;
      } else {
        this.alreadySetting = !this.alreadySetting;
      }
    },
    // 确定自定义筛选
    confirmSetting() {
      if (this.checkAllGroup.length === 0) {
        this.$Message.warning("您未勾选任何筛选条件");
      } else {
        this.alreadySetting = !this.alreadySetting;
        this.selectedCheck = this.checkAllGroup;
      }
    },
    // 增减自定义筛选
    changeSetting() {
      this.alreadySetting = !this.alreadySetting;
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  .filter {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 32px;
    font-size: 14px;
    .filterItem {
      display: inline-flex;
      margin-right: 50px;
      margin-bottom: 20px;
      height: 32px;
      line-height: 32px;
      i {
        margin-left: 9px;
      }
      &:last-child {
        width: 132px;
        margin-right: 0px;
        button {
          position: absolute;
          right: 0px;
        }
      }
    }
  }
  .custom {
    position: relative;
    width: 100%;
    // min-height: 95px;
    background: #f5f5f5;
    margin-top: -35px;
    margin-bottom: 39px;
    padding: 16px 8px;
    .triangle {
      position: absolute;
      top: -14px;
      right: 60px;
      width: 0px;
      height: 0px;
      border-top: 0px solid transparent;
      border-left: 14px solid transparent;
      border-right: 14px solid transparent;
      border-bottom: 14px solid #f5f5f5;
    }
    .ivu-checkbox-wrapper {
      margin-right: 20px;
    }
    .ivu-checkbox-group {
      display: inline-block;
    }
    .btn {
      margin-top: 17px;
      text-align: right;
      button {
        &:nth-child(1) {
          margin-right: 41px;
        }
      }
    }
  }
  .searchSetting {
    display: flex;
    justify-content: space-between;
    margin-bottom: -20px;
    .settingFilter {
      display: flex;
      flex-wrap: wrap;
      font-size: 14px;
      .filterItem {
        display: inline-flex;
        margin-right: 50px;
        margin-bottom: 20px;
        height: 32px;
        line-height: 32px;
        &:last-child {
          margin-right: 0px;
        }
      }
    }
    .settingBtn {
      display: flex;
      line-height: 32px;
      .border {
        width: 1px;
        height: 14px;
        margin-right: 14px;
        background: #dcdada;
        margin-top: 9px;
      }
      .changebtn {
        color: #256de6;
        cursor: pointer;
      }
    }
  }
  .button {
    font-size: 14px;
    margin-bottom: 20px;
    margin-top: -20px;
    .buttonRow {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
      .left {
        .item {
          display: inline-block;
          margin-right: 30px;
          color: #256de6;
          &:nth-child(3) {
            margin-right: 20px;
          }
          &:nth-child(4) {
            width: 1px;
            height: 14px;
            background: #dcdada;
            margin-right: 20px;
            vertical-align: middle;
          }
        }
      }
    }
  }
}
</style>
