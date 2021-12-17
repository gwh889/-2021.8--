<template>
  <div class="priceComparison_container">
    <div class="title">
      化纤行情价格对比(元/吨)
    </div>
    <div id="priceComparison" style="width:100%;">

    </div>
  </div>
</template>

<script>
export default {
  data:function(){
    return {
      resizeTimer:null,
      myChart:null,
      name:[],
      xAxis:[],
      data:{}
    }
  },
  mounted(){
    const _this=this
    console.log('chufa')
    _this.getFiberPriceAnalyse(_this.getEcharts)
    window.addEventListener('resize', function () {
      if (_this.resizeTimer) {
        clearTimeout(_this.resizeTimer)
      }
      if (_this.myChart) {
        _this.myChart.resize()
        _this.resizeTimer = setTimeout(function () {
        }, 100)
      }
    })
  },
  destroyed () {
      window.removeEventListener('resize', this.getEcharts, 100)
    },
  methods:{
    getEcharts(){
      const _this=this
      var chartsDom=document.getElementById('priceComparison');
      var myChart=this.echarts.init(chartsDom)
      _this.myChart=myChart
      var option

      option = {
        color:['#FF8A45','#05C091','#DD79FF'],
        textStyle:{
        color:'#FFF'
      },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
      itemHeight:9,
      textStyle:{
        color:'#FFF'
      },
        data: _this.name
    },
    grid: {
        top:'20%',
        left: '3%',
        right: '8%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: _this.xAxis
    },
    yAxis: {
        type: 'value',
         splitNumber:3
    },
    series: _this.data
};

myChart.setOption(option);
    },
  getFiberPriceAnalyse(callback){
    const that=this
      that.axios({
        method: "get",
        url: "/dtsum/cockpit/cockpitController/fiberPriceAnalyse"
      })
      .then((res) => {
        if (res.data.success === 1) {
          that.name = res.data.body.name;
          that.xAxis = res.data.body.xAxis;
          that.data = JSON.parse(JSON.stringify(res.data.body.data)); 
        }
        callback()
      })
      .catch((err) => {
        console.log(err);
      });
  }
  }
}
</script>

<style lang="scss" scoped> 
  .priceComparison_container{
    padding:0.9375rem;
    #priceComparison{
      width:100%;
      height: 10rem;
    }
    .title{
      color:#FFF;
      font-size:1.125rem;
    }
  }
</style>