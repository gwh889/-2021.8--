<template>
  <div id="rotation">
    <!-- <el-carousel trigger="click" height="150px"> -->
    <!-- <el-carousel-item v-for="item in images" :key="item.index"> -->
    <img v-if="showImage===0" src="../../assets/images/banner.jpg" alt="" />
    <div v-if="showImage===0" class="title">
      <div>线带纺织行业工业互联网平台</div>
      <div>助力线带纺织企业数字化转型升级</div>
    </div>
    <img v-if="showImage===1" src="../../assets/images/describe_banner.png" alt="" />
    <!-- <img :src="item.src" alt="" srcset=""> -->
    <!-- </el-carousel-item>
    </el-carousel> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      showImage:0, // 0是首页 1是介绍页
      images: [
        {
          index: 1,
          src: "/public/images/banner.png",
        },
      ],
    };
  },
  created(){
    if(this.$route.path==='/index'){
      this.showImage=0;
    }else{
      this.showImage=1;
    }
  }
};
</script>
<style lang="scss">
#rotation {
  position: relative;
  height: 480px;
  img {
    width: 100%;
    height: 100%;
  }
  .title {
    position: absolute;
    top: 225px;
    left: 158px;
    font-size: 30px;
    font-weight: 800;
    line-height: 25px;
    color: #ffffff;
    div {
      margin-bottom: 30px;
      text-align: left;
    }
  }
  div {
    //     position: absolute;
    //     top: 0;
    //     width: 100%;
    //     height: 100%;
    // background: #F3FBFF;
    // opacity: 0.6;
  }
  .el-carousel__container {
    height: 480px !important;
    img {
      width: 100% !important;
    }
  }
  .el-carousel__arrow {
    width: 64px;
    height: 64px;
  }
  .el-carousel__arrow--right {
    right: 50px;
    .el-icon-arrow-right {
      height: 32px;
      width: 32px;
      font-size: 32px;
      line-height: 32px;
    }
  }
  .el-carousel__arrow--left {
    left: 50px;
    .el-icon-arrow-left {
      height: 32px;
      width: 32px;
      font-size: 32px;
      line-height: 32px;
    }
  }
}
</style>
