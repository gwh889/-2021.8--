<template>
  <div :id="radarMapChart.id"></div>
</template>
<script>
export default {
  // 引用该子组件的名字都叫radarMapChart
  // 父组件传过来的固定数据格式如下：
  //    radarChart: {
  //          indicator: [
  //            { name: "人", max: 1000 }, // 六个点分别代表什么以及最大值
  //            { name: "机", max: 1000 },
  //            { name: "料", max: 1000 },
  //            { name: "法", max: 1000 },
  //            { name: "测", max: 1000 },
  //            { name: "环", max: 1000 }
  //          ],
  //          seriesData: [100, 200, 150, 800, 700, 110, 130],
  //          color: "#FF6E76", // 线条和拐点颜色
  //       id: "radarMap1",  一个页面引入多个该文件时，id名字依次往下起
  //     }
  props: ["radarMapChart"],
  data() {
    return {
      resizeTimer: null,
      myChart: null
    };
  },
  mounted() {
    setTimeout(() => {
      this.getradarMapChart();
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
    getradarMapChart() {
      const chart = document.getElementById(this.radarMapChart.id);
      const myChart = this.echarts.init(chart);
      this.myChart = myChart;
      const option = {
        tooltip: {
          trigger: "axis"
        },
        radar: {
          name: {
            textStyle: {
              color: "#fff"
            }
          },
          indicator: this.radarMapChart.indicator
        },
        series: [
          {
            data: [
              {
                value: this.radarMapChart.seriesData
              }
            ],
            type: "radar",
            tooltip: {
              trigger: "item"
            },
            // 线条样式
            lineStyle: {
              color: this.radarMapChart.color
            },
            // 拐点样式
            itemStyle: {
              color: this.radarMapChart.color
            }
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>
<style lang="scss" scoped>
#radarMap1,
#radarMap2 {
  width: 100%;
  height: 100%;
}
</style>
