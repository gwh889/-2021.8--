<template>
  <div id="businessManage">
    <div class="search">
      <el-select v-model="type" placeholder="请选择">
        <el-option
          v-for="item in business"
          :key="item.type"
          :label="item.name"
          :value="item.type"
        >
        </el-option>
      </el-select>
      <el-input
        class="searchContent"
        v-model="searchText"
        placeholder="请输入内容"
      >
      <i class="el-icon-search el-input__icon" slot="suffix" @click="getBusinessList"></i>
      </el-input>
      <div class="xinzeng">
        <router-link :to="{name:'businessEdit'}">
          <el-button type="primary">新增企业</el-button>
        </router-link>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" :height="tableHeight">
      <el-table-column prop="duName" label="企业名称" width="180">
      </el-table-column>
      <el-table-column prop="duDarName" label="所属乡镇" width="180">
      </el-table-column>
      <el-table-column prop="duProduct" label="主营产品"> </el-table-column>
      <el-table-column prop="duAddress" label="企业地址"> </el-table-column>
      <el-table-column prop="duPerson" label="联系人"> </el-table-column>
      <el-table-column prop="duPhone" label="联系方式"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link :to="{name:'businessDetail',query: {id: scope.row.duId}}"><span class="opera">查看</span></router-link>
          <span class="line"></span>
          <span class="opera" @click="deleteBusiness(scope.row.duId)"
            >删除</span
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="pageSize"
      layout="prev, pager, next,total,sizes"
      :total="total"
    >
    </el-pagination>
    <!-- 删除弹窗 -->
    <el-dialog
      title="删除"
      :visible.sync="removeDialog"
      class="removeDialog"
      width="470px"
    >
      删除动作不可复原，确认要删除这条企业信息吗？
      <span slot="footer" class="dialog-footer">
        <el-button @click="removeDialog = false">取 消</el-button>
        <el-button type="primary" @click="realDeleteBusiness">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// import VDistpicker from "v-distpicker";
export default {
  // components: { VDistpicker },
  data() {
    return {
      tableHeight: 532,
      province: "广东省",
      business: [],
      type: "",
      searchText: "",
      pageNum: 1,
      pageSize: 10,
      currentPage: 1,
      total: 0,
      tableData: [
        {
          name: "浙江三象数据",
          town: "三里屯",
          product: "织带",
          address: "浙江",
          person: "李四",
          phone: "15243567898",
        },
      ],
      businessEdit: false,
      businessDetail: false,
      removeDialog: false,
      dialogTitle:"新增企业",
      allAreaList: [],
      ruleForm: {
        duName: "",
        areaIds: [],
        duProduct: "",
        duAddress: "",
        duPerson: "",
        duPhone: "",
        duLegal: "",
        duCode: "",
        duIndustry: "",
        duHost: "",
      },
      rules: {
        duName: [
          { required: true, message: "请输入企业名称", trigger: "blur" },
        ],
        areaIds: [{ required: true, message: "请选择乡镇", trigger: "change" }],
        duProduct: [
          { required: true, message: "请输入主营产品", trigger: "blur" },
        ],
        duAddress: [
          { required: true, message: "请输入企业地址", trigger: "blur" },
        ],
        duPerson: [
          { required: true, message: "请输入联系人", trigger: "blur" },
        ],
        duPhone: [
          { required: true, message: "请输入联系方式", trigger: "blur" },
          {
            required: true,
            pattern: /^1[34578]\d{9}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ],
        duLegal: [{ required: true, message: "请输入法人", trigger: "blur" }],
        duCode: [
          {
            required: true,
            message: "请输入社会统一信用代码",
            trigger: "blur",
          },
           {
            required: true,
            pattern: /[1-9]\d{14}/,
            message: '请输入正确的社会统一信用代码',
            trigger: 'blur'
          }
        ],
        duIndustry: [
          { required: true, message: "请输入行业", trigger: "blur" },
        ],
        duHost: [{ required: true, message: "请输入域名", trigger: "blur" }],
      },
      businessId: 0,
    };
  },
  created() {
    this.getSearchList();
    this.getBusinessList();
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.getBusinessList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getBusinessList();
    },
    // 获取查询条件列表
    getSearchList() {
      this.axios({
        method: "get",
        url: "/dtsum/user/enterpriseController/searchList",
      })
        .then((res) => {
          if (res.data.success === 1) {
            this.business = res.data.body.searchList;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取企业列表
    getBusinessList() {
      this.axios({
        method: "get",
        url: "/dtsum/user/enterpriseController/enterpriseList",
        params: {
          type: this.type,
          searchText: this.searchText,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        },
      })
        .then((res) => {
          if (res.data.success === 1) {
            this.tableData = res.data.body.enterpriseList.list;
            this.total = res.data.body.enterpriseList.total;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 删除企业
    deleteBusiness(id) {
      this.removeDialog = true;
      this.businessId = id;
    },
    realDeleteBusiness() {
      this.axios({
        method:"get",
        url:"/dtsum/user/enterpriseController/deleteEnterprise",
        params:{
          enterpriseId:this.businessId
        }
      })
      .then(res=>{
        if(res.data.success===1){
          this.$message.success(res.data.msg)
          this.removeDialog=false
          this.getBusinessList()
        }else{
          this.$message.error(res.data.msg)
          this.removeDialog=false
        }
      })
    },
  },
};
</script>
<style lang="scss">
#businessManage {
  font-family: Source Han Sans CN;
  text-align: left;
  .search {
    margin-bottom: 26px;
    .el-select{
      width: 160px;
    }
    .searchContent {
      width: 320px;
    }
    .xinzeng {
      float: right;
      margin-top: 10px;
      font-size: 16px;
      color: #1e90ff;
      cursor: pointer;
      img {
        margin-right: 8px;
      }
    }
  }
  .opera {
    color: #1e90ff;
    cursor: pointer;
  }
  .line {
    display: inline-block;
    position: relative;
    top: 2px;
    width: 1px;
    height: 15px;
    background: #dcdada;
    margin: 0px 20px;
  }
  .el-pagination {
    text-align: center;
    margin-top: 10px;
  }
  // 地区选择器
  // .distpicker-address-wrapper select {
  //   padding: 0px;
  //   font-size: 14px;
  //   border-radius: 5px;
  //   width: 150px;
  // }
}
</style>
