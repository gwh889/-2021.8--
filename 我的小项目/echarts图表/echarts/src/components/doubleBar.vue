<template>
  <div :id="doubleBarChart.id"></div>
</template>
<script>
export default {
  // 引用该子组件的名字都叫doubleBarChart
  // 父组件传过来的固定数据格式如下：
  //    barChart1: {
  //       yOneData: [120, 200, 150, 80, 70, 110, 130],
  //       yTwoData: [120, 200, 150, 80, 70, 110, 130],
  //       xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  //       yUnit: "数量（台）",
  //       oneBarColorStart: "#EE7213",
  //       oneBarColorEnd: "#FCBA78",
  //       twoBarColorStart: "#0787F3",
  //       twoBarColorEnd: "#9DCEFE",
  //       id: "doubleBar1",  一个页面引入多个该文件时，id名字依次往下起
  //       tilt: "1"  // y轴坐标是否倾斜  1：是  0：否
  //     }
  props: ["doubleBarChart"],
  data() {
    return {
      resizeTimer: null,
      myChart: null
    };
  },
  mounted() {
    setTimeout(() => {
      this.getdoubleBarChart();
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
    getdoubleBarChart() {
      const chart = document.getElementById(this.doubleBarChart.id);
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
            { name: this.doubleBarChart.legendOne },
            { name: this.doubleBarChart.legendTwo }
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
          data: this.doubleBarChart.xData
        },
        yAxis: {
          name: this.doubleBarChart.yUnit,
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
            name: this.doubleBarChart.legendOne,
            data: this.doubleBarChart.yOneData,
            type: "bar",
            itemStyle: {
              color: new this.echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: this.doubleBarChart.oneBarColorStart },
                { offset: 1, color: this.doubleBarChart.oneBarColorEnd }
              ])
            }
          },
          {
            name: this.doubleBarChart.legendTwo,
            data: this.doubleBarChart.yTwoData,
            type: "bar",
            itemStyle: {
              color: new this.echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: this.doubleBarChart.twoBarColorStart },
                { offset: 1, color: this.doubleBarChart.twoBarColorEnd }
              ])
            }
          }
        ]
      };
      if (this.doubleBarChart.tilt === "1") {
        option.xAxis.axisLabel = { interval: 0, rotate: 30 };
      }
      myChart.setOption(option);
    }
  }
};
</script>
<style lang="scss" scoped>
#doubleBar1,
#doubleBar2 {
  width: 100%;
  height: 100%;
}
</style>
