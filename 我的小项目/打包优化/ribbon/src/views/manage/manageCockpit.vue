<template>
  <div class="manageCockpit_container" id="manageCockpit_container">
    <div class="header_container">
      <div class="title_container">纺织线带行业驾驶舱</div>
      <div class="header_right">
        <div class="time_container">
          {{time}}
        </div>
        <div class="fullScreen_container" @click="fullScreen">
          <img src="@/assets/images/icon/enlarge.png" style="width:19px;height:19px;" alt="">
          <!-- <img src="@/assets/images/icon/shrink.png" alt=""> -->
        </div>
      </div>
    </div>
    <el-divider/>
    <div class="map_row_container">
      <div class="map_left_container">
        <div class="card_container">
          <div class="title">平台企业设备概况</div>
          <div class="content">
            <div class="content_detail">
              <div>
                <div class="number">{{enterpriseNum}}家</div>
                <div class="title">企业数量</div>
              </div>
              <div>
                <div class="number">{{industryNum}}个</div>
                <div class="title">细分行业</div>
              </div>
            </div>
            <div class="content_divider"></div>
            <div class="content_detail">
              <div>
                <div class="number">{{deviceNum}}台</div>
                <div class="title">设备数量</div>
              </div>
              <div>
                <div class="number">{{deviceTypeNum}}种</div>
                <div class="title">设备种类</div>
              </div>
            </div>
          </div>
        </div>

        <div class="card_container">
          <lastWeekRunningMachine/>
        </div>
      </div>
      <div class="map_container">
        <div id="map_container" style="width:100%;height:100%;"/>
        <div class="map_content">
          <el-input v-model="input" placeholder="请输入企业名称" @change="changeInput()" suffix-icon="el-icon-search"></el-input>
          <div class="company_container">
            <div v-for="item in filterList" :key="item.enterpriseName" @click="handleClick(item.enterpriseName)">
              <div class="title">{{item.enterpriseName}}</div>
              <div>
                <span class="show">{{item.openDeviceNum}}</span>
                <span>/{{item.allDeviceNum}}</span>
              </div>
            </div> 
          </div>
        </div>    
      </div>
      <div class="map_right_container">
        <div class="card_container">
          <priceComparison/>
        </div>
        <div class="card_container">
          <marketUpAndDown/>
        </div>
      </div>
    </div>
    <div class="chart_container">
      <div class="card_container">
        <lastWeekWorkTime/>
      </div>
      <div class="bottom_center_container">
        <analyseData/>
      </div>
      <div class="card_container"> 
        <materialPrice/>
      </div>
    </div>
  </div>
</template>

<script>
import CUSTOM_MAP_CONFIG from '../../../src/assets/json/china.json';
import moment from 'moment';

import lastWeekRunningMachine from '../../../src/components/echarts/lastWeekRunningMachine'
import priceComparison from '../../../src/components/echarts/priceComparison'
import marketUpAndDown from '../../../src/components/echarts/marketUpAndDown'
import lastWeekWorkTime from '../../../src/components/echarts/lastWeekWorkTime'
import analyseData from '../../../src/components/echarts/analyseData'
import materialPrice from '../../../src/components/echarts/materialPrice'

require('echarts/extension/bmap/bmap');
export default {
  components:{
    lastWeekRunningMachine:lastWeekRunningMachine,
    priceComparison:priceComparison,
    marketUpAndDown:marketUpAndDown,
    lastWeekWorkTime:lastWeekWorkTime,
    analyseData:analyseData,
    materialPrice:materialPrice
  },
data:function(){
  return {
    list:[],//所有的企业
    filterList:[],//筛选后的企业
    fullscreen:false,
    input:'',
    enterpriseNum: 3,  // 企业数量
    deviceNum: 503,  // 设备数量
    industryNum: 3,  // 细分行业
    deviceTypeNum: 3,  // 设备种类
    time:'',//当前的时间
    bmapCenter:[121,30],//地图中心

    geoCoordMap : {
    澳亚织带:[120.241924,29.311277],
    绍兴纵通:[120.514383,30.139168],
    慈溪豪隆:[121.558064,30.132458]
}
  }
},
mounted(){
  this.getEcharts();
  this.getSurvey();
  this.getEnterpriseInfo();
  setInterval(()=>{
    this.getTime()
  },30000)
},
methods:{
  //点击公司移动地图中心
  handleClick(enterpriseName){
    switch(enterpriseName){
      case '浙江省绍兴纵通有限公司':this.bmapCenter=this.geoCoordMap.绍兴纵通;break;
      case '浙江省东阳澳亚织带有限公司':this.bmapCenter=this.geoCoordMap.澳亚织带;break;
      case '慈溪豪隆毛绒有限公司':this.bmapCenter=this.geoCoordMap.慈溪豪隆;break;
      default : this.bmapCenter=[121,30]
    }
    this.getEcharts()
  },
  changeInput(){
    this.filterList=this.list.filter((item)=>{
      return  item.enterpriseName.indexOf(this.input)>=0
    })
  },
  fullScreen() {
      // this.qpheight = this.$refs.qpheight.clientHeight +'px';
      let element = document.getElementById("manageCockpit_container");
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
  getEcharts () {
      // 基于准备好的dom，初始化echarts实例
      var data = [
      {name:'澳亚织带'},
      {name:'绍兴纵通'},
      {name:'慈溪豪隆'}
     
];
var geoCoordMap = {
    '澳亚织带':[120.241924,29.311277],
    '绍兴纵通':[120.514383,30.139168],
    '慈溪豪隆':[121.558064,30.132458]
};

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};


      const option = {
        title: {
          text: '',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          show:false
        },
        bmap: {
          center:this.bmapCenter,
          zoom: 8,
          roam: false,//是否缩放
          mapStyle: { styleJson: CUSTOM_MAP_CONFIG },
        },
        series: [
          {
            name: '',
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            data: convertData(data),
            symbolSize: 10,
            encode: {
                value: 2,
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            legendHoverLink : true,
            hoverAnimation: true,
            label: {
                formatter: '{b}',
                position: 'right',
                show: true,
                color:'#ef9b1d'
            },
            itemStyle: {
                color: '#F19B1A',
                shadowBlur: 10,
                shadowColor: '#F19B1A'
            },
            zlevel: 1
        }
        ]
      }

      var myChart = this.echarts.init(document.getElementById('map_container'))

      myChart.setOption(option)
      myChart.on('click',function(params){
        switch(params.name){
          case '澳亚织带':window.open('http://ayzd.dtsum.com/cockpit/cockpit','_blank');break;
          case '绍兴纵通':window.open('http://zt.dtsum.com/cockpit/cockpit','_blank');break;
          case '慈溪豪隆':window.open('http://hl.dtsum.com/cockpit/cockpit','_blank');break;
        }
      })
    },
//获取驾驶舱概况
getSurvey(){
  const that=this
      that.axios({
        method: "get",
        url: "/dtsum/cockpit/cockpitController/survey"
      })
      .then((res) => {
        if (res.data.success === 1) {
          that.enterpriseNum = res.data.body.enterpriseNum;
          that.deviceNum = res.data.body.deviceNum;
          that.industryNum = res.data.body.industryNum;
          that.deviceTypeNum = res.data.body.deviceTypeNum;
        }
      })
      .catch((err) => {
        console.log(err);
      });
},
//获取企业详情
getEnterpriseInfo(){
  const that=this
      that.axios({
        method: "get",
        url: "/dtsum/cockpit/cockpitController/enterpriseInfo"
      })
      .then((res) => {
        if (res.data.success === 1) {
          that.list = JSON.parse(JSON.stringify(res.data.body.list));
          that.filterList=JSON.parse(JSON.stringify(that.list))
        }
      })
      .catch((err) => {
        console.log(err);
      });
},
//获取当前的时间
getTime(){
  this.time=moment(new Date()).format('YYYY-MM-DD HH:mm')
}
}

}

</script>

<style lang="scss" scoped>
  .manageCockpit_container{
    background-color: #03174B;
    padding:1.25rem;
    .header_container{
      height:2.6875rem;
      display: flex;
      justify-content: space-between;
      .title_container{
        width: 20.25rem;
        height: 1.6875rem;
        font-size: 1.6875rem;
        font-family: Source Han Sans CN;
        font-weight: bold;
        line-height: 1.6875rem;
        color:#FFF;
      }
      .header_right{
        display: flex;
        .time_container{  
          font-size: 1.3125rem;
          font-family: UniDreamLED;
          font-weight: 400;
          line-height: 2.00rem;
          color: #FFF;
        }
      .fullScreen_container{
        margin-left:1.25rem;
        display: inline-block;
      }

      }
    }
    .map_row_container{
      height:28.9375rem;
      display: flex;
      justify-content: space-between;
      .card_container{
        height:14rem;
        background-color:#061F5D;
        .title{
          font-size:1.125rem;
          padding:0.625rem 0.9375rem;
          color:#FFF;
        }
        .content{
          display: flex;
          justify-content:space-between;
          padding:0.2rem 12%;
          text-align: center;
          div{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .content_divider{
            width:1px;
            height:6.4375rem;
            background-color: #468CEC;
            margin-top:1.2rem;
          }
          .number{
            color:#FFD52E;
            font-size: 1.4375rem;
            font-weight: 800;
          }
          .title{
            font-size:1rem;
          }
        }
      }
      .card_title{
        text-align: center;
        margin:1.625rem 0;
        height:1.375rem;
        span{
        color:#FFF;
        font-size: 1.375rem;
        font-family: Source Han Sans CN;
        font-weight: 500;
        line-height: 1.6875rem;
        }
      }
      .card_number{
        text-align: center;
        margin:1.625rem 0;
        height:2.00rem;
        span{
          font-size: 2rem;
          font-family: Source Han Sans CN;
          font-weight: 800;
          line-height: 1.6875rem;
          color: #FFD52E;
        }
      }
      .map_left_container{
        width:25.786%;
        height:28.9375rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .map_container{
        width:46.357%;
        height:28.9375rem;
        position: relative;
        .map_content{
          position: absolute;
          width:40%;
          top:1.25rem;
          right:1.25rem;
          .company_container{
            margin-top:1rem;
            width: 100%;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            background: rgba(6, 31, 93, 0.6);
            border-radius: 4px;
            font-size:0.8125rem;
            color:#FFF;
            div{
            padding:0.05rem 0.1rem;
              display: flex;
              justify-content: space-between;
              .show{
                color:#FFD52E;
                font-size:1rem;
                line-height:1rem;
              }
            }
          }
        }
      }
      .map_right_container{
        width:25.786%;
        height:28.9375rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .right_card{
           height:7.875rem;
          background-color:#313850;
        }
      }
    }
    .chart_container{
      margin-top:0.9375rem;
      width:100%;
      height:14rem;
      display: flex;
      justify-content: space-between;
      .bottom_center_container{
        width:46.357%;
        height:14rem;
        background-color: #061F5D;
      }
      .card_container{
        width:25.786%;
        height:14rem;
        background-color:#061F5D;
      }
    }

  }
</style>
<style lang="scss">
  .manageCockpit_container{
    .el-divider--horizontal{
      margin:0;
      margin-bottom:1.5625rem;
      background-color: #256DE6;
    }
    .el-input__inner{
      color:#FFF;
      height:1.875rem;
    background: rgba(6, 31, 93, 0.6);
    }
    .el-input__suffix{
      top:-0.25rem;
    }
  }
</style>