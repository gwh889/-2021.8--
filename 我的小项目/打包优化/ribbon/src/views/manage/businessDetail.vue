<template>
  <div id="businessDetail">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'businessManage' }"
        >企业管理</el-breadcrumb-item
      >
      <el-breadcrumb-item>企业详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="150px"
        class="demo-ruleForm"
      >
        <el-form-item label="企业名称：" prop="duName">
          {{ ruleForm.duName }}
        </el-form-item>
        <el-form-item label="所属乡镇：" prop="areaIds">
          {{ ruleForm.duDarName }}
        </el-form-item>
        <el-form-item label="主营产品：" prop="duProduct">
          {{ ruleForm.duProduct }}
        </el-form-item>
        <el-form-item label="企业地址：" prop="duAddress">
          {{ ruleForm.duAddress }}
        </el-form-item>
        <el-form-item label="联系人：" prop="duPerson">
          {{ ruleForm.duPerson }}
        </el-form-item>
        <el-form-item label="联系方式：" prop="duPhone">
          {{ ruleForm.duPhone }}
        </el-form-item>
        <el-form-item label="法人">
          {{ ruleForm.duLegal }}
        </el-form-item>
        <el-form-item label="域名" prop="duHost">
          {{ ruleForm.duHost }}
        </el-form-item>
        <el-form-item label="社会统一信用代码：" prop="duCode">
          {{ ruleForm.duCode }}
        </el-form-item>
        <el-form-item label="行业：" prop="duIndustry">
          {{ ruleForm.duIndustry }}
        </el-form-item>
        <el-form-item>
        <router-link class="btn" :to="{name:'businessManage'}"><el-button>返回</el-button></router-link>
        <router-link class="btn" :to="{name:'businessEdit',query:{id:businessId}}"><el-button type="primary">编辑</el-button></router-link>
      </el-form-item>
      </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      businessId:'',
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
    this.watchDetail(this.$route.query.id)
    this.businessId=this.$route.query.id
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
#businessDetail{
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
  .btn{
    &:nth-child(1){
      margin-right: 115px;
    }
  }
  }
}
</style>
