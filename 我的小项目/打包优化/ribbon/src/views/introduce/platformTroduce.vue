<template>
  <div id="platformTroduce">
    <Header />
    <Rotation />
    <!-- 页面中间内容 -->
    <div class="content">
      <div class="content_plate">
        <div class="title">设备管理模块</div>
        <div class="troduce">
          <div class="troduce_top">
            <p>
              解决织机设备的生产监控面临产量不准确、生产数据延时，超产无效生产的问题。
            </p>
            <p>
              通过对织机加装PLC等数据采集器，自动采集设备运行及技术状态参数，包括设备启停、运行，设备异常，如断经、断纬、卷带，以及织带产量、员工操作等实时数据。
            </p>
          </div>
          <div class="troduce_bottom">
            <div class="troduce_bottom_left">
              <img :src="deviceMonitorImg" />
            </div>
            <div class="troduce_bottom_right">
              <ul>
                <li
                  v-for="item in deviceManageList"
                  :key="item.index"
                  :class="deviceManageIndex === item.index ? 'active' : ''"
                  @click="changeDevicePlate(item.index)"
                >
                  {{ item.name }}
                  <span></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="content_plate product">
        <div class="title">生产执行</div>
        <div class="troduce">
          <div class="troduce_top">
            <p>
              实时跟踪每一道工序中的人、机、料、法的信息。实时采集设备生产过程中的状态、异常、产量数据上传至云端，工位电脑记录员工工时，计入工资结算中，自动化处理
              人员班次切换、有效工时计算，补卡功能。
            </p>
          </div>
          <div class="troduce_bottom">
            <div class="troduce_bottom_left">
              <ul>
                <li
                  v-for="item in productManageList"
                  :key="'product' + item.index"
                  :class="productManageIndex === item.index ? 'active' : ''"
                  @click="changeProductPlate(item.index)"
                >
                  <span></span>
                  {{ item.name }}
                </li>
              </ul>
            </div>
            <div class="troduce_bottom_right">
              <img :src="productMonitorImg" />
            </div>
          </div>
        </div>
      </div>
      <div class="content_plate">
        <div class="title">效率监控</div>
        <div class="troduce">
          <div class="troduce_top">
            <p>
              车间生产监控包括设备监控、工单监控。可以实时查看车间设备运行状态，工单的生产进度。
            </p>
          </div>
          <div class="troduce_bottom">
            <div class="troduce_bottom_left">
              <img :src="efficiencyMonitorImg" />
            </div>
            <div class="troduce_bottom_right">
              <ul>
                <li
                  v-for="item in efficiencyManageList"
                  :key="'efficiency' + item.index"
                  :class="efficiencyManageIndex === item.index ? 'active' : ''"
                  @click="changeEfficiencyPlate(item.index)"
                >
                  {{ item.name }}
                  <span></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="content_plate">
        <div class="title">数据分析</div>
        <div class="troduce">
          <div class="troduce_bottom">
            <div class="troduce_bottom_left">
              <img :src="dataMonitorImg" />
            </div>
            <div class="troduce_bottom_data_right">
              <div class="active">
                <span></span>
                订单燃尽图
              </div>
              <div>
                <p>
                  系统的统计报表模块支持自定义报表，
                  默认涵盖了故障停机报表，生产报表、
                  工厂效率分析、巡检分析、产品质量 分析。
                </p>
                <p>
                  每种报表可以按照机台、员工、时间、
                  工单等多维度即时查询，对车间设备、
                  操作工、机修工的工作效率对比分析。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content_plate">
        <div class="title">支持终端</div>
        <div class="terminal_troduce">
          <div class="describe">
            <div class="title">多端协调使用</div>
            <div>
              为满足不同工厂人员使用场景，系统支持Web端、微信小程序、工位电脑端。
            </div>
          </div>
          <div>
            <div class="web">
              <img src="../../assets/images/terminal/manage.png" />
            </div>
            <i class="iconfont iconicon-webduan"></i>web端
          </div>
          <div>
            <div class="applets">
              <img src="../../assets/images/terminal/iphone.png" />
            </div>
            <i class="iconfont iconicon-xiaochengxu"></i>微信小程序
          </div>
          <div>
            <div class="pad">
              <img src="../../assets/images/terminal/pad.png" />
            </div>
            <i class="iconfont iconicon-diannao"></i>工位电脑
          </div>
        </div>
      </div>
      <div class="content_plate">
        <div class="title">实施步骤</div>
        <div class="troduce">
          <ul class="impletmentSteps">
            <li v-for="item in implementSteps" :key="'step' + item.index">
              <img :src="item.image" />
              <div>
                <div class="circle">{{item.index}}</div>
                <div>{{ item.name }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
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
import Header from "../../components/index/header.vue";
import Rotation from "../../components/index/rotation.vue";
import Footer from "../../components/index/footer.vue";

export default {
  components: {
    Header,
    Rotation,
    Footer
  },
  data() {
    return {
      deviceManageIndex: 0,
      deviceMonitorImg: require("../../assets/images/device/deviceMonitor.jpg"),
      deviceManageList: [
        {
          index: 1,
          name: "设备监控",
          image: require("../../assets/images/device/deviceMonitor.jpg")
        },
        {
          index: 2,
          name: "计划保养",
          image: require("../../assets/images/device/planMaintain.png")
        },
        {
          index: 3,
          name: "设备故障",
          image: require("../../assets/images/device/deviceBreak.png")
        },
        {
          index: 4,
          name: "设备停机图",
          image: require("../../assets/images/device/shutDown.png")
        }
      ],
      productManageIndex: 0,
      productMonitorImg: require("../../assets/images/product/threading.png"),
      productManageList: [
        {
          index: 1,
          name: "穿纱",
          image: require("../../assets/images/product/threading.png")
        },
        {
          index: 2,
          name: "改机",
          image: require("../../assets/images/product/changeMachine.png")
        },
        {
          index: 3,
          name: "首检",
          image: require("../../assets/images/product/firstInspection.png")
        },
        {
          index: 4,
          name: "量产",
          image: require("../../assets/images/product/moreProduct.png")
        },
        {
          index: 5,
          name: "包装",
          image: require("../../assets/images/product/packing.png")
        }
      ],
      efficiencyManageIndex: 0,
      efficiencyMonitorImg: require("../../assets/images/efficiencyMonitor/OEE.png"),
      efficiencyManageList: [
        {
          index: 1,
          name: "OEE分析",
          image: require("../../assets/images/efficiencyMonitor/OEE.png")
        },
        {
          index: 2,
          name: "量产详情",
          image: require("../../assets/images/efficiencyMonitor/outputDetail.png")
        },
        {
          index: 3,
          name: "工单监控",
          image: require("../../assets/images/efficiencyMonitor/orderMonitor.jpg")
        }
      ],
      dataMonitorImg: require("../../assets/images/dataAnalysis/order.png"),
      implementSteps: [
        {
          index: 1,
          name: "现场勘测",
          image: require("../../assets/images/implementSteps/step1.png")
        },
        {
          index: 2,
          name: "软硬件安装、调试",
          image: require("../../assets/images/implementSteps/step2.png")
        },
        {
          index: 3,
          name: "基础资料导入",
          image: require("../../assets/images/implementSteps/step3.png")
        },
        {
          index: 4,
          name: "培训试用",
          image: require("../../assets/images/implementSteps/step4.png")
        },
        {
          index: 5,
          name: "正式上线",
          image: require("../../assets/images/implementSteps/step5.png")
        }
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {
    changeDevicePlate(index) {
      this.deviceManageIndex = index;
      this.deviceMonitorImg = this.deviceManageList[index - 1].image;
    },
    changeProductPlate(index) {
      this.productManageIndex = index;
      this.productMonitorImg = this.productManageList[index - 1].image;
    },
    changeEfficiencyPlate(index) {
      this.efficiencyManageIndex = index;
      this.efficiencyMonitorImg = this.efficiencyManageList[index - 1].image;
    }
  }
};
</script>
<style lang="scss">
#platformTroduce {
  text-align: center;
  font-family: Source Han Sans CN;
  .content {
    width: 1230px;
    height: 100%;
    margin: 0 auto;
    .content_plate {
      margin-top: 70px;
      .title {
        font-size: 28px;
        font-weight: 500;
        color: #333333;
      }
      .troduce {
        margin-top: 28px;
        font-size: 14px;
        line-height: 26px;
        color: #333333;
        .troduce_bottom {
          position: relative;
          display: flex;
          justify-content: space-between;
          margin-top: 30px;
          padding: 0px 128px;
          .troduce_bottom_left {
            position: relative;
            width: 689px;
            height: 490px;
            img {
              position: absolute;
              top: 50%;
              left: 0px;
              transform: translateY(-50%);
              width: 100%;
            }
          }
          .troduce_bottom_right {
            position: relative;
            width: 120px;
            height: 490px;
            margin-left: 160px;
            ul {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              width: 100%;
              height: 195px;
              font-size: 16px;
              color: #999999;
              li {
                line-height: 46px;
                text-align: right;
                cursor: pointer;
                &:hover {
                  color: #1e90ff;
                  span {
                    background: #1e90ff;
                  }
                }
                span {
                  display: inline-block;
                  width: 10px;
                  height: 10px;
                  background: #e1e1e1;
                  border-radius: 50%;
                  margin-left: 25px;
                }
              }
            }
          }
          .troduce_bottom_data_right {
            width: 240px;
            margin-left: 44px;
            margin-top: 126px;
            text-align: left;
            .active {
              margin-bottom: 40px;
            }
            span {
              display: inline-block;
              width: 10px;
              height: 10px;
              background: #e1e1e1;
              border-radius: 50%;
              margin-right: 25px;
            }
          }
        }
        .impletmentSteps {
          display: flex;
          justify-content: space-between;
          width: 100%;
          height: 302px;
          margin-bottom: 89px;
          li {
            display: inline-block;
            width: 222px;
            height: 100%;
            border: 1px solid #7d8595;
            img {
              width: 100%;
              margin-bottom: 15px;
            }
            .circle {
              width: 22px;
              height: 22px;
              border: 1px solid rgba(51, 51, 51, 0.85);
              border-radius: 50%;
              margin: 0 auto;
              margin-bottom: 8px;
              font-size: 18px;
              line-height: 22px;
              font-weight: 500;
            }
          }
        }
      }
      .terminal_troduce {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 334px;
        background: #f9fafb;
        padding: 50px;
        margin-top: 28px;
        i {
          margin-right: 10px;
        }
        .describe {
          width: 254px;
          font-size: 14px;
          line-height: 26px;
          color: #333333;
          text-align: left;
          .title {
            margin-top: 62px;
            margin-bottom: 30px;
            font-size: 20px;
            font-weight: 500;
            line-height: 26px;
            color: #1e90ff;
          }
        }
        .web {
          width: 278px;
          height: 198px;
          margin-bottom: 20px;
          font-size: 16px;
          color: rgba(51, 51, 51, 0.65);
          img {
            width: 100%;
          }
        }
        .applets {
          width: 111px;
          height: 197px;
          margin-bottom: 20px;
          font-size: 16px;
          color: rgba(51, 51, 51, 0.65);
          img {
            width: 100%;
          }
        }
        .pad {
          width: 264px;
          height: 198px;
          margin-bottom: 20px;
          font-size: 16px;
          color: rgba(51, 51, 51, 0.65);
          img {
            width: 100%;
          }
        }
      }
    }
    .product {
      .troduce {
        .troduce_bottom {
          .troduce_bottom_left {
            position: relative;
            width: 120px;
            height: 490px;
            ul {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              width: 100%;
              height: 195px;
              font-size: 16px;
              color: #999999;
              li {
                line-height: 46px;
                text-align: left;
                cursor: pointer;
                &:hover {
                  color: #1e90ff;
                  span {
                    background: #1e90ff;
                  }
                }
                span {
                  display: inline-block;
                  width: 10px;
                  height: 10px;
                  background: #e1e1e1;
                  border-radius: 50%;
                  margin-right: 25px;
                }
              }
            }
          }
          .troduce_bottom_right {
            position: relative;
            width: 689px;
            height: 490px;
            img {
              position: absolute;
              top: 50%;
              left: 0px;
              transform: translateY(-50%);
              width: 100%;
            }
          }
        }
      }
    }
  }
  .el-backtop {
    background: #fff url(../../assets/images/icon/zhiding.png) no-repeat center
      center;
    width: 60px;
    height: 60px;
  }
}
</style>
<style lang="scss">
.active {
  color: #1e90ff;
  span {
    background: #1e90ff !important;
  }
}

</style>
