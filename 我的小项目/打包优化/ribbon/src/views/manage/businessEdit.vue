<template>
  <div id="businessEdit">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'businessManage' }"
        >企业管理</el-breadcrumb-item
      >
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
      class="demo-ruleForm"
    >
      <el-form-item label="企业名称：" prop="duName">
        <el-input v-model="ruleForm.duName"></el-input>
      </el-form-item>
      <el-form-item label="所属乡镇：" prop="areaIds">
        <!-- <el-input v-model="ruleForm.duRgnName"></el-input> -->
        <!-- <v-distpicker
            :province="province"
            city="广州市"
            area="海珠区"
          ></v-distpicker> -->
        <el-cascader
          placeholder="试试搜索：浙江省"
          :options="allAreaList"
          v-model="ruleForm.areaIds"
          filterable
        ></el-cascader>
      </el-form-item>
      <el-form-item label="主营产品：" prop="duProduct">
        <el-input v-model="ruleForm.duProduct"></el-input>
      </el-form-item>
      <el-form-item label="企业地址：" prop="duAddress">
        <el-input v-model="ruleForm.duAddress"></el-input>
      </el-form-item>
      <el-form-item label="联系人：" prop="duPerson">
        <el-input v-model="ruleForm.duPerson"></el-input>
      </el-form-item>
      <el-form-item label="联系方式：" prop="duPhone">
        <el-input v-model="ruleForm.duPhone"></el-input>
      </el-form-item>
      <el-form-item label="法人">
        <el-input v-model="ruleForm.duLegal"></el-input>
      </el-form-item>
      <el-form-item label="域名" prop="duHost">
        <el-input v-model="ruleForm.duHost"></el-input>
      </el-form-item>
      <el-form-item label="社会统一信用代码：" prop="duCode">
        <el-input v-model="ruleForm.duCode"></el-input>
      </el-form-item>
      <el-form-item label="行业：" prop="duIndustry">
        <el-input v-model="ruleForm.duIndustry"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm">取消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确定</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title:"企业新增",
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
      ruleFormCopy:{},
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
            message: "请输入正确的手机号",
            trigger: "blur",
          },
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
            message: "请输入正确的社会统一信用代码",
            trigger: "blur",
          },
        ],
        duIndustry: [
          { required: true, message: "请输入行业", trigger: "blur" },
        ],
        duHost: [{ required: true, message: "请输入域名", trigger: "blur" }],
      },
    };
  },
  mounted(){
    this.getAllAreaList()
    if(this.$route.query.id){
      this.watchDetail(this.$route.query.id)
      this.title="企业编辑"
    }
  },
  methods: {
    // 企业详情
    watchDetail(id) {
      this.axios({
        method: "get",
        url: "/dtsum/user/enterpriseController/enterpriseInfo",
        params: {
          enterpriseId: id,
        },
      })
        .then((res) => {
          if (res.data.success === 1) {
            this.ruleForm = res.data.body.enterpriseInfo;
            this.ruleFormCopy=JSON.parse(JSON.stringify(this.ruleForm))
            this.businessDetail = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.realSubmit();
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
      // this.ruleForm.duName = "";
      // this.ruleForm.areaIds = [];
      // this.ruleForm.duProduct = "";
      // this.ruleForm.duAddress = "";
      // this.ruleForm.duPerson = "";
      // this.ruleForm.duPhone = "";
      // this.ruleForm.duLegal = "";
      // this.ruleForm.duCode = "";
      // this.ruleForm.duIndustry = "";
      // this.ruleForm.duHost = "";
      this.ruleForm=JSON.parse(JSON.stringify(this.ruleFormCopy))
      this.businessEdit = false;
      this.businessDetail = false;
      this.$router.push({path:'businessDetail',query:{id:this.$route.query.id}})
    },
    // 获取地区列表
    getAllAreaList() {
      this.axios({
        method: "get",
        url: "/dtsum/user/enterpriseController/allAreaList",
      })
        .then((res) => {
          if (res.data.success === 1) {
            this.allAreaList = res.data.body.areaList;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 提交企业编辑
    realSubmit() {
      this.axios({
        method: "post",
        url: "/dtsum/user/enterpriseController/editEnterprise",
        data: this.ruleForm,
      })
        .then((res) => {
          if (res.data.success === 1) {
            this.$message.success(res.data.msg);
            this.$router.push('businessManage')
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
#businessEdit{
  .el-breadcrumb{
    padding-bottom: 21px;
    margin-bottom: 30px;
    border-bottom: 1px solid #E1E1E1;
  }
  .el-form-item{
    width: 482px;
     .el-cascader{
    width: 100%;
  }
  .el-button{
    &:nth-child(1){
      margin-right: 115px;
    }
  }
  }
}
</style>
