<template>
  <div id="login">
    <div class="header">
      <router-link :to="{ name: 'index' }">
        <div class="title">
          <img src="../assets/images/icon/logo.png" alt="">
          线带纺织行业工业互联网平台
        </div>
      </router-link>
      <span class="line"></span>
      <span>登录</span>
    </div>
    <div class="login_form">
      <div class="form_title">登录</div>
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item prop="name">
          <img src="../assets/images/icon/number.png" alt="" />
          <el-input v-model="form.name" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <img src="../assets/images/icon/password.png" alt="" />
          <el-input
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')"
            >登 录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import md5 from 'js-md5'
export default {
  data() {
    return {
      form: {
        name: "",
        password: "",
      },
      rules: {
        name: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [
          { required: true, message: "请选输入密码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.login();
        } else {
          return false;
        }
      });
    },
    login() {
      const md5Password = md5(this.form.password)
       this.axios({
        method: 'post',
        url: '/dtsum/user/loginController/login',
        params: {
          username:this.form.name,
          password:md5Password
        }
      })
        .then(res => {
          if (res.data.success === 1) {
            this.$message.success(res.data.msg)
            sessionStorage.setItem("user",JSON.stringify(res.data.body.loginUser))
            
            if(res.data.body.loginUser.duType===1){
            this.$router.push('/manage/manageCockpit')
            }else{
             window.open('_blank').location=res.data.body.loginUser.duHost+"/index"
            }
          } else{
            this.$message.error(res.data.msg)
          }
        })
        .catch(error => console.log(error))
    }
  }
};
</script>
<style lang="scss" scoped>
#login {
  text-align: center;
  background: #f5f5f6;
  font-family: Source Han Sans CN;
  min-height: 100vh;
  .header {
    height: 64px;
    line-height: 64px;
    box-shadow: 0px 5px 10px rgba(124, 124, 124, 0.1);
    background: #fff;
    text-align: left;
    .title {
      display: inline-block;
      font-size: 24px;
      font-weight: bold;
      color: #2165ed;
      letter-spacing: 2px;
      margin-left: 30px;
      img{
        margin-right: 8px;
      transform: translateY(-2px);
      }
    }
    .line {
      position: relative;
      top: 15px;
      display: inline-block;
      width: 2px;
      height: 24px;
      background: #dcdada;
      margin: 5px 30px 0px 30px;
    }
    span {
      font-size: 18px;
      font-weight: 500;
      color: #333333;
      vertical-align: top;
    }
  }
  .login_form {
    width: 480px;
    height: 360px;
    background: #ffffff;
    box-shadow: 0px 5px 10px rgba(124, 124, 124, 0.1);
    margin: 0 auto;
    padding: 55px 50px;
    margin-top: 8%;
    .form_title {
      font-size: 24px;
      font-weight: 500;
      color: #314558;
      margin-bottom: 30px;
      letter-spacing: 10px;
    }
    .el-input {
      width: 87%;
    }
    .el-button {
      width: 360px;
      margin-top: 18px;
      margin-left: 15px;
    }
  }
}
</style>
<style lang="scss">
#login {
  .el-input__inner {
    border: none;
    border-bottom: 1px solid #e4e4e4;
  }
  .el-form-item__error {
    left: 17%;
  }
}
</style>
