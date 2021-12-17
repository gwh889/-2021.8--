<template>
  <div>
    <div class="infor-box">
      <Row class="infor-row">
        <Col span="3" class="infor-col-title">span产品名称</Col>
        <Col span="7" class="infor-col-content">
          <div class="col-mycontent">{{map.productname?map.productname:'-'}}</div>
          <!-- <Button type="text" class="blue-text-btn" @click="showpro">查看</Button> -->
        </Col>
        <Col span="3" class="infor-col-title">当前状态</Col>
        <Col span="4" class="infor-col-content">
          <div class="col-mycontent" v-if="map.status == 1">在线</div>
          <div class="col-mycontent" v-else-if="map.status == 2">离线</div>
          <div class="col-mycontent" v-else-if="map.status == 3">未激活</div>
          <div class="col-mycontent" v-else>-</div>
        </Col>
        <Col span="3" class="infor-col-title">节点类型</Col>
        <Col span="4" class="infor-col-content">{{map.nodetype == 1 ? "设备" : "网关"}}</Col>
      </Row>
      <Row class="infor-row">
        <Col span="3" class="infor-col-title">ProductKey</Col>
        <Col span="7" class="infor-col-content">
          <div class="col-mycontent no-wrap">{{map.productkey?map.productkey:'-'}}</div>
          <Button
            type="text"
            class="blue-text-btn"
            style="padding:0 8px"
            v-clipboard:copy="map.productkey"
            v-clipboard:success="onCopy"
          >复制</Button>
        </Col>
        <Col span="3" class="infor-col-title">DeviceName</Col>
        <Col span="4" class="infor-col-content">
          <div class="col-mycontent no-wrap">{{map.devicename?map.devicename:'-'}}</div>
          <Button
            type="text"
            class="blue-text-btn"
            style="padding:0 8px"
            v-clipboard:copy="map.devicename"
            v-clipboard:success="onCopy"
          >复制</Button>
        </Col>
        <Col span="3" class="infor-col-title">DevicetSecret</Col>
        <Col span="4" class="infor-col-content">
          <div class="col-mycontent no-wrap">{{map.showsercet?(map.showsercet === 1 ? map.secret : '*******'):'-'}}</div>
          <Button
            type="text"
            class="blue-text-btn"
            style="padding:0 8px"
            @click="showmysercet"
          >{{map.showsercet?(map.showsercet === 1 ? '隐藏' : '显示'):''}}</Button>
        </Col>
      </Row>
      <Row class="infor-row">
        <Col span="3" class="infor-col-title">IP地址</Col>
        <Col span="7" class="infor-col-content">{{map.ip ? map.ip : '-'}}</Col>
        <Col span="3" class="infor-col-title">固件版本</Col>
        <Col span="4" class="infor-col-content">{{map.firmware ? map.firmware : '-'}}</Col>
        <Col span="3" class="infor-col-title">添加时间</Col>
        <Col span="4" class="infor-col-content">{{map.createtime ? map.createtime : '-'}}</Col>
      </Row>
      <Row class="infor-row">
        <Col span="3" class="infor-col-title">激活时间</Col>
        <Col span="7" class="infor-col-content">{{map.activetime ?  map.activetime:'-' }}</Col>
        <Col span="3" class="infor-col-title">最后上线时间</Col>
        <Col span="4" class="infor-col-content">{{map.lasttime ?  map.lasttime:'-' }}</Col>
        <Col span="3" class="infor-col-title">实时延迟</Col>
        <Col span="4" class="infor-col-content">
          <Button type="text" class="blue-text-btn" @click="testmodal = true">测试</Button>
        </Col>
      </Row>
    </div>
    <!-- 确认删除弹窗 -->
    <Modal v-model="testmodal" title="系统提示" width="634" :mask-closable="false" @on-ok="oktomsg">
      <Alert type="warning" show-icon>
        <template slot="desc">测试网络延迟时将会向设备发送一条空消息，请确认对设备端业务没有影响！</template>
      </Alert>
    </Modal>
  </div>
</template>

<script>
// import { useaxios } from '@/assets/js/axios'
// import { url_api, format_time } from '@/assets/js/common'
export default {
  data () {
    return {
      testmodal: false,
      pdid: '',
      deptid:'',
      map: {}
    }
  },
  methods: {
    getParams: function () {
      // 取到路由带过来的参数
      var pdid = this.$route.query.pdid
      // 将数据放在当前组件的数据内
      this.pdid = pdid,
      this.deptid=this.$route.query.deptid
    },
    // 获取详情
    getequdetail () {
      // const _this = this
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + '/iext/back/DeviceController/deviceInfo',
      //     {
      //       pdid: this.pdid
      //     },
      //     'get'
      //   )
      //   .then(function (res) {
      //     if (res.data.success === 1) {
      //       let map = res.data.body.map
      //       map.createtime = format_time(map.createtime, 'time')
      //       map.showsercet = 2
      //       _this.map = map
      //     } else {
      //       _this.$Message.error(res.data.msg)
      //     }
      //   })
      //   .catch(function (error) {
      //     _this.$Message.error(error)
      //   })
    },
    getDetail(){
      this.axios({
        url:'/IOT.json',
        method:'get'
      }).then(res=>{
        if(res.data.success===1){
          this.map=res.data.body.equdata1[this.deptid-1]
        }else{
          this.$message.error(res.data.msg)
        }
      }).catch(error=>console.log(error))
    },
    // copy
    onCopy () {
      this.$Message.success('复制成功')
    },
    // 显示隐藏
    showmysercet () {
      const _this = this
      if (_this.map.showsercet === 1) {
        _this.map.showsercet = 2
      } else {
        _this.map.showsercet = 1
      }
    },
    // 测试
    oktomsg () {
      this.$Message.success('发送成功')
    },
    showpro () {
      this.$router.push({
        path: '/product/proinfor',
        query: { ppid: this.map.ppid }
      })
    }
  },
  watch: {},
  created () {
    this.getParams()
  },
  mounted () {
    // this.getequdetail()
    this.getDetail()
  }
}
</script>

<style lang="scss" scoped>
$main-fam-jian: PingFang-jian;
$main-fam-block: PingFang-block;
$main-fam-bold: PingFang-bold;
$main-back: #f1f4f6; //背景颜色
$main-font-color: #263849; //字体颜色
$main-font-color-block: #333333;
$main-font-size: 14px; //字体大小
$main-font-height: 20px; //字体高度
$menu-width: 200px; //目录宽度
$heard-height: 50px; //头部高度
$bread-color: #9fa9c4; //面包屑字体颜色
$content-header-back: #e4ebf1; //内容头部背景颜色
$content-header-height: 52px; //内容头部背景高度
$content-header-color: #314558; //内容头部颜色
$btn-blue-back: #2980b9; //蓝色按钮背景颜色
$btn-blue-color: #ffffff; //蓝色按钮背景颜色
$btn-blue-hover-color: #236fa1; //蓝色按钮经过背景颜色
$control-height: 36px; //控件高度
$table-header-back: #f7faff; //表格头部背景颜色
$table-tr-height: 56px; //表格tr高度
$table-tr-border: #dfe3e8; //表格tr border
$tip-color: #7a8693;
$infor-blue-text: #2980b9;
$input-disable-back: #f9fafb;
$infor-row-height: 56px;

.infor-box {
  margin-top: 16px;
  .infor-row {
    display: flex;
    justify-content: space-between;
    height: $infor-row-height; /*no*/
    box-shadow: 0px -1px 0px 0px rgba(223, 227, 232, 1);
    flex-wrap: wrap;
    .infor-col-title {
      background: rgba(247, 250, 255, 1);
      box-shadow: 0px -1px 0px 0px rgba(223, 227, 232, 1);
      font-family: $main-fam-block;
      font-weight: 500;
      color: $main-font-color-block;
      height: $infor-row-height; /*no*/
      display: inline-flex;
      align-items: center;
      padding-left: 24px;
    }
    .infor-col-content {
      padding-left: 24px;
      background: #fff;
      height: $infor-row-height; /*no*/
      display: inline-flex;
      align-items: center;
      word-break: break-word;
      overflow: hidden;
      .col-mycontent {
        height: inherit;
        padding-top: 18px;
        overflow-y: auto;
      }
    }
  }
}
</style>
