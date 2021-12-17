<template>
  <div :id="waterFallChart.id"></div>
</template>
<script>
export default {
  // 引用该子组件的名字都叫waterFallChart
  // 父组件传过来的固定数据格式如下：
  //    waterFallChart: {
  //       yData: [120, 200, 150, 80, 70, 110, 130],
  //       xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  //       yUnit: "数量（台）",
  //       barColorStart: "#06D7D8",
  //       barColorEnd: "#D0FCFC",
  //       legendOne: "实际完成批次",  //第一个图例名称
  //       legendTwo: "计划完成批次",  //第二个图例名称
  //       id: "waterFall",  一个页面引入多个该文件时，id名字依次往下起
  //       tilt: "1"  // y轴坐标是否倾斜  1：是  0：否
  //     }
  props: ["waterFallChart"],
  data() {
    return {
      resizeTimer: null,
      myChart: null
    };
  },
  mounted() {
    setTimeout(() => {
      this.getwaterFallChart();
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
    getwaterFallChart() {
      const chart = document.getElementById(this.waterFallChart.id);
      const myChart = this.echarts.init(chart);
      this.myChart = myChart;
      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function(params) {
            var tar;
            if (params[1].value !== "-") {
              tar = params[1];
            } else {
              tar = params[2];
            }
            return tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
          }
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
          data: this.waterFallChart.xData
        },
        yAxis: {
          name: this.waterFallChart.yUnit,
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
            name: "辅助",
            type: "bar",
            stack: "总量",
            itemStyle: {
              barBorderColor: "rgba(0,0,0,0)",
              color: "rgba(0,0,0,0)"
            },
            emphasis: {
              itemStyle: {
                barBorderColor: "rgba(0,0,0,0)",
                color: "rgba(0,0,0,0)"
              }
            },
            data: this.waterFallChart.yTotalData
          },
          {
            name: "产量",
            stack: "总量",
            data: this.waterFallChart.yData,
            type: "bar",
             markLine: {
                lineStyle: {
                    type: 'dashed'
                },
                data: [
                    [{type: 'min'}, {type: 'max'}]
                ]
            },
            itemStyle: {
              color: this.waterFallChart.barColor
            }
          }
        ]
      };
      if (this.waterFallChart.tilt === "1") {
        option.xAxis.axisLabel = { interval: 0, rotate: 30 };
      }
      myChart.setOption(option);
    }
  }
};
</script>
<style lang="scss" scoped>
#waterFall {
  width: 100%;
  height: 100%;
}
</style>
