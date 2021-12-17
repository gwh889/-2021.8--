<template>
  <div :id="doubleLineChart.id"></div>
</template>
<script>
export default {
  // 引用该子组件的名字都叫doubleLineChart
  // 父组件传过来的固定数据格式如下：
  //    doubleLineChart: {
  //        yOneData: [120, 200, 150, 80, 70, 110, 130],
  //        yTwoData: [80, 100, 150, 80, 50, 110, 130],
  //        xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  //        yUnit: "高度（米）",
  //        oneLineColor: "#EE7213",
  //        twoLineColor: "#FCBA78",
  //       legendOne: "实际完成批次",  //第一个图例名称
  //       legendTwo: "计划完成批次",  //第二个图例名称
  //       id: "doubleLine1",  一个页面引入多个该文件时，id名字依次往下起
  //       tilt: "1"  // y轴坐标是否倾斜  1：是  0：否
  //     }
  props: ["doubleLineChart"],
  data() {
    return {
      resizeTimer: null,
      myChart: null
    };
  },
  mounted() {
    setTimeout(() => {
      this.getdoubleLineChart();
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
    getdoubleLineChart() {
      const chart = document.getElementById(this.doubleLineChart.id);
      const myChart = this.echarts.init(chart);
      this.myChart = myChart;
      const option = {
        tooltip: {
          trigger: "axis"
        },
        // 添加图例，若不显示，是series要添加name属性
        legend: {
          show: true,
          data: [
            { name: this.doubleLineChart.legendOne },
            { name: this.doubleLineChart.legendTwo }
          ],
          textStyle: { fontSize: 16, color: "#fff" }
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
          data: this.doubleLineChart.xData
        },
        yAxis: {
          name: this.doubleLineChart.yUnit,
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
          // y轴对应刻度背景先颜色
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: "#878793"
            }
          }
        },
        series: [
          {
            name: this.doubleLineChart.legendOne,
            data: this.doubleLineChart.yOneData,
            type: "line",
            itemStyle: {
              color: this.doubleLineChart.oneLineColor
            }
          },
          {
            name: this.doubleLineChart.legendTwo,
            data: this.doubleLineChart.yTwoData,
            type: "line",
            itemStyle: {
              color: this.doubleLineChart.twoLineColor
            }
          }
        ]
      };
      if (this.doubleLineChart.tilt === "1") {
        option.xAxis.axisLabel = { interval: 0, rotate: 30 };
      }
      myChart.setOption(option);
    }
  }
};
</script>
<style lang="scss" scoped>
#doubleLine1,
#doubleLine2 {
  width: 100%;
  height: 100%;
}
</style>
