<template>
  <div class="materialPrice_container">
    <div class="header_container">
      <div class="title">
        原料价格趋势
      </div>
      <div class="time">
        最后更新时间：{{time}}
      </div>
    </div>
    <div class="table_container">
      <div class="title_container">
        <div>名称</div>
        <div>价格</div>
        <div>单位</div>
        <div>涨跌幅</div>
      </div>
      <div class="content_container">
        <el-carousel
          direction="vertical"
          :autoplay="true"
          :interval="intervalTime"
          :loop="loopFlag"
        >
        <el-carousel-item v-for="(item,index) in newList" :key="index">
        <div class="content-row" v-for="(itemIn,indexIn) in item" :key="indexIn">
          <div class="detail">{{itemIn.name}}</div>
          <div class="detail">{{itemIn.price}}</div>
          <div class="detail">{{itemIn.unit}}</div>
          <div class="detail" :style="chooseFontColor(itemIn.riseAndFall)">{{itemIn.riseAndFall}}</div>
        </div>
        </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data:function(){
    return {
      list:[],
      newList:[],
      intervalTime:10000,
      loopFlag:true,
      time:''
    }
  },
  mounted(){
    this.getRawMaterialPriceAnalyse()
  },
  methods:{
    //选择颜色
    chooseFontColor(riseAndFall){
      console.log(riseAndFall)
      if(Number(riseAndFall.slice(0,riseAndFall.length-1))<0){
        return 'color:#3CE46F;'
      }else if(Number(riseAndFall.slice(0,riseAndFall.length-1))>0){
        return 'color:#FF3B3B;'
      }else{
        return 'color:#FFF;'
      }
    },
    //数组等长分割
    group(array, subGroupLength) {
      let index = 0;
      let newArray = [];
      while(index < array.length) {
          newArray.push(array.slice(index, index += subGroupLength));
      }
      return newArray;
  },
    getRawMaterialPriceAnalyse(){
      const that=this
      that.time=moment(new Date()).format('YYYY-MM-DD HH:mm')
      that.axios({
        method: "get",
        url: "/dtsum/cockpit/cockpitController/rawMaterialPriceAnalyse"
      })
      .then((res) => {
        if (res.data.success === 1) {
          that.list = JSON.parse(JSON.stringify(res.data.body.list));
          let oldList=that.list
          let newList=[]
          newList=JSON.parse(JSON.stringify(that.group(oldList,4)))
          that.newList=JSON.parse(JSON.stringify(newList))
          newList.length<=1?that.loopFlag=false:that.loopFlag=true
          console.log(newList)
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
}
</script>

<style lang="scss" scoped> 
  .materialPrice_container{
    padding:0.9375rem;
    .header_container{
      display: flex;
      justify-content: space-between;
    .title{
      color:#FFF;
      font-size:0.9375rem;
    }
    .time{
      font-size: 0.6875rem;
      color:rgba(255,255,255,0.65);
      line-height:1.375rem;
    }
    }
    .table_container{
      width:100%;
      margin-top:1rem;
      .title_container{
        width:100%;
        height:1.9375rem;
        line-height: 1.9375rem;
        background-color: #2A478F;
        display: flex;
        justify-content: space-between;
        color:#FFF;
        font-size:0.6875rem;
        border-radius: 4px 4px 0px 0px;
        padding-left:8%;
        div{
          width:25%;
          text-align:start;
        }
      }
      .content_container{
        color:#FFF;
        font-size:0.625rem;
        font-weight:400;
        .content-row{
          height:1.875rem;
          line-height: 1.875rem;
          display: flex;
          justify-content: space-between;
          padding-left:8%;
          border-bottom: 1px solid rgba(70, 140, 236, 0.5);
          div{
          width:25%;
          text-align:start;
        }
        }
      }
    }

  }
</style>
<style lang="scss">
.materialPrice_container{
  .el-carousel__indicator{
    display: none;
  }
}
</style>