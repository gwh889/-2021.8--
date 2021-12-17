<template>
  <div>
    <Button type="primary" v-show="editmodel == 2" @click="editmodel = 1">修改</Button>
    <Button class="white-btn" v-show="editmodel == 1" @click="editmodel = 2">取消</Button>
    <Button type="primary" v-show="editmodel == 1" @click="editpro">确定</Button>
    <div class="infor-box">
      <Row class="infor-row">
        <Col span="3" class="infor-col-title">产品名称</Col>
        <Col span="6" class="infor-col-content" v-show="editmodel == 2">{{map.name}}</Col>
        <Col span="6" class="infor-col-content" v-show="editmodel == 1">
          <Input v-model.trim="formitem.proname" placeholder="请输入产品名称"></Input>
        </Col>
        <Col span="3" class="infor-col-title">节点类型</Col>
        <Col span="4" class="infor-col-content">{{map.nodetype ===1 ? '设备':'网关'}}</Col>
        <Col span="3" class="infor-col-title">ProductKey</Col>
        <Col span="5" class="infor-col-content">
          <div class="col-mycontent no-wrap">{{map.productKey}}</div>
          <Button
            type="text"
            class="blue-text-btn"
            style="padding:0 8px"
            v-clipboard:copy="map.productKey"
            v-clipboard:success="onCopy"
          >复制</Button>
        </Col>
      </Row>
      <Row class="infor-row">
        <Col span="3" class="infor-col-title">设备数量</Col>
        <Col span="6" class="infor-col-content">
          {{map.devicenum}}
          <Button type="text" class="blue-text-btn" @click="gotoshowequ">前往管理</Button>
        </Col>
        <Col span="3" class="infor-col-title">数据格式</Col>
        <Col span="4" class="infor-col-content">{{map.dataformat ===1 ? 'JSON':''}}</Col>
        <Col span="3" class="infor-col-title">ProductSecret</Col>
        <Col span="5" class="infor-col-content">
          <div class="col-mycontent no-wrap">{{map.showsercet === 1 ? map.sercet : '*******'}}</div>
          <Button
            type="text"
            class="blue-text-btn"
            style="padding:0 8px"
            @click="showmysercet"
          >{{map.showsercet === 1 ? '隐藏' : '显示'}}</Button>
        </Col>
      </Row>

      <Row class="infor-row">
        <Col span="3" class="infor-col-title">创建时间</Col>
        <Col span="6" class="infor-col-content">{{map.createtime}}</Col>
        <Col span="3" class="infor-col-title">是否接入网关</Col>
        <Col span="4" class="infor-col-content">{{map.isjoin == 1 ? '是' : '否'}}</Col>
        <Col span="3" class="infor-col-title">网关协议</Col>
        <Col span="5" class="infor-col-content">{{map.protocol}}</Col>
      </Row>

      <Row class="infor-row">
        <Col span="3" class="infor-col-title">产品描述</Col>
        <Col span="21" class="infor-col-content" v-show="editmodel == 2">
          <div class="col-mycontent">{{map.describes}}</div>
        </Col>
        <Col span="21" class="infor-col-content" v-show="editmodel == 1">
          <Input
            v-model.trim="formitem.describes"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 2}"
            placeholder="请输入产品描述"
          ></Input>
        </Col>
      </Row>

      <Row class="infor-row" style="height: 1px"></Row>
    </div>
  </div>
</template>

<script>
// import { useaxios } from '@/assets/js/axios'
// import { url_api, format_time } from '@/assets/js/common'

export default {
  data () {
    return {
      ppid: '',
      map: {},
      editmodel: 2,
      formitem: {
        proname: '',
        describes: ''
      }
    }
  },
  methods: {
    getParams: function () {
      // 取到路由带过来的参数
      var ppid = this.$route.query.ppid
      // 将数据放在当前组件的数据内
      this.ppid = ppid
    },
    // 获取详情
    getprodetail () {
      // const _this = this
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + '/iext/back/ProductController/productInfo',
      //     {
      //       ppid: this.ppid
      //     },
      //     'get'
      //   )
      //   .then(function (res) {
      //     if (res.data.success === 1) {
      //       let map = res.data.body.map
      //       if (map.protocol == 1) {
      //         map.protocol = 'MQTT'
      //       }
      //       map.showsercet = 2
      //       _this.map = map
      //       _this.map.createtime = format_time(map.createtime, 'time')
      //       _this.formitem.proname = map.name
      //       _this.formitem.describes = map.describes
      //       _this.editmodel = 2
      //     } else {
      //       _this.$Message.error(res.data.msg)
      //     }
      //   })
      //   .catch(function (error) {
      //     _this.$Message.error(error)
      //   })
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
    // 修改详情
    editpro () {
      const _this = this
      let proname = _this.formitem.proname
      let describes = _this.formitem.describes
      if (proname == '') {
        _this.$Message.error('请输入产品名称')
        return false
      }
      if (!/^[\u4e00-\u9fa5_a-zA-Z0-9_]{4,32}$/.test(proname)) {
        _this.$Message.error('请正确输入产品名称')
        return false
      }
      if (describes.length > 100) {
        _this.$Message.error('产品描述不能超过100字')
        return false
      }
      // useaxios
      //   .axios(
      //     this.$api.baseUrl + '/iext/back/ProductController/editProduct',
      //     {
      //       ppid: _this.ppid,
      //       name: proname,
      //       describe: describes
      //     },
      //     'post'
      //   )
      //   .then(function (res) {
      //     if (res.data.success === 1) {
      //       _this.$Message.success('修改成功')
      //       _this.getprodetail()
      //     } else {
      //       _this.$Message.error(res.data.msg)
      //     }
      //   })
      //   .catch(function (error) {
      //     _this.$Message.error(error)
      //   })
    },
    // 查看设备详情
    gotoshowequ () {
      this.$router.push({
        path: '/device/single',
        query: { ppid: this.ppid }
      })
    }
  },
  watch: {},
  created () {
    this.getParams()
  },
  mounted () {
    this.getprodetail()
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
      flex: 1;
      overflow-y: auto;
      .col-mycontent {
        padding-top: 18px;
        height: inherit;
        overflow-y: auto;
      }
    }
  }
}
</style>
