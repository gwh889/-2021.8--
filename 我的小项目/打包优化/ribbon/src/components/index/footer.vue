<template>
  <div id="footer">
    <div class="footer_content">
      <div class="left">
        <div class="logo"><img src="../../assets/images/logo.png" /></div>
        <div class="title"><span>浙江三象数据有限公司</span></div>
          <a class="content_text"
          target="blank"
            href="https://map.baidu.com/search/%E6%B5%99%E6%B1%9F%E7%9C%81%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%BD%99%E6%9D%AD%E5%8C%BA%E5%8D%97%E8%8B%91%E8%A1%97%E9%81%93%E6%96%B0%E4%B8%B0%E8%B7%AF199%E5%8F%B7%20%E4%BD%99%E6%9D%AD%E5%95%86%E4%BC%9A%E5%A4%A7%E5%8E%A62%E5%B9%A23a04%E5%AE%A4/@13392395.125,3532697,19z?querytype=s&da_src=shareurl&wd=%E6%B5%99%E6%B1%9F%E7%9C%81%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%BD%99%E6%9D%AD%E5%8C%BA%E5%8D%97%E8%8B%91%E8%A1%97%E9%81%93%E6%96%B0%E4%B8%B0%E8%B7%AF199%E5%8F%B7%20%E4%BD%99%E6%9D%AD%E5%95%86%E4%BC%9A%E5%A4%A7%E5%8E%A62%E5%B9%A23A04%E5%AE%A4&c=179&src=0&pn=0&sug=0&l=13&b=(13369839,3523563;13421039,3547787)&from=webmap&biz_forward=%7B%22scaler%22:1,%22styles%22:%22pl%22%7D&device_ratio=1"
          >
            浙江省杭州市余杭区南苑街道新丰路199号<br />余杭商会大厦2幢3A04室
          </a>
      </div>
      <div class="center">
        <div class="title"><span>联系我们</span></div>
        <span class="content_text">售前咨询：0571-88700015</span>
        <span class="content_text">商务合作：sanxiang@dtsum.com</span>
      </div>
      <div class="right">
        <div class="code"><img src="../../assets/images/code.png" /></div>
        <div class="right_text">
          <div class="title"><span>微信公众号</span></div>
          <div class="content_text">扫一扫</div>
          <div class="content_text">了解更多咨讯</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#footer {
  height: 248px;
  background: #4e4e4e;
  .footer_content {
    width:1210px;
    margin-left:50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
    letter-spacing: 0px;
    .title {
      margin-bottom: 30px;
      font-size: 18px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #ffffff;
      letter-spacing: 1px;
      opacity: 0.9;
    }
    .content_text {
      opacity: 0.5;
    }
    .left {
      display: flex;
      flex-direction: column;
      width: 500px;
      margin: 50px 0px 0px 0px;
      text-align: left;
      .logo {
        margin-bottom: 40px;
      }
      .content_text {
        cursor: pointer;
        color: #ffffff;
        &:hover {
          opacity: 0.9;
        }
      }
    }
    .center {
      display: flex;
      flex-direction: column;
      width: 500px;
      margin: 118px 0px 0px 0px;
      text-align: left;
    }
    .right {
      width: 350px;
      margin: 118px 0px 0px 0px;
      float: right;
      text-align: left;
      .code {
        display: inline-block;
        img {
          vertical-align: bottom;
        }
      }
      .right_text {
        width: 200px;
        display: inline-block;
        padding-left: 15px;
      }
    }
  }
}
</style>
