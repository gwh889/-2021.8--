<template>
  <div class="lastWeekRunningMachine_container">
    <div class="title">
      近7日开机设备数量趋势(台)
    </div>
    <div id="lastWeekRunningMachine" style="width:100%;">

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
    _this.getSevenDayOpenNum(_this.getEcharts)
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
      var chartsDom=document.getElementById('lastWeekRunningMachine');
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
         splitNumber:2
    },
    series: _this.data
};

myChart.setOption(option);
    },
  //近七日开机设备数量趋势
getSevenDayOpenNum(callback){
  const that=this
      that.axios({
        method: "get",
        url: "/dtsum/cockpit/cockpitController/sevenDayOpenNum"
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
  .lastWeekRunningMachine_container{
    padding:0.9375rem;
    #lastWeekRunningMachine{
      width:100%;
      height: 10rem;
    }
    .title{
      color:#FFF;
      font-size:1.125rem;
    }
  }
</style>