<template>
  <div :id="areaChart.id"></div>
</template>
<script>
export default {
  // 引用该子组件的名字都叫areaChart
  // 父组件传过来的固定数据格式如下：
  //    areaChart: {
  //       yData: [120, 200, 150, 80, 70, 110, 130],
  //       xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  //       yUnit: "数量（台）",
  //       areaColorStart: "#06D7D8",
  //       areaColorEnd: "#D0FCFC",
  //       id: "area1",  一个页面引入多个该文件时，id名字依次往下起
  //       tilt: "1"  // y轴坐标是否倾斜  1：是  0：否
  //     }
  props: ["areaChart"],
  data() {
    return {
      resizeTimer: null,
      myChart: null
    };
  },
  mounted() {
    setTimeout(() => {
      this.getareaChart();
    }, 1000);
    const _this = this;
    window.addEventListener("resize", function() {
      if (_this.resizeTimer) {
        clearTimeout(_this.resizeTimer);
      }
      if (_this.myChart) {
        _this.myChart.resize();
        _this.resizeTimer = setTimeout(function() {}, 100);
      }
    });
  },
  methods: {
    getareaChart() {
      const chart = document.getElementById(this.areaChart.id);
      const myChart = this.echarts.init(chart);
      this.myChart = myChart;
      const option = {
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          // 去掉刻度
          axisTick: {
            show: false
          },
          // 修改刻度线颜色
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          // 刻度值颜色
          axisLabel: {
            textStyle: {
              color: "#fff"
            }
          },
          type: "category",
          data: this.areaChart.xData
        },
        yAxis: {
          name: this.areaChart.yUnit,
          nameTextStyle: {
            // y轴单位的颜色
            color: "rgba(255, 255, 255, 0.65)"
          },
          type: "value",
          // 刻度值颜色
          axisLabel: {
            textStyle: {
              color: "#fff"
            }
          },
          // y轴对应刻度背景颜色
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: "#878793"
            }
          }
        },
        series: [
          {
            // 折线拐点的大小
            symbolSize: 0,
            data: this.areaChart.yData,
            type: "line",
            areaStyle: {
              color: new this.echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: this.areaChart.areaColorStart
                },
                {
                  offset: 1,
                  color: this.areaChart.areaColorEnd
                }
              ])
            }
          }
        ]
      };
      if (this.areaChart.tilt === "1") {
        option.xAxis.axisLabel = { interval: 0, rotate: 30 };
      }
      myChart.setOption(option);
    }
  }
};
</script>
<style lang="scss" scoped>
#area1,
#area2,
#area3 {
  width: 100%;
  height: 100%;
}
</style>
