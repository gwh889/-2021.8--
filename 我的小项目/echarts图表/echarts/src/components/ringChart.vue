<template>
  <div :id="ringChart.id"></div>
</template>
<script>
export default {
  // 引用该子组件的名字都叫ringChart
  // 父组件传过来的固定数据格式如下：
      // ringChart: {
      //   goodProduct: "良品率",
      //   goodProductValue: "28.57%",
      //   ringData: [  // 环形数据
      //     { value: 1048, name: "通过" },
      //     { value: 735, name: "未通过" }
      //   ],
      //   legendData: [  // 图例显示
      //     { value: "4次", name: "通过" },
      //     { value: "5次", name: "未通过" }
      //   ],
      //   id: "ringChart1"
      // }
  props: ["ringChart"],
  data() {
    return {
      resizeTimer: null,
      myChart: null
    };
  },
  mounted() {
    setTimeout(() => {
      this.getringChart();
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
    getringChart() {
      const chart = document.getElementById(this.ringChart.id);
      const myChart = this.echarts.init(chart);
      this.myChart = myChart;
      const legendData = this.ringChart.legendData;
      const option = {
        tooltip: {
          trigger: "item"
        },
        // 添加图例，若不显示，是series要添加name属性
        legend: {
          show: true,
          data: legendData,
          icon: "rect",
          // 设置矩形的宽高和间距
          itemWidth: 8,
          itemHeight: 56,
          itemGap: 114, // 设置间距
          // 设置legend的文字
          formatter: function(name) {
            var res = "";
            for (var i = 0; i < legendData.length; i++) {
              if (legendData[i].name === name) {
                res = legendData[i].value;
              }
            }
            var arr = ["{a|" + name + "}", "{b|" + res + "}"];
            return arr.join("\n");
          },
          // 利用富文本修饰每一个legend的样式
          textStyle: {
            rich: {
              a: {
                fontSize: 16,
                color: ["#4F93F1", "#FFCC00"],
                align: "center",
                padding: [12, 0, 28, 5]
              },
              b: {
                fontSize: 24,
                color: "#fff",
                align: "center",
                padding: [0, 0, 15, 5],
                lineHeight: 25
              }
            }
          },
          bottom: "10%"
        },
        color: [
          new this.echarts.graphic.LinearGradient(1, 1, 0, 0, [
            { offset: 0, color: "#0787F3" },
            { offset: 0.9, color: "#9DCEFE" }
          ]),
          "#FFCC00"
        ],
        graphic: [
          // 为环形图中间添加文字
          {
            type: "text",
            left: "center",
            top: "30%",
            style: {
              text: this.ringChart.goodProduct,
              textAlign: "center",
              fill: "rgba(255,255,255,0.85)",
              fontSize: 18
            }
          },
          {
            type: "text",
            left: "center",
            top: "42%",
            style: {
              text: this.ringChart.goodProductValue,
              textAlign: "center",
              fill: "#fff",
              fontWeight: "bold",
              fontSize: 24
            }
          }
        ],
        series: [
          {
            // 设置环形图距离grid的边距
            center: ["50%", "38%"],
            name: this.ringChart.goodProduct,
            type: "pie",
            // 内外圈的大小
            radius: ["40%", "70%"],
            label: {
              show: false,
              position: "center"
              // color: "#fff",
              // fontSize: 18,
              // fontWeight: "bold",
              // formatter: "良品率" + "\n\n" + "80%" // {b}:数据名； {c}：数据值； {d}：百分比，可以自定义显示内容
            },
            data: this.ringChart.ringData
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>
<style lang="scss" scoped>
#ringChart1,
#ringChart2 {
  width: 100%;
  height: 100%;
}
</style>
