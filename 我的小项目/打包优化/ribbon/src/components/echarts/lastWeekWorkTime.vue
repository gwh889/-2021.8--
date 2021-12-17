<template>
  <div class="lastWeekWorkTime_container">
    <div class="title">
      近7日开机工时(h)
    </div>
    <div id="lastWeekWorkTime" style="width:100%;">

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
    _this.getSevenDayOpenTime(_this.getEcharts)
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
      var chartsDom=document.getElementById('lastWeekWorkTime');
      var myChart=this.echarts.init(chartsDom)
      _this.myChart=myChart
      var option

    option = {
      color:['#FDDD60','#7CFFB2','#4992FF'],
      textStyle:{
        color:'#FFF'
      },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: _this.name,
        textStyle:{
        color:'#FFF'
      }
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
        data: _this.xAxis
    },
    yAxis: {
        type: 'value',
        splitNumber:2
    },
    series: _this.data,
    
};

myChart.setOption(option);
    },
  getSevenDayOpenTime(callback){
      const that=this
      that.axios({
        method: "get",
        url: "/dtsum/cockpit/cockpitController/sevenDayOpenTime"
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
  .lastWeekWorkTime_container{
    padding:0.9375rem;
    #lastWeekWorkTime{
      width:100%;
      height: 10rem;
    }
    .title{
      color:#FFF;
      font-size:1.125rem;
    }
  }
</style>