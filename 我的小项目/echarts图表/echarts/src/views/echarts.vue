<template>
  <div class="ceshi">
    <div class="ceshiBar">
      <SingleBar :singleBarChart="barChart1"></SingleBar>
    </div>
    <div class="ceshiBar">
      <SingleBar :singleBarChart="barChart2"></SingleBar>
    </div>
    <div class="ceshiBar">
      <DoubleBar :doubleBarChart="barChart3"></DoubleBar>
    </div>
    <div class="ceshiBar">
      <Area :areaChart="areaChart"></Area>
    </div>
    <div class="ceshiBar">
      <RadarMap :radarMapChart="radarChart"></RadarMap>
    </div>
    <div class="ceshiBar">
      <DoubleLine :doubleLineChart="doubleLineChart"></DoubleLine>
    </div>
    <div class="ceshiBar">
      <DoubleLineTwoy
        :doubleLineTwoyChart="doubleLineTwoyChart"
      ></DoubleLineTwoy>
    </div>
    <div class="ceshiBar">
      <DoubleLineTwoy
        :doubleLineTwoyChart="doubleLineTwoyChartTop"
      ></DoubleLineTwoy>
    </div>
    <div class="ceshiBar">
      <RingChart :ringChart="ringChart"></RingChart>
    </div>
    <div class="ceshiBar">
      <SingleBarRow :singleBarRowChart="singleBarRowChart"></SingleBarRow>
    </div>
    <div class="ceshiBar">
      <WaterFall :waterFallChart="WaterFall"></WaterFall>
    </div>
  </div>
</template>
<script>
import SingleBar from "../components/singleBar";
import DoubleBar from "../components/doubleBar";
import Area from "../components/area";
import RadarMap from "../components/radarMap";
import DoubleLine from "../components/doubleLine";
import DoubleLineTwoy from "../components/doubleLineTwoy";
import RingChart from "../components/ringChart";
import SingleBarRow from "../components/singleBarRow";
import WaterFall from "../components/waterFall";

export default {
  components: {
    SingleBar,
    DoubleBar,
    Area,
    RadarMap,
    DoubleLine,
    DoubleLineTwoy,
    RingChart,
    SingleBarRow,
    WaterFall
  },
  data() {
    return {
      barChart1: {
        yData: [120, 200, 150, 80, 70, 110, 130],
        xData: [
          "Monjhgjhgjhgjhkgkjh",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
          "Sun"
        ],
        yUnit: "数量（台）",
        barColorStart: "#06D7D8",
        barColorEnd: "#D0FCFC",
        id: "singleBar1",
        tilt: "1"
      },
      barChart2: {
        yData: [120, 200, 150, 80, 70, 110, 130],
        xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        yUnit: "高度（米）",
        barColorStart: "#06D7D8",
        barColorEnd: "#D0FCFC",
        id: "singleBar2",
        tilt: "0"
      },
      barChart3: {
        yOneData: [120, 200, 150, 80, 70, 110, 130],
        yTwoData: [120, 200, 150, 80, 70, 110, 130],
        xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        yUnit: "高度（米）",
        oneBarColorStart: "#EE7213",
        oneBarColorEnd: "#FCBA78",
        twoBarColorStart: "#0787F3",
        twoBarColorEnd: "#9DCEFE",
        legendOne: "实际完成批次",
        legendTwo: "计划完成批次",
        id: "doubleBar1",
        tilt: "0"
      },
      areaChart: {
        yData: [120, 200, 150, 80, 70, 110, 130],
        xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        yUnit: "高度（米）",
        areaColorStart: "rgba(242, 95, 83, 0.8)",
        areaColorEnd: "rgba(242, 70, 66, 0) ",
        id: "area1",
        tilt: "0"
      },
      radarChart: {
        indicator: [
          { name: "人", max: 1000 }, // 六个点分别代表什么以及最大值
          { name: "机", max: 1000 },
          { name: "料", max: 1000 },
          { name: "法", max: 1000 },
          { name: "测", max: 1000 },
          { name: "环", max: 1000 }
        ],
        seriesData: [100, 200, 150, 800, 700, 110, 130],
        color: "#FF6E76", // 线条和拐点颜色
        id: "radarMap1"
      },
      doubleLineChart: {
        yOneData: [120, 200, 150, 80, 70, 110, 130],
        yTwoData: [80, 100, 150, 80, 50, 110, 130],
        xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        yUnit: "高度（米）",
        oneLineColor: "#EE7213",
        twoLineColor: "#FCBA78",
        legendOne: "实际产量",
        legendTwo: "计划产量",
        id: "doubleLine1",
        tilt: "0"
      },
      doubleLineTwoyChart: {
        yOneData: [120, 200, 150, 80, 70, 110, 130],
        yTwoData: [80, 100, 150, 80, 50, 110, 130],
        xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        yUnit: "高度（米）",
        oneLineColor: "#EE7213",
        twoLineColor: "#FCBA78",
        legendOne: "实际产量",
        legendTwo: "计划产量",
        id: "doubleLineTwoy1",
        tilt: "0",
        legendPosition: "right" // 图例的位置，右边right 和上边 top
      },
      doubleLineTwoyChartTop: {
        yOneData: [120, 200, 150, 80, 70, 110, 130],
        yTwoData: [80, 100, 150, 80, 50, 110, 130],
        xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        yUnit: "高度（米）",
        oneLineColor: "#EE7213",
        twoLineColor: "#FCBA78",
        legendOne: "实际产量",
        legendTwo: "计划产量",
        id: "doubleLineTwoy2",
        tilt: "0",
        legendPosition: "top" // 图例的位置，右边right 和上边 top
      },
      ringChart: {
        goodProduct: "良品率",
        goodProductValue: "28.57%",
        ringData: [
          { value: 1048, name: "通过" },
          { value: 735, name: "未通过" }
        ],
        legendData: [
          { value: "4次", name: "通过" },
          { value: "5次", name: "未通过" }
        ],
        id: "ringChart1"
      },
      singleBarRowChart: {
        yData: [120, 200, 150, 80, 70, 110, 130],
        xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        yUnit: "（%）",
        barColorStart: "#08BF63",
        barColorEnd: "#BBFEC4",
        id: "singleBarRow1",
        tilt: "0"
      },
      WaterFall: {
        yData: [900, 345, 150, 80, 70, 110, 130],
        yTotalData:[0,900,1245,1395,1475,1545,1655,1785],
        xData: [
          "4月1日",
          "4月2日",
          "4月3日",
          "4月4日",
          "4月5日",
          "4月6日",
          "4月7日"
        ],
        yUnit: "（kg）",
        barColor: "#08BF63",
        id: "waterFall",
        tilt: "0"
      }
    };
  }
};
</script>
<style lang="scss" scoped>
.ceshi {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background: #0c337b;
  .ceshiBar {
    width: 30%;
    height: 450px;
  }
}
</style>
