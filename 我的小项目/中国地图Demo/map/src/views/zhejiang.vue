<template>
  <div>
    <div>浙江地图</div>
    <div id="zhejiangMap"></div>
  </div>
</template>
<script>
import "../assets/zhejiang";
export default {
  data() {
    return {};
  },
  mounted() {
    var chart = this.echarts.init(document.getElementById("zhejiangMap"));
    chart.setOption({
      series: [
        {
          type: "map",
          selectedMode: "single",
          map: "浙江",
          itemStyle: {
            normal: { label: { show: true } },
            emphasis: { label: { show: true } }
          }
        }
      ]
    });
  }
};
</script>
<style lang="scss" scoped>
#zhejiangMap {
  width: 800px;
  height: 800px;
  margin: auto;
}
</style>
