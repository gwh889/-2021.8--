<template>
  <div :id="doubleLineTwoyChart.id"></div>
</template>
<script>
export default {
  // 引用该子组件的名字都叫doubleLineTwoyChart
  // 父组件传过来的固定数据格式如下：
  //    doubleLineTwoyChart: {
  //        yOneData: [120, 200, 150, 80, 70, 110, 130],
  //        yTwoData: [80, 100, 150, 80, 50, 110, 130],
  //        xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  //        yUnit: "高度（米）",
  //        oneLineColor: "#EE7213",
  //        twoLineColor: "#FCBA78",
  //       legendOne: "实际完成批次",  //第一个图例名称
  //       legendTwo: "计划完成批次",  //第二个图例名称
  //       id: "doubleLineTwoy1",  一个页面引入多个该文件时，id名字依次往下起
  //       tilt: "1",  // y轴坐标是否倾斜  1：是  0：否
  //      legendPosition: 'right' // 图例的位置，右边right 和上边 top
  //     }
  props: ["doubleLineTwoyChart"],
  data() {
    return {
      resizeTimer: null,
      myChart: null
    };
  },
  mounted() {
    setTimeout(() => {
      this.getdoubleLineTwoyChart();
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
    getdoubleLineTwoyChart() {
      const chart = document.getElementById(this.doubleLineTwoyChart.id);
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
            { name: this.doubleLineTwoyChart.legendOne },
            { name: this.doubleLineTwoyChart.legendTwo }
          ],
          textStyle: { fontSize: 16, color: "#fff" }
          // 将图例显示到右侧
          //   orient: "vertical", // 垂直显示
          //   y: "center", // 延Y轴居中
          //   x: "right", // 居右显示
          //   align: "left" // 颜色在左边
        },
        // 图距离右边的边距
        grid: {
          // right: "35%"
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
          data: this.doubleLineTwoyChart.xData
        },
        yAxis: [
          {
            name: this.doubleLineTwoyChart.yUnit,
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
          {
            name: this.doubleLineTwoyChart.yUnit,
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
          }
        ],
        series: [
          {
            name: this.doubleLineTwoyChart.legendOne,
            data: this.doubleLineTwoyChart.yOneData,
            type: "line",
            itemStyle: {
              color: this.doubleLineTwoyChart.oneLineColor
            }
          },
          {
            name: this.doubleLineTwoyChart.legendTwo,
            data: this.doubleLineTwoyChart.yTwoData,
            type: "line",
            // 坐标轴右侧添加刻度
            yAxisIndex: 1,
            itemStyle: {
              color: this.doubleLineTwoyChart.twoLineColor
            }
          }
        ]
      };
      // 坐标轴x文字是否要倾斜
      if (this.doubleLineTwoyChart.tilt === "1") {
        option.xAxis.axisLabel = { interval: 0, rotate: 30 };
      }
      // 图例的位置
      if (this.doubleLineTwoyChart.legendPosition === "right") {
        option.grid.right = "35%";
        option.legend.orient = "vertical";
        option.legend.y = "center";
        option.legend.x = "right";
        option.legend.align = "left";
      }
      myChart.setOption(option);
    }
  }
};
</script>
<style lang="scss" scoped>
#doubleLineTwoy1,
#doubleLineTwoy2 {
  width: 100%;
  height: 100%;
}
</style>
