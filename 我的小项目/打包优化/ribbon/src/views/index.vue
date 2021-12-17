<template>
  <div id="index">
    <Header />
    <Rotation />
    <!-- 页面中间内容 -->
    <div class="content">
      <!-- 36个app -->
      <div class="app">
       
        <div class="title">线带纺织工业APP集群</div>
        <div class="app_content">
          <!-- 前12个app -->
          <ul>
            <li v-for="item in appList" :key="item.daId">
              <el-tooltip
              popper-class="tooltipInfo"
                :content="item.daInfo"
                placement="bottom"
              >
                <div style="width:100%;height:85%">
                  <!-- <router-link
                v-if="user !== null && user.duType === 2"
                :to="{
                  name: 'app',
                  params: { url: item.daUrl },
                }"
              >
                <i :class="item.daCron"></i>
                <div>{{ item.daName }}</div>
              </router-link> -->
                  <a
                    v-if="user !== null && user.duType === 2"
                    :href="item.daUrl"
                    target="_blank"
                  >
                    <i :class="item.daCron"></i>
                    <div>{{ item.daName }}</div>
                  </a>
                  <router-link
                    v-if="user !== null && user.duType === 1"
                    :to="{
                      name: 'manageCockpit',
                    }"
                  >
                    <i :class="item.daCron"></i>
                    <div>{{ item.daName }}</div>
                  </router-link>
                  <router-link
                    v-if="user === null"
                    :to="{
                      name: 'app',
                      params: {
                        url: 'http://11.dtsum.com' + item.daUrl,
                        name: item.daName,
                      },
                    }"
                  >
                    <i :class="item.daCron"></i>
                    <div>{{ item.daName }}</div>
                  </router-link>
                </div>
              </el-tooltip>
            </li>
          </ul>
          <!-- 点击全部展开的 -->
          <!-- <ul :id="showAll === true ? 'showmoreApp' : 'noshowApp'">
            <li v-for="item in appList.slice(14, appList.length)" :key="item.daId">
              <router-link
                v-if="user !== null && user.duType === 2"
                :to="{
                  name: 'app'
                }"
              >
                <i :class="item.daCron"></i>
                <div>{{ item.daName }}</div>
              </router-link>
              <router-link
                v-if="user !== null && user.duType === 1"
                :to="{
                  name: 'home',
                  params: { url: item.daUrl },
                }"
              >
                <i :class="item.daCron"></i>
                <div>{{ item.daName }}</div>
              </router-link>
              <router-link
                v-if="user === null"
                :to="{
                  name: 'login',
                }"
              >
                <i :class="item.daCron"></i>
                <div>{{ item.daName }}</div>
              </router-link>
            </li>
          </ul> -->
          <!-- <div
            class="all_btn"
            v-if="!showAll"
            @click="showAll = !showAll"
            @mouseover="handleMouseOver('chakan')"
            @mouseout="handleMouseOut('chakan')"
          >
            <img v-if="isMouseIn===false" src="../assets/images/icon/xiala.png" alt />
            <img v-else src="../assets/images/icon/xiala_white.png" alt />
            <span>查看全部工业APP产品</span>
          </div>
          <div
            class="all_btn"
            v-if="showAll"
            @click="showAll = !showAll"
            @mouseover="handleMouseOver('shouqi')"
            @mouseout="handleMouseOut('shouqi')"
          >
            <img v-if="isMouseIn===false" src="../assets/images/icon/shouqi.png" alt />
            <img v-else src="../assets/images/icon/shouqi_white.png" alt />
            <span>收起全部工业APP产品</span>
          </div> -->
        </div>
      </div>
      <!-- 平台能力 -->
      <div class="platform">
        <div class="title">平台能力</div>
        <p>
          将设备、人员、数据紧密有效的融合，提供稳定的平台基础服务和上层织造工业APP应用，构建全平台全产业链的织造行业工业互联网平台，助力企业实现
          数字化转型。
        </p>
        <ul>
          <li
            v-for="item in platform"
            :key="item.index"
            v-on:mouseover="iconNoShow(item.index)"
            v-on:mouseout="iconIsShow(item.index)"
          >
            <div class="platform_content">
              <div class="platform_title">{{ item.title }}</div>
              <img :id="'icon' + item.index" :src="item.url" alt />
              <div class="describe">{{ item.describe }}</div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 平台架构 -->
      <div class="platframe architecture">
        <div class="title">平台架构</div>
        <div class="platframe_content architecture">
              <img src="../assets/images/platformArchitecture.png"  style="width:1230px;height:608px;"/>
          
        </div>
      </div>
      <!-- 企业数字工厂业务场景 -->
      <div class="platframe scenario">
        <div class="title">企业数字工厂业务场景</div>
        <div class="platframe_content scenario">
              <img src="../assets/images/businessScenario.png"  style="width:1210px;height:703px;"/>
          
        </div>
      </div>
      <!-- 最佳实践 -->
      <div class="practice">
        <div class="title">最佳实践</div>
        <div class="practice_left">
          <img src="../assets/images/aoya.png" alt />
        </div>
        <div class="practice_right">
          <div class="practice_right_content">
            <div>
              平台以数字化驱动为核心，帮助整个工厂进行端到端生产赋能，实现了工序重现、组织重现、管理重构，带来的效率和成本的下降。
            </div>
            <div>——樊平(生产负责人)</div>
            <div>浙江澳亚织造股份有限公司</div>
          </div>
        </div>
      </div>
      <!-- 平台数据概况 -->
      <div class="data_overview">
        <div class="title">平台数据概况</div>
        <div class="overview_content">
          <img src="../assets/images/overview.jpg" alt />
          <div class="overview_number">
            <ul>
              <li>
                <div>企业用户</div>
                <div>
                  <span class="anime_number">{{
                    businessMessage.enterpriseNum
                  }}</span>
                </div>
              </li>
              <li>
                <div>接入设备</div>
                <div>
                  <span class="anime_number">{{
                    businessMessage.deviceNum
                  }}</span>
                </div>
              </li>
              <li>
                <div>有效工时</div>
                <div>
                  <span class="anime_number">{{
                    businessMessage.workHours
                  }}</span>
                </div>
              </li>
              <!-- <li>
                <div>累计工单</div>
                <div style="display:flex;width:150px;">
                  <span class="anime_number">{{
                    businessMessage.workOrderNum
                  }}</span>
                  <span>单</span>
                </div>
              </li>
              <li>
                <div>累计产量</div>
                <div style="display:flex;width:150px;">
                  <span class="anime_number">{{ businessMessage.output }}</span>
                  <span>米</span>
                </div>
              </li> -->
            </ul>
          </div>
        </div>
      </div>
      <!-- 文档与工具 -->
      <!-- <div class="tool">
        <div class="title">文档与工具</div>
        <div class="tool_content">
          <div
            :class="toolShow === false ? 'tools' : 'tools toolsover'"
            v-on:mouseover="toolShow = true"
            v-on:mouseout="toolShow = false"
          >
            <div class="text">
              <div>接入文档</div>
              <div>查看文档</div>
            </div>
            <img v-if="!toolShow" src="../assets/images/icon/wendang.png" alt />
            <img v-if="toolShow" src="../assets/images/icon/wendang_liang.png" alt />
          </div>
          <div
            :class="toolShow1 === false ? 'tools' : 'tools toolsover'"
            v-on:mouseover="toolShow1 = true"
            v-on:mouseout="toolShow1 = false"
          >
            <div class="text">
              <div>快速入门</div>
              <div>查看文档</div>
            </div>
            <img v-if="!toolShow1" src="../assets/images/icon/rumen_an.png" alt />
            <img v-if="toolShow1" src="../assets/images/icon/rumen_liang.png" alt />
          </div>
          <div
            :class="toolShow2 === false ? 'tools' : 'tools toolsover'"
            v-on:mouseover="toolShow2 = true"
            v-on:mouseout="toolShow2 = false"
          >
            <div class="text">
              <div>常见问题</div>
              <div>查看文档</div>
            </div>
            <img v-if="!toolShow2" src="../assets/images/icon/question.png" alt />
            <img v-if="toolShow2" src="../assets/images/icon/question_liang.png" alt />
          </div>
        </div>
      </div> -->
    </div>
    <Footer />
    <el-backtop :bottom="100">
      <div
        style="{
        background-color: #f2f5f6;
        box-shadow: 0px 5px 10px rgba(124, 124, 124, 0.16);
        text-align: center;
        line-height: 40px;
      }"
      ></div>
    </el-backtop>
  </div>
</template>

<script>
import Header from "../components/index/header.vue";
import Rotation from "../components/index/rotation.vue";
import Footer from "../components/index/footer.vue";
import scrollReveal from "scrollreveal";
import anime from "animejs/lib/anime.es.js";

export default {
  name: "index",
  components: {
    Header,
    Rotation,
    Footer,
  },
  data() {
    return {
      isMouseIn: false,
      scrollReveal: scrollReveal(),
      iconShow: true,
      showAll: false,
      toolShow: false,
      toolShow1: false,
      toolShow2: false,
      user: null,
      appList: [],
      platform: [
        {
          index: 1,
          title: "边缘数据采集",
          url: require("../assets/images/icon/caiji_liang.png"),
          describe:
            "自主研发生产的采集装置，适用于纺织线带生产设备。采集 设备生产过程中的开关机、生产异常、产量等数据。",
        },
        {
          index: 2,
          title: "IoT平台",
          url: require("../assets/images/icon/IOT.png"),
          describe:
            "通过IoT平台和网络技术实现织造设备的泛在连接，实现设备的 智能化识别和全生命周期管理。平台具备大数据的存储、分析、 可视化等开箱即用的模块。",
        },
        {
          index: 3,
          title: "设备监控",
          url: require("../assets/images/icon/jiankong.png"),
          describe:
            "面向整个工厂、车间，实时监控设备启停，自动采集设备断经、 断纬、卷带等异常类型数据，记录上报物料缺失信息。",
        },
        {
          index: 4,
          title: "生产管理",
          url: require("../assets/images/icon/guanli.png"),
          describe:
            "跟踪纺织线带生产工单全流程，包括整经、穿纱、改机、量产、 包装等工序。实时记录工人生产工时、工单产量、入库量信息， 让生产数据透明。",
        },
        {
          index: 5,
          title: "生产数据分析",
          url: require("../assets/images/icon/data_analysis.png"),
          describe:
            "多维度分析设备、员工数据，实时查看设备OEE、工作效率。用 数据驱动企业生产、管理效率。",
        },
        {
          index: 6,
          title: "工业APP",
          url: require("../assets/images/icon/app.png"),
          describe:
            "平台把针织线带行业生产相关技术过程中的知识、最佳实践及 技术诀窍封装成应用软件。实现线带行业生产管理模型化、模 块化、标准化和软件化。",
        },
      ],
      platframeList: [
        {
          index: 1,
          title: "织造行业工业互联网平台",
          describe:
            "加快推动全要素、全产业链、全价值链全面连接，构建全 新织造行业生产制造和服务体系，支撑高质量发展。",
        },
        {
          index: 2,
          title: "织造企业数字化工厂",
          describe: "帮助织造企业快速升级，提升数字化转型速度。",
        },
        {
          index: 3,
          title: "IoT平台",
          describe: "设备连接、大数据存储、分析基础平台。",
        },
        {
          index: 4,
          title: "织造行业产业链",
          describe:
            "连接织造行业产业链上下游，实现共享制造、金融授信、集采集售、超级工厂新业态新模式。",
        },
      ],
      businessMessage: {
        enterpriseNum: 3,
        deviceNum: 503,
        workOrderNum: 0,
        output: 0,
        workHours: 280000
      },
    };
  },
  created() {
    this.getAppList();
    this.getOverviewData();
  },
  mounted() {
    scrollReveal().reveal(".overview_number", {
      beforeReveal: () => {
        anime({
          targets: ".anime_number", //捕获数字区域
          innerHTML: (el) => {
            return [0, el.innerHTML];
          },
          duration: 2000, //执行时间
          round: 1, //数字按1增长，去掉那么按小数增长
          easing: "easeInExpo", //越来越快的动画效果
        });
      },
    });
  },
  methods: {
    //鼠标移入事件
    handleMouseOver(type) {
      let handleDom = document.getElementsByClassName("all_btn");
      switch (type) {
        case "chakan":
          handleDom[0].style.backgroundColor = "#1E90FF";
          this.isMouseIn = true;
          handleDom[0].getElementsByTagName("span")[0].style.color = "#FFF";
          break;
        case "shouqi":
          handleDom[0].style.backgroundColor = "#1E90FF";
          this.isMouseIn = true;
          handleDom[0].getElementsByTagName("span")[0].style.color = "#FFF";
          break;
      }
    },
    //鼠标移出事件
    handleMouseOut(type) {
      let handleDom = document.getElementsByClassName("all_btn");
      switch (type) {
        case "chakan":
          handleDom[0].style.backgroundColor = "#FFF";
          this.isMouseIn = false;
          handleDom[0].getElementsByTagName("span")[0].style.color = "#1E90FF";
          break;
        case "shouqi":
          handleDom[0].style.backgroundColor = "#FFF";
          this.isMouseIn = false;
          handleDom[0].getElementsByTagName("span")[0].style.color = "#1E90FF";
          break;
      }
    },
    iconNoShow(index) {
      document.getElementById("icon" + index).style.display = "none";
    },
    iconIsShow(index) {
      document.getElementById("icon" + index).style.display = "inline-block";
    },
    // app列表
    getAppList() {
      this.axios({
        method: "get",
        url: "/dtsum/app/appController/getAppList",
      })
        .then((res) => {
          if (res.data.success === 1) {
            var user = JSON.parse(sessionStorage.getItem("user"));
            this.user = user;
            for (let i = 0; i < res.data.body.appList.length; i++) {
              for (let j = 0; j < res.data.body.appList[i].sonApp.length; j++) {
                res.data.body.appList[i].sonApp[j].daCron =
                  res.data.body.appList[i].sonApp[j].daCron + " icon";
                if (user !== null) {
                  res.data.body.appList[i].sonApp[j].daUrl =
                    user.duHost + res.data.body.appList[i].sonApp[j].daUrl;
                }
                this.appList.push(res.data.body.appList[i].sonApp[j]);
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 平台数据的获取
    getOverviewData() {
      this.axios({
        method: "get",
        url: "/dtsum/user/enterpriseController/overview",
      })
        .then((res) => {
          if (res.data.success === 1) {
            // this.businessMessage = res.data.body.appList;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="scss">
#index {
  text-align: center;
  .content {
    .title {
      margin: 50px 0 40px 0;
      font-size: 28px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #333333;
    }
    // 36个APP
    .app {
      width: 1210px;
      margin-left: 50%;
      transform: translateX(-50%);
      .app_content {
        text-align: left;
        li {
          display: inline-block;
          width: 140px;
          height: 148px;
          background: #ffffff;
          box-shadow: 0px 5px 10px rgba(124, 124, 124, 0.16);
          border-radius: 10px;
          margin-right: 38px;
          margin-bottom: 36px;
          text-align: center;
          font-size: 14px;
          font-family: Source Han Sans CN;
          color: #333333;
          &:nth-child(7n) {
            margin-right: 0px;
          }
          .icon {
            display: inline-block;
            width: 52px;
            height: 52px;
            margin: 32px 0px 18px 0;
          }
          &:hover {
            background: #f3fbff;
            div {
              color: #1e90ff;
            }
          }
        }
        #showmoreApp {
          display: block;
        }
        #noshowApp {
          display: none;
        }
        .all_btn {
          margin: -6px 0px 0px 50%;
          transform: translateX(-50%);
          width: 400px;
          height: 40px;
          border: 1px solid #1e90ff;
          border-radius: 20px;
          text-align: center;
          line-height: 40px;
          cursor: pointer;
          img {
            margin-top: -5px;
            margin-right: 8px;
          }
          span {
            font-size: 14px;
            font-family: Source Han Sans CN;
            color: #1e90ff;
            letter-spacing: 5px;
          }
        }
      }
    }
    // 平台能力
    .platform {
      p {
        width: 1210px;
        margin: -10px 0px 41px 50%;
        transform: translateX(-50%);
        font-size: 14px;
        font-family: Source Han Sans CN;
        line-height: 40px;
        color: #333333;
        text-align: left;
      }
      ul {
        width: 1210px;
        margin: auto;
        border-top: 2px solid #e4e4e4;
        font-size: 0;
        li {
          position: relative;
          display: inline-block;
          width: 50%;
          height: 198px;
          border-bottom: 2px solid #e4e4e4;
          &:nth-child(2n-1) {
            border-right: 2px solid #e4e4e4;
            .platform_content {
              position: absolute;
              width: 392px;
              text-align: left;
              right: 210px;
              padding-left: 10px;
            }
          }
          &:nth-child(2n) {
            .platform_content {
              position: absolute;
              width: 572px;
              text-align: left;
              left: 60px;
              padding-right: 180px;
            }
          }
          &:nth-child(1):hover {
            background: #f3fbff url(../assets/images/icon/caiji_an.png)
              no-repeat 95% center;
          }
          &:nth-child(2):hover {
            background-color: #f3fbff;
            .platform_content {
              background: url(../assets/images/icon/IOT_an.png) no-repeat 92%
                center;
            }
          }
          &:nth-child(3):hover {
            background: #f3fbff url(../assets/images/icon/jiankong_an.png)
              no-repeat 95% center;
          }
          &:nth-child(4):hover {
            background-color: #f3fbff;
            .platform_content {
              background: url(../assets/images/icon/guanli_an.png) no-repeat 92%
                center;
            }
          }
          &:nth-child(5):hover {
            background: #f3fbff url(../assets/images/icon/data_an.png) no-repeat
              95% center;
          }
          &:nth-child(6):hover {
            background-color: #f3fbff;
            .platform_content {
              background: url(../assets/images/icon/app_an.png) no-repeat 92%
                center;
            }
          }
          .platform_content {
            .platform_title {
              display: inline-block;
              margin: 42px 20px 26px 0px;
              font-size: 18px;
              font-family: Source Han Sans CN;
              font-weight: 500;
              color: #333333;
            }
            img {
              margin-top: -10px;
            }
            .describe {
              font-size: 14px;
              font-family: Source Han Sans CN;
              color: #666666;
              line-height: 28px;
            }
          }
        }
      }
    }
    // 平台架构
    .platframe {
      height: 670px;
      &.architecture{
        height:710px;
      }
      &.scenario{
        height:805px;
      }
      .platframe_content {
        width: 100%;
        height: 568px;
        display: flex;
        justify-content: center;
        // .background_container {
        //   width: calc(50% - 605px);
        //   height: 568px;
        //   background-color: #f3fbff;
        // }
        &.architecture{
          height:608px;
        }
        &.scenario{
          height:703px;
        }
        .platframe_left {
          position: relative;
          width: 50%;
          height: 568px;
          background: #f3fbff;
          margin-right: 25px;
          .platframe_left_content {
            position: absolute;
            right: 0px;
            width: 605px;
            height: 100%;
            padding-top: 38px;
            text-align: center;
            font-size: 14px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            line-height: 40px;
            color: #333333;
          }
        }
        .platframe_right {
          width: 50%;
          height: 568px;
          .platframe_right_content {
            width: 605px;
            border-top: 1px solid #e4e4e4;
            li:nth-of-type(1) {
              position: relative;
              width: 100%;
              height: 142px;
              padding: 0px;
              border-bottom: 1px solid #e4e4e4;
              text-align: left;
              .platframe_title {
                position: absolute;
                top: 27px;
                font-size: 18px;
                font-family: Source Han Sans CN;
                font-weight: 500;
                color: #333333;
              }

              .platframe_describe {
                position: absolute;
                bottom: 27px;
                font-size: 14px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                line-height: 28px;
                color: #666666;
              }
            }
            li:nth-of-type(2),
            li:nth-of-type(3),
            li:nth-of-type(4) {
              position: relative;
              width: 100%;
              height: 142px;
              padding: 0px;
              border-bottom: 1px solid #e4e4e4;
              text-align: left;
              .platframe_title {
                position: absolute;
                top: 40px;
                font-size: 18px;
                font-family: Source Han Sans CN;
                font-weight: 500;
                color: #333333;
              }

              .platframe_describe {
                position: absolute;
                bottom: 40px;
                font-size: 14px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                line-height: 28px;
                color: #666666;
              }
            }
          }
        }
      }
    }
    // 最佳实践
    .practice {
      .practice_left {
        display: inline-block;
        width: 50%;
        height: 368px;
        text-align: right;
        vertical-align: top;
      }
      .practice_right {
        display: inline-block;
        width: 50%;
        height: 368px;
        background: #f3fbff;
        padding: 90px 105px 58px 82px;
        text-align: left;
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 40px;
        color: #1e90ff;
        text-align: justify;
        .practice_right_content {
          width: 525px;
          div {
            &:nth-child(2) {
              margin: 37px 0px 58px 0px;
              text-align: right;
            }
            &:nth-child(3) {
              text-align: right;
              color: #333333;
            }
          }
        }
      }
    }
    // 平台数据概况
    .data_overview {
      .overview_content {
        position: relative;
        img {
          width: 100%;
          height: 480px;
        }
        .overview_number {
          width: 1210px;
          height: 98px;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          // background: #ffffff;
          // filter: blur(5px);
          ul {
            display: flex;
            height: 100%;
            justify-content: space-between;
            font-size: 16px;
            font-family: Source Han Sans CN;
            color: #333333;
            li {
              width: 30%;
              height: 100%;
              padding: 16px 110px 22px 110px;
              border-left: 2px solid #efefef;
              text-align: center;
              &:last-child {
                border-right: 2px solid #efefef;
              }
              div {
                &:nth-child(2) {
                  margin-top: 12px;
                  font-size: 24px;
                  font-weight: 500;
                  color: #1e90ff;
                }
              }
            }
          }
        }
      }
    }
    // 文档与工具
    .tool_content {
      display: flex;
      justify-content: space-between;
      margin-left: 50%;
      transform: translateX(-50%);
      width: 1210px;
      height: 120px;
      margin-bottom: 100px;
      .toolsover {
        background: #f3fbff !important;
      }
      .tools {
        width: 312px;
        height: 100%;
        background: #ffffff;
        box-shadow: 0px 5px 10px rgba(124, 124, 124, 0.16);
        border-radius: 10px;
        .text {
          float: left;
          margin: 30px 0px 30px 30px;
          div {
            text-align: left;
            &:nth-child(1) {
              font-size: 18px;
              font-weight: 500;
              color: #333333;
              margin-bottom: 17px;
            }
            &:nth-child(2) {
              font-size: 14px;
              color: #1e90ff;
              cursor: pointer;
            }
          }
        }
        img {
          float: right;
          vertical-align: bottom;
          margin: 20px;
        }
      }
    }
  }
  .el-backtop {
    background: #fff url(../assets/images/icon/zhiding.png) no-repeat center
      center;
    width: 60px;
    height: 60px;
  }
}
</style>
