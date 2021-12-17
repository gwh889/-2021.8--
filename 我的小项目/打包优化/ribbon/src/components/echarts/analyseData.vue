<template>
  <div class="analyseData_container">
    <div class="title">
      平台数据量分析(MB)
    </div>
    <div class="content">
    <div id="analyseData" style="width:50%;">
    </div>

    <div class="divider"/>
    <div class="content_detail">
      <div class="content_item">
        <div class="title">今日新增</div>
        <div class="detail">{{dayAddData}}GB</div>
      </div>
      <div class="content_item">
        <div class="title">平台数据量</div>
        <div class="detail">{{allData}}TB</div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data:function(){
    return {
      resizeTimer:null,
      myChart:null,
      dayAddData:'',//今日新增
      allData:'',//平台数据量
      xAxis:[],
      data:{}
    }
  },
  mounted(){
    const _this=this
    _this.getDataAnalyse(_this.getEcharts)
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
      var chartsDom=document.getElementById('analyseData');
      var myChart=this.echarts.init(chartsDom)
      _this.myChart=myChart
      var option

      option = {
        color:['#00E6FF','#256DE6'],
        textStyle:{
        color:'#FFF'
      },
    tooltip: {
        trigger: 'axis'
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
        boundaryGap: true,
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
  getDataAnalyse(callback){
    const that=this
      that.axios({
        method: "get",
        url: "/dtsum/cockpit/cockpitController/dataAnalyse"
      })
      .then((res) => {
        if (res.data.success === 1) {
          that.dayAddData = res.data.body.dayAddData;
          that.allData = res.data.body.allData;
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
  .analyseData_container{
    padding:0.9375rem;
    #analyseData{
      width:100%;
      height: 10rem;
    }
    .title{
      color:#FFF;
      font-size:1.125rem;
    }
    .content{
      display: flex;
      justify-content: space-between;
      .divider{
        width:1px;
        height:7.5rem;
        background-color:#468CEC;
        margin-top: 0.9rem;
      }
      .content_detail{
        width:40%;
        text-align: center;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        padding:2.4rem 0;
        .content_item{
          display: flex;
          justify-content: space-between;
          padding:0 1.5rem;
          line-height: 2.25rem;
          .title{
            font-size:1rem;
            font-weight: 500;
          }
          .detail{
            font-size:1.5rem;
            font-weight: 800;
            color: #FFD52E;
          }
        }
      }

      
    }
  }
</style>